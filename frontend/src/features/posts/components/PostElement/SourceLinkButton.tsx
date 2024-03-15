import { ExternalLink } from 'lucide-react'

interface SourceLinkButtonProps {
  sourceUrl: string
  children: React.ReactNode
}

const SourceLinkButton = ({ sourceUrl, children }: SourceLinkButtonProps) => {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      className="px-2 py-1 rounded-md transition-color duration-200 border-neutral-400 border hover:bg-primary-500 hover:border-primary-500 inline-flex gap-1 items-center font-light"
    >
      <ExternalLink size={14} />
      <span>{children}</span>
    </a>
  )
}

export default SourceLinkButton
