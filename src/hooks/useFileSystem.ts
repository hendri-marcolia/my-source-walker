import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { scanDirectory } from '../utils/fileSystem'
import type { FileNode } from '../utils/fileSystem'

export function useFileSystem() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const currentPath = useStore((state) => state.currentPath)
  const setCurrentPath = useStore((state) => state.setCurrentPath)
  const [fileSystem, setFileSystem] = useState<FileNode | null>(null)

  useEffect(() => {
    if (!currentPath) return

    const loadFileSystem = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await scanDirectory(currentPath)
        setFileSystem(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to scan directory'))
      } finally {
        setLoading(false)
      }
    }

    loadFileSystem()
  }, [currentPath])

  const selectDirectory = async (path: string) => {
    setCurrentPath(path)
  }

  return {
    loading,
    error,
    fileSystem,
    selectDirectory
  }
} 