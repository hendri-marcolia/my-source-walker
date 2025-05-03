import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

interface ContactMethod {
  id: string
  title: string
  description: string
  icon: string
  link: string
  action: string
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email',
    description: 'Send me a message directly to my inbox.',
    icon: '📧',
    link: 'mailto:your.email@example.com',
    action: 'Send Email'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Connect with me on LinkedIn.',
    icon: '💼',
    link: 'https://linkedin.com/in/yourusername',
    action: 'Connect'
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Check out my open source contributions.',
    icon: '🐙',
    link: 'https://github.com/yourusername',
    action: 'View Profile'
  },
  {
    id: 'twitter',
    title: 'Twitter',
    description: 'Follow me for tech updates and thoughts.',
    icon: '🐦',
    link: 'https://twitter.com/yourusername',
    action: 'Follow'
  }
]

export default function ContactContent() {
  const { currentTheme } = useTheme()

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      <h2 className="text-3xl font-bold text-theme-foreground mb-6">Let's Connect</h2>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        {contactMethods.map((method) => (
          <motion.a
            key={method.id}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-theme-secondary/20 p-4 rounded-lg border border-theme-accent/20 hover:border-theme-accent/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{method.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-theme-accent mb-1">{method.title}</h3>
                <p className="text-sm text-theme-foreground mb-2">{method.description}</p>
                <span className="inline-flex items-center text-theme-accent hover:text-theme-accent/80 text-sm">
                  {method.action} →
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-theme-foreground">
          Feel free to reach out for collaborations, opportunities, or just to say hello!
        </p>
      </motion.div>
    </motion.div>
  )
} 