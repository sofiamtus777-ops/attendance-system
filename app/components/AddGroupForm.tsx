'use client'

import { useEffect, useState } from 'react'

export default function AddStudentForm({ onAdded }: any) {
  const [name, setName] = useState('')
  const [group, setGroup] = useState('')
  const [groups, setGroups] = useState<any[]>([])

  useEffect(() => {
    loadGroups()
  }, [])

  async function loadGroups() {
    try {
      const res = await fetch('/api/groups')

      const data = await res.json()

      console.log('GROUPS:', data)

      setGroups(data)

      if (data.length > 0) {
        setGroup(data[0].name)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function addStudent(e: any) {
    e.preventDefault()

    if (!name || !group) return

    await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        group_name: group
      })
    })

    setName('')

    if (onAdded) {
      onAdded()
    }
  }

  return (
    <form
      onSubmit={addStudent}
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 20
      }}
    >
      <input
        type="text"
        placeholder="Ім'я студента"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        {groups.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      <button type="submit">
        Додати
      </button>
    </form>
  )
}