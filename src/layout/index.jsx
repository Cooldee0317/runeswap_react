import React from 'react'
import Header from './Header'

const Index = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  )
}

export default Index
