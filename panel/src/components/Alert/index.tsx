import React from 'react'

type AlertProps = {
  children: React.ReactNode
}

const Alert = ({ children }: AlertProps) => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      {children}
    </div>
  )
}

export default Alert
