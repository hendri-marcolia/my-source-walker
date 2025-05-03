import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubLink: string
  questStatus: 'active' | 'completed' | 'locked'
}

const projects: Project[] = [
  {
    id: 'source-walker',
    title: 'The Source Walker',
    description: 'An interactive, fantasy-themed developer portfolio with real-time features and 3D visualization.',
    techStack: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    githubLink: 'https://github.com/yourusername/source-walker',
    questStatus: 'active'
  },
  // Add more projects here
]

export default function ProjectsContent() {
  const { currentTheme } = useTheme()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-theme-foreground">Quests & Adventures</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-theme-secondary/20 p-6 rounded-lg border border-theme-accent/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-theme-accent">{project.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.questStatus === 'completed' ? 'bg-green-500/20 text-green-300' :
                project.questStatus === 'active' ? 'bg-blue-500/20 text-blue-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {project.questStatus.charAt(0).toUpperCase() + project.questStatus.slice(1)}
              </span>
            </div>
            
            <p className="text-theme-foreground mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 bg-theme-accent/10 text-theme-accent rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-theme-accent hover:text-theme-accent/80"
            >
              View Repository →
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 