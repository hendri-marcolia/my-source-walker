import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

export default function AboutContent() {
  const { currentTheme } = useTheme()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-theme-foreground">The Hero's Journey</h2>
      
      <div className="space-y-6">
        <motion.div 
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="bg-theme-secondary/20 p-6 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-theme-accent mb-4">The Call to Adventure</h3>
          <p className="text-theme-foreground">
            My journey into software development began with...
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          className="bg-theme-secondary/20 p-6 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-theme-accent mb-4">The Road of Trials</h3>
          <p className="text-theme-foreground">
            Through various challenges and projects...
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="bg-theme-secondary/20 p-6 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-theme-accent mb-4">The Return</h3>
          <p className="text-theme-foreground">
            Now, I bring back the knowledge and experience...
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
} 