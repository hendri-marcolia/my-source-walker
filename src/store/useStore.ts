import { create } from 'zustand'

interface AppState {
  // File system state
  currentPath: string
  setCurrentPath: (path: string) => void
  
  // Visualization state
  selectedNode: string | null
  setSelectedNode: (node: string | null) => void
  
  // UI state
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const useStore = create<AppState>((set) => ({
  // File system state
  currentPath: '',
  setCurrentPath: (path) => set({ currentPath: path }),
  
  // Visualization state
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  // UI state
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
})) 