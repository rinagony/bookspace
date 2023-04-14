import React from 'react'
import styled from 'styled-components'

const LogoComponent = styled.p`
    font-size: 1.4rem;
    margin: 0;
    white-space: nowrap;
    font-weight: 600;
    color: ${(props) => props.theme.colors.darkGreen};
    text-shadow: 1px 1px ${(props) => props.theme.colors.green300};
`

function Logo () {
  return (
    <LogoComponent>Fucking store</LogoComponent>
  )
}

export default Logo
