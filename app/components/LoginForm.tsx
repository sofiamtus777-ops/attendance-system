'use client'

import { useState } from 'react'

export default function LoginForm({ onLogin }: any) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if (data.success) {
      onLogin(data.user)
    } else {
      alert('Невірний email або пароль')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#dce8f7'
    }}>
      
      <div style={{
        background: 'white',
        padding: 40,
        borderRadius: 20,
        width: 350
      }}>

        <h1>Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 20 }}
        />

        <button
          onClick={login}
          style={{
            width: '100%',
            padding: 12,
            background: '#d4a373',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Увійти
        </button>

      </div>
    </div>
  )
}