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
      className="relative rounded-lg overflow-hidden cursor-pointer bg-theme-accent/10 hover:bg-theme-accent/20 transition-all duration-300"
      style={{
        backgroundImage: `radial-gradient(circle at center, ${currentTheme.colors.accent}20 0%, transparent 70%)`
      }}
    >
      <div className="p-4 h-full flex flex-col justify-between">
        {icon && <div className="text-3xl mb-2">{icon}</div>}
        {(title || description) && (
          <div>
            {title && <h3 className="text-lg font-semibold text-theme-accent mb-1">{title}</h3>}
            {description && <p className="text-sm text-theme-foreground">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  )
} 