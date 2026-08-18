import * as React from 'react'
import { Popover } from '../popover/Popover'

export interface PreviewCardProps {
  /** The inline element that reveals the preview on press. */
  children: React.ReactNode
  /** The larger preview content. */
  content: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Inline element that reveals a larger preview card on interaction.
 * Mirrors Appica's `preview-card` (hover-card). Built on `Popover`.
 */
function PreviewCard({ children, content, open, onOpenChange }: PreviewCardProps) {
  return (
    <Popover trigger={children} open={open} onOpenChange={onOpenChange} side="bottom">
      {content}
    </Popover>
  )
}

export { PreviewCard }
