import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export function AboutSection() {
  const { currentTheme } = useTheme()

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-theme-background p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-theme-foreground mb-8">The Hero's Journey</h2>
        
        {/* Journey Stages */}
        <div className="space-y-12">
          {/* The Call */}
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            className="bg-theme-secondary/20 p-6 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-theme-accent mb-4">The Call to Adventure</h3>
            <p className="text-theme-foreground">
              My journey into software development began with...
            </p>
          </motion.div>

          {/* The Journey */}
          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            className="bg-theme-secondary/20 p-6 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-theme-accent mb-4">The Road of Trials</h3>
            <p className="text-theme-foreground">
              Through various challenges and projects...
            </p>
          </motion.div>

          {/* The Return */}
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            className="bg-theme-secondary/20 p-6 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-theme-accent mb-4">The Return</h3>
            <p className="text-theme-foreground">
              Now, I bring back the knowledge and experience...
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
} 