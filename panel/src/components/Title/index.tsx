import React from 'react'

type TitleProps = {
  children: string
}

const Title = ({ children }: TitleProps) => {
  return <h3 className="text-gray-700 text-3xl font-medium">{children}</h3>
}

export default Title
