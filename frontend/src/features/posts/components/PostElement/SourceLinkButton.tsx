import { twMerge } from 'tailwind-merge'
import { ExternalLink } from 'lucide-react'

interface SourceLinkButtonProps {
  sourceUrl: string
  children: React.ReactNode,
  className?: string
}

const SourceLinkButton = ({ sourceUrl, children, className }: SourceLinkButtonProps) => {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      className={twMerge("inline-flex items-center gap-1 px-2 py-1 font-light duration-200 border rounded-md transition-color border-neutral-400 hover:bg-primary-500 hover:border-primary-500", className)}
    >
      <ExternalLink size={14} />
      <span>{children}</span>
    </a>
  )
}

export default SourceLinkButton
