import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import { Layout } from '../molecules'

function MyProfile () {
  const userInfo = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  return (
    <Layout>
      MyAccount name: {userInfo.name}, lastName: {userInfo.lastName}
    </Layout>
  )
}

export default MyProfile
