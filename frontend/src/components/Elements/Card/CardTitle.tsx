interface CardTitleProps {
  children: React.ReactNode
}

export const CardTitle = ({ children }: CardTitleProps) => {
  return <h1 className="text-2xl font-medium text-center">{children}</h1>
}
