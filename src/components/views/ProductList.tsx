import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import { Layout } from '../molecules'

function ProductList () {
  const userInfo = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  return (
    <Layout>
      ProductList
    </Layout>
  )
}

export default ProductList
