import React from 'react'
import Header from './Header'
import { Container } from '@mui/material'

interface LayoutPropsInterface {
  children: React.ReactNode
}

function Layout ({ children }: LayoutPropsInterface) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </>
  )
}

export default Layout
