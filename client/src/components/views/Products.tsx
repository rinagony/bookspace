import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import { Layout } from '../molecules'
import { getAllProducts } from '../../api/products'

function Products () {
  const userInfo = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    getAllProducts().then((resp: any) => setProducts(resp))
  }, []);
  if(products) console.log(products, 'response from server')

  // console.log('data from nodejs server', data)
  return (
    <Layout>
      ProductList
    </Layout>
  )
}

export default Products
