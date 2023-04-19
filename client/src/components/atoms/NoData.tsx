import React from 'react'
import { Container } from '@mui/material'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl';

const NoDataComponent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
    color: ${(props) => props.theme.colors.darkGreen};
  }
`;

function NoData() {
    return (
        <NoDataComponent><h2><FormattedMessage id={'primary.no-data'} /></h2></NoDataComponent>
    )
}

export default NoData
