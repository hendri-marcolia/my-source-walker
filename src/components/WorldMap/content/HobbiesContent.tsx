import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

interface Hobby {
  id: string
  title: string
  description: string
  icon: string
  interactiveScene?: string // Path to the 3D scene component
}

const hobbies: Hobby[] = [
  {
    id: 'snorkeling',
    title: 'Snorkeling',
    description: 'Exploring the underwater world and marine life.',
    icon: '🤿',
  },
  {
    id: 'running',
    title: 'Running',
    description: 'Staying active and exploring new trails.',
    icon: '🏃‍♂️',
  },
  {
    id: 'gym',
    title: 'Gym',
    description: 'Building strength and maintaining fitness.',
    icon: '💪',
  },
]

export default function HobbiesContent() {
  const { currentTheme } = useTheme()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-theme-foreground">Side Quests & Interests</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby) => (
          <motion.div
            key={hobby.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-theme-secondary/20 p-6 rounded-lg border border-theme-accent/20"
          >
            <div className="text-4xl mb-4">{hobby.icon}</div>
            <h3 className="text-2xl font-semibold text-theme-accent mb-2">{hobby.title}</h3>
            <p className="text-theme-foreground">{hobby.description}</p>
            
            {/* Placeholder for interactive scene */}
            <div className="mt-4 h-48 bg-theme-secondary/10 rounded-lg flex items-center justify-center">
              <span className="text-theme-muted">Interactive Scene Coming Soon</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 