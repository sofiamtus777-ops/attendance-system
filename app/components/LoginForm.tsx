'use client'
import {useState} from 'react'

export default function LoginForm({onLogin}){

const [login,setLogin]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState('')

async function handleLogin(){

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, password })
  })

  if (!res.ok) {
    setError('Невірний логін або пароль')
    return
  }

  const data = await res.json()
  onLogin(data)
}

return(
<div className='min-h-screen flex items-center justify-center bg-sky-100'>

  <div className='bg-white p-10 rounded-3xl shadow-2xl w-80'>

    <h2 className='text-3xl mb-5 text-center font-bold'>
      Авторизація
    </h2>

    <input
      placeholder='Логін'
      value={login}
      onChange={e=>setLogin(e.target.value)}
      className='border p-3 mb-3 w-full rounded-xl'
    />

    <input
      type='password'
      placeholder='Пароль'
      value={password}
      onChange={e=>setPassword(e.target.value)}
      className='border p-3 mb-3 w-full rounded-xl'
    />

    {error && (
      <p className='text-red-500 mb-3'>
        {error}
      </p>
    )}

    <button
      onClick={handleLogin}
      className='bg-blue-600 text-white w-full p-3 rounded-xl'
    >
      Увійти
    </button>

  </div>

</div>
)
}