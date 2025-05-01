export interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  size?: number
  children?: FileNode[]
}

export async function scanDirectory(path: string): Promise<FileNode> {
  try {
    // This is a placeholder for the actual implementation
    // We'll need to implement this using the appropriate file system API
    // based on the platform (Electron, Web File System API, etc.)
    return {
      name: 'root',
      path,
      type: 'directory',
      children: []
    }
  } catch (error) {
    console.error('Error scanning directory:', error)
    throw error
  }
}

export function calculateNodePosition(node: FileNode, index: number, total: number): [number, number, number] {
  const radius = 5
  const angle = (index / total) * Math.PI * 2
  const x = Math.cos(angle) * radius
  const y = 0
  const z = Math.sin(angle) * radius
  return [x, y, z]
}

export function getFileColor(fileName: string): string {
  // Add file type color mapping based on extension
  const extension = fileName.split('.').pop()?.toLowerCase()
  
  const colorMap: Record<string, string> = {
    ts: '#3178c6',    // TypeScript blue
    tsx: '#3178c6',   // TypeScript blue
    js: '#f7df1e',    // JavaScript yellow
    jsx: '#f7df1e',   // JavaScript yellow
    json: '#292929',  // JSON dark gray
    md: '#083fa1',    // Markdown blue
    css: '#563d7c',   // CSS purple
    html: '#e34c26',  // HTML orange
    default: '#666666' // Default gray
  }
  
  return extension ? colorMap[extension] || colorMap.default : colorMap.default
} 