'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

const WIDTH = 10
const HEIGHT = 20
const SPEED_BY_DIFFICULTY: Record<number, number> = {
  1: 800,
  2: 650,
  3: 500,
  4: 380,
  5: 260,
}

type Cell = string | null
type Board = Cell[][]
type Point = { x: number; y: number }
type Piece = {
  shape: number[][]
  color: string
  x: number
  y: number
}

const SHAPES = [
  { color: 'bg-cyan-500', shape: [[1, 1, 1, 1]] },
  {
    color: 'bg-blue-600',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    color: 'bg-orange-500',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    color: 'bg-yellow-400',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    color: 'bg-green-500',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    color: 'bg-purple-500',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    color: 'bg-red-500',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
]

function createBoard(): Board {
  return Array.from({ length: HEIGHT }, () => Array<Cell>(WIDTH).fill(null))
}

function createPiece(): Piece {
  const template = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  return {
    shape: template.shape,
    color: template.color,
    x: Math.floor(WIDTH / 2) - Math.ceil(template.shape[0].length / 2),
    y: 0,
  }
}

function rotate(shape: number[][]) {
  return shape[0].map((_, column) => shape.map((row) => row[column]).reverse())
}

function getBlocks(piece: Piece): Point[] {
  return piece.shape.flatMap((row, y) =>
    row.flatMap((filled, x) => (filled ? [{ x: piece.x + x, y: piece.y + y }] : [])),
  )
}

function collides(board: Board, piece: Piece) {
  return getBlocks(piece).some(
    (block) =>
      block.x < 0 ||
      block.x >= WIDTH ||
      block.y >= HEIGHT ||
      (block.y >= 0 && Boolean(board[block.y][block.x])),
  )
}

function mergePiece(board: Board, piece: Piece) {
  const next = board.map((row) => [...row])
  getBlocks(piece).forEach((block) => {
    if (block.y >= 0) next[block.y][block.x] = piece.color
  })
  return next
}

function clearLines(board: Board) {
  const remaining = board.filter((row) => row.some((cell) => !cell))
  const cleared = HEIGHT - remaining.length
  const emptyRows = Array.from({ length: cleared }, () => Array<Cell>(WIDTH).fill(null))
  return {
    board: [...emptyRows, ...remaining],
    cleared,
  }
}

export default function TetrisPage() {
  const [board, setBoard] = useState(createBoard)
  const [piece, setPiece] = useState(createPiece)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [difficulty, setDifficulty] = useState(1)
  const [isRunning, setIsRunning] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  const spawnNext = useCallback((nextBoard: Board) => {
    const nextPiece = createPiece()
    if (collides(nextBoard, nextPiece)) {
      setIsGameOver(true)
      setIsRunning(false)
      return
    }
    setPiece(nextPiece)
  }, [])

  const lockPiece = useCallback(
    (currentPiece: Piece) => {
      const merged = mergePiece(board, currentPiece)
      const result = clearLines(merged)
      setBoard(result.board)
      setLines((current) => current + result.cleared)
      setScore((current) => current + [0, 100, 300, 500, 800][result.cleared])
      spawnNext(result.board)
    },
    [board, spawnNext],
  )

  const move = useCallback(
    (dx: number, dy: number) => {
      if (!isRunning || isGameOver) return
      const nextPiece = { ...piece, x: piece.x + dx, y: piece.y + dy }
      if (!collides(board, nextPiece)) {
        setPiece(nextPiece)
        return
      }
      if (dy > 0) lockPiece(piece)
    },
    [board, isGameOver, isRunning, lockPiece, piece],
  )

  const rotatePiece = useCallback(() => {
    if (!isRunning || isGameOver) return
    const nextPiece = { ...piece, shape: rotate(piece.shape) }
    if (!collides(board, nextPiece)) setPiece(nextPiece)
  }, [board, isGameOver, isRunning, piece])

  const hardDrop = useCallback(() => {
    if (!isRunning || isGameOver) return
    let dropped = piece
    while (!collides(board, { ...dropped, y: dropped.y + 1 })) {
      dropped = { ...dropped, y: dropped.y + 1 }
    }
    lockPiece(dropped)
  }, [board, isGameOver, isRunning, lockPiece, piece])

  const reset = () => {
    setBoard(createBoard())
    setPiece(createPiece())
    setScore(0)
    setLines(0)
    setIsRunning(true)
    setIsGameOver(false)
  }

  useEffect(() => {
    if (!isRunning || isGameOver) return
    const id = window.setInterval(() => move(0, 1), SPEED_BY_DIFFICULTY[difficulty])
    return () => window.clearInterval(id)
  }, [difficulty, isGameOver, isRunning, move])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') move(-1, 0)
      if (event.key === 'ArrowRight') move(1, 0)
      if (event.key === 'ArrowDown') move(0, 1)
      if (event.key === 'ArrowUp') rotatePiece()
      if (event.code === 'Space') {
        event.preventDefault()
        hardDrop()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hardDrop, move, rotatePiece])

  const displayBoard = useMemo(() => {
    const next = board.map((row) => [...row])
    getBlocks(piece).forEach((block) => {
      if (block.y >= 0 && block.y < HEIGHT && block.x >= 0 && block.x < WIDTH) {
        next[block.y][block.x] = piece.color
      }
    })
    return next
  }, [board, piece])

  return (
    <main className="mx-auto max-w-lg px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← ホーム
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">テトリス</h1>
        </div>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          リセット
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <div className="relative rounded-xl border border-gray-200 bg-gray-900 p-2 shadow-sm">
          <div className="grid aspect-[10/20] grid-cols-10 gap-1">
            {displayBoard.flatMap((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`rounded-sm ${cell ?? 'bg-gray-800'} shadow-inner`}
                />
              )),
            )}
          </div>

          {isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/70">
              <div className="text-center text-white">
                <div className="text-xl font-bold">Game Over</div>
                <button
                  onClick={reset}
                  className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900"
                >
                  もう一度
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-3">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-gray-500">SCORE</div>
            <div className="text-2xl font-bold text-gray-900">{score}</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-gray-500">LINES</div>
            <div className="text-2xl font-bold text-gray-900">{lines}</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <label htmlFor="difficulty" className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">DIFFICULTY</span>
              <span className="text-lg font-bold text-gray-900">{difficulty}</span>
            </label>
            <input
              id="difficulty"
              type="range"
              min={1}
              max={5}
              step={1}
              value={difficulty}
              onChange={(event) => setDifficulty(Number(event.target.value))}
              className="mt-3 w-full accent-cyan-500"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>5</span>
            </div>
          </div>
          <button
            onClick={() => setIsRunning((current) => !current)}
            disabled={isGameOver}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRunning ? '一時停止' : '再開'}
          </button>
        </aside>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button onClick={() => move(-1, 0)} className="rounded-lg bg-gray-100 py-3 font-bold text-gray-700">
          ←
        </button>
        <button onClick={rotatePiece} className="rounded-lg bg-gray-100 py-3 font-bold text-gray-700">
          回転
        </button>
        <button onClick={() => move(1, 0)} className="rounded-lg bg-gray-100 py-3 font-bold text-gray-700">
          →
        </button>
        <button onClick={() => move(0, 1)} className="rounded-lg bg-gray-100 py-3 font-bold text-gray-700">
          ↓
        </button>
        <button onClick={hardDrop} className="col-span-2 rounded-lg bg-gray-900 py-3 font-bold text-white">
          落とす
        </button>
      </div>
    </main>
  )
}
