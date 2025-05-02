import { BaseTile } from './BaseTile'

interface ContentTileProps {
  id: string
  icon: string
  title: string
  description: string
  link?: string
  onSelect: () => void
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

export function ContentTile(props: ContentTileProps) {
  return (
    <BaseTile {...props}>
      {props.link && (
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-accent hover:text-theme-accent/80 text-sm mt-2 inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          Learn More →
        </a>
      )}
    </BaseTile>
  )
} 