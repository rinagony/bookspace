import React from 'react'
import { Layout } from '../molecules'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {SentimentDissatisfied} from '@mui/icons-material';

const NotFoundComponent = styled.div`
    display: flex;
    height: 60vh;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;
    p {
        font-size: 3rem;
        font-weight: 600;
        color: ${(props) => props.theme.colors.green300};
    }
    a {
        color: ${(props) => props.theme.colors.darkGreen};
        font-size: 1.3rem;
    }
`

function NotFound() {
    return (
        <Layout>
            <NotFoundComponent>
                <p>404 not found <SentimentDissatisfied fontSize='large'/></p>
                <Link to='/products'>Back to main page</Link>
            </NotFoundComponent>
        </Layout>
    )
}

export default NotFound
