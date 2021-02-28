import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { useAuth } from '../contexts/auth'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export function Routes() {
  const { signed, loading } = useAuth()

  if (loading) {
    return (
      <Loading>
        <ActivityIndicator size="large" color="#666"/>
      </Loading>
    )
  }

  return signed ? <AppRoutes /> : <AuthRoutes />
}