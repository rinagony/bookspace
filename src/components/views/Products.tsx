import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import { Layout } from '../molecules'

function Products () {
  const userInfo = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  return (
    <Layout>
      ProductList
    </Layout>
  )
}

export default Products
