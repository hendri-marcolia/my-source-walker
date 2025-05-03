export interface Tile {
  id: string
  type: 'content' | 'navigation' | 'empty'
  title?: string
  description?: string
  icon?: string
  link?: string
  content?: string
}

export const planetContent: Record<string, Tile[]> = {
  about: [
    { id: 'intro', type: 'content', title: 'The Journey Begins', description: 'My path in software development', icon: '🚀' },
    { id: 'experience', type: 'content', title: 'Experience', description: 'Years of crafting digital solutions', icon: '💼' },
    { id: 'skills', type: 'content', title: 'Skills', description: 'Technical expertise and capabilities', icon: '⚡' },
    { id: 'empty1', type: 'empty' },
    { id: 'empty2', type: 'empty' },
    { id: 'empty3', type: 'empty' },
    { id: 'empty4', type: 'empty' },
    { id: 'empty5', type: 'empty' },
  ],
  projects: [
    { id: 'project1', type: 'content', title: 'Source Walker', description: 'Interactive 3D Portfolio', icon: '🌍', link: '#' },
    { id: 'project2', type: 'content', title: 'AI Assistant', description: 'Smart Task Management', icon: '🤖', link: '#' },
    { id: 'project3', type: 'content', title: 'E-commerce', description: 'Full Stack Solution', icon: '🛍️', link: '#' },
    { id: 'empty1', type: 'empty' },
    { id: 'empty2', type: 'empty' },
    { id: 'empty3', type: 'empty' },
    { id: 'empty4', type: 'empty' },
    { id: 'empty5', type: 'empty' },
  ],
  hobbies: [
    { id: 'hobby1', type: 'content', title: 'Snorkeling', description: 'Exploring marine life', icon: '🤿' },
    { id: 'hobby2', type: 'content', title: 'Running', description: 'Staying active', icon: '🏃‍♂️' },
    { id: 'hobby3', type: 'content', title: 'Gym', description: 'Building strength', icon: '💪' },
    { id: 'empty1', type: 'empty' },
    { id: 'empty2', type: 'empty' },
    { id: 'empty3', type: 'empty' },
    { id: 'empty4', type: 'empty' },
    { id: 'empty5', type: 'empty' },
  ],
  contact: [
    { id: 'email', type: 'content', title: 'Email', description: 'Send me a message', icon: '📧', link: 'mailto:your.email@example.com' },
    { id: 'linkedin', type: 'content', title: 'LinkedIn', description: 'Connect professionally', icon: '💼', link: 'https://linkedin.com/in/yourusername' },
    { id: 'github', type: 'content', title: 'GitHub', description: 'Check my code', icon: '🐙', link: 'https://github.com/yourusername' },
    { id: 'empty1', type: 'empty' },
    { id: 'empty2', type: 'empty' },
    { id: 'empty3', type: 'empty' },
    { id: 'empty4', type: 'empty' },
    { id: 'empty5', type: 'empty' },
  ]
} 