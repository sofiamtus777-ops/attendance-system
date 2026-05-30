'use client'

import { useEffect, useState } from 'react'

export default function AddStudentForm({
  onAdded
}: any) {

  const [name, setName] = useState('')

  const [groups, setGroups] = useState<any[]>([])

  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    loadGroups()
  }, [])

  async function loadGroups() {

    try {

      const res = await fetch('/api/groups')

      const data = await res.json()

      if (Array.isArray(data)) {

        setGroups(data)

        if (data.length > 0) {
          setGroupName(data[0].name)
        }
      }

    } catch (error) {

      console.log(error)
    }
  }

  async function addStudent() {

    if (!name || !groupName) {
      alert('Заповни всі поля')
      return
    }

    try {

      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          group_name: groupName
        })
      })

      const data = await res.json()

      console.log(data)

      if (data.success) {

        alert('Студента додано')

        setName('')

        onAdded()

      } else {

        alert('Помилка додавання')
      }

    } catch (error) {

      console.log(error)

      alert('Помилка сервера')
    }
  }

  async function addGroup() {

    const newGroup = prompt(
      'Назва нової групи'
    )

    if (!newGroup) return

    try {

      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newGroup
        })
      })

      const data = await res.json()

      if (data.success) {

        alert('Групу додано')

        loadGroups()

      } else {

        alert('Помилка додавання групи')
      }

    } catch (error) {

      console.log(error)

      alert('Помилка сервера')
    }
  }

  return (

    <div style={{
      background: 'white',
      padding: 25,
      borderRadius: 20,
      marginBottom: 30
    }}>

      <h2>
        Додати студента
      </h2>

      <div style={{
        display: 'flex',
        gap: 15,
        marginTop: 20,
        flexWrap: 'wrap'
      }}>

        <input
          placeholder="Імʼя студента"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            padding: 15,
            borderRadius: 12,
            border: '1px solid #ccc',
            minWidth: 250
          }}
        />

        <select
          value={groupName}
          onChange={(e) =>
            setGroupName(e.target.value)
          }
          style={{
            padding: 15,
            borderRadius: 12,
            border: '1px solid #ccc',
            minWidth: 200
          }}
        >

          {groups.map((g: any) => (

            <option
              key={g.id}
              value={g.name}
            >
              {g.name}
            </option>

          ))}

        </select>

        <button
          onClick={addStudent}
          style={{
            padding: '15px 25px',
            borderRadius: 12,
            border: 'none',
            background: '#22c55e',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ➕ Додати студента
        </button>

        <button
          onClick={addGroup}
          style={{
            padding: '15px 25px',
            borderRadius: 12,
            border: 'none',
            background: '#e9d46a',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ➕ Нова група
        </button>

      </div>

    </div>
  )
}