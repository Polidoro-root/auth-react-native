import React from 'react'
import { Text } from 'react-native'
import { useAuth } from '../../contexts/auth'
import { Button, Container } from './styles'

export function Dashboard() {
  const { user, signOut } = useAuth()

  function handleSignOut() {
    signOut()
  }

  return (
    <Container>
      <Text>{user?.name}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </Container>
  )
}