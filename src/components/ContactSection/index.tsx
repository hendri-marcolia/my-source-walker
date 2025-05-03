import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useState } from 'react'

export function ContactSection() {
  const { currentTheme } = useTheme()
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // TODO: Implement message sending logic
    setTimeout(() => {
      setSending(false)
      setMessage('')
    }, 1500)
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-theme-background p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-theme-foreground mb-8">Send a Message</h2>
        
        <div className="bg-theme-secondary/20 p-8 rounded-lg border border-theme-accent/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-theme-foreground mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 bg-theme-background border border-theme-accent/20 rounded-lg p-4 text-theme-foreground focus:outline-none focus:border-theme-accent"
                placeholder="Write your message here..."
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={sending || !message.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg text-white transition-colors ${
                sending || !message.trim()
                  ? 'bg-theme-accent/50 cursor-not-allowed'
                  : 'bg-theme-accent hover:bg-theme-accent/90'
              }`}
            >
              {sending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </form>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-theme-foreground hover:text-theme-accent"
            >
              <span className="text-2xl">📦</span>
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-theme-foreground hover:text-theme-accent"
            >
              <span className="text-2xl">🔗</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
} 