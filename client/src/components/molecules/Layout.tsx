import React from 'react'
import Header from './Header'
import { Container } from '@mui/material'
import styled from 'styled-components'

interface LayoutPropsInterface {
  children: React.ReactNode
}

const ContainerComponent = styled(Container)`
  padding-top: 2rem;
`

function Layout ({ children }: LayoutPropsInterface) {
  return (
    <>
      <Header />
      <ContainerComponent maxWidth="lg">{children}</ContainerComponent>
    </>
  )
}

export default Layout
