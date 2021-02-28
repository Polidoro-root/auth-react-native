import React from 'react'
import { useAuth } from '../../contexts/auth'
import { Button, Container } from './styles'

export function SignIn() {
  const { signed, user, signIn } = useAuth()

  console.log(signed)
  console.log(user)

  async function handleSignIn() {
    await signIn()
  }

  return (
    <Container>
      <Button title="Sign in" onPress={handleSignIn} />
    </Container>
  )
}