interface PostTitleProps {
  children: React.ReactNode
}

const PostTitle = ({ children }: PostTitleProps) => {
  return <h2 className="text-lg font-medium mb-2 line-clamp-3">{children}</h2>
}

export default PostTitle
