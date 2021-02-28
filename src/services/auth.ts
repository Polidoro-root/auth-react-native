interface Response {
  token: string
  user: {
    name: string,
    email: string
  }
}

export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: '1sa56d1a5sd65a1as1d65sa1asd156sda',
        user: {
          name: 'João',
          email: 'jv.polidoro@outlook.com'
        }
      })
    }, 2000)
  })
}