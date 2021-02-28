import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-community/async-storage'
import * as auth from "../services/auth"
import styled from "styled-components/native"
import { api } from "../services/api"

interface User {
  name: string
  email: string
}

interface AuthContextData {
  signed: boolean
  user: User | null
  signIn(): Promise<void>
  signOut(): void
  loading: boolean
}

interface AuthProviderProps {
  children?: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadStorageData() {
      const [[, storagedUser], [, storagedToken]] = await AsyncStorage.multiGet([
        '@RNAuth:user',
        '@RNAuth:token'
      ])
      
      if (storagedToken && storagedUser) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
        setUser(JSON.parse(storagedUser))
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  async function signIn() {
    const response = await auth.signIn()

    setUser(response.user)

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@RNAuth:token', response.token)
  }

  function signOut() {
    AsyncStorage.clear().then(() => setUser(null))
  }
  
  return (
    <AuthContext.Provider value={{
      signed: Boolean(user), // or !!user
      user,
      signIn,
      signOut,
      loading
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}