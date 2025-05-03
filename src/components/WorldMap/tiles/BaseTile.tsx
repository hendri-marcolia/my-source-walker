import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

interface BaseTileProps {
  id: string
  icon?: string
  title?: string
  description?: string
  onSelect?: () => void
  isHovered?: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
  children?: React.ReactNode
}

export function BaseTile({ 
  id, 
  icon, 
  title, 
  description, 
  onSelect, 
  isHovered, 
  onHoverStart, 
  onHoverEnd,
  children 
}: BaseTileProps) {
  const { currentTheme } = useTheme()

  return (
    <motion.div
      key={id}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: isHovered ? 1.05 : 1,
        opacity: 1
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onSelect}
      className="relative rounded-lg overflow-hidden cursor-pointer bg-theme-accent/10 hover:bg-theme-accent/20 transition-all duration-300 border-2 border-theme-accent/30 shadow-lg"
      style={{
        backgroundImage: `
          linear-gradient(45deg, ${currentTheme.colors.accent}10 25%, transparent 25%),
          linear-gradient(-45deg, ${currentTheme.colors.accent}10 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${currentTheme.colors.accent}10 75%),
          linear-gradient(-45deg, transparent 75%, ${currentTheme.colors.accent}10 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}
    >
      {/* Game-like content container */}
      <div className="p-4 h-full flex flex-col justify-between relative z-10">
        {/* Icon with game-like frame */}
        {icon && (
          <div className="flex justify-center mb-3">
            <div className="text-4xl bg-theme-accent/20 p-3 rounded-lg border-2 border-theme-accent/30">
              {icon}
            </div>
          </div>
        )}
        
        {/* Title and description with game-like styling */}
        {(title || description) && (
          <div className="text-center">
            {title && (
              <h3 className="text-lg font-bold text-theme-accent mb-2 font-game">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-theme-foreground/90 leading-tight">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Interactive elements */}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>

      {/* Game-like hover effect */}
      <motion.div
        className="absolute inset-0 bg-theme-accent/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
} 