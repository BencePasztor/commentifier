interface PageTitleProps {
  children: React.ReactNode
}

const PageTitle = ({ children }: PageTitleProps) => {
  return <h1 className="text-2xl font-medium text-center">{children}</h1>
}

export default PageTitle
