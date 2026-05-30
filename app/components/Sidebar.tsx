'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  LogOut
} from 'lucide-react'

export default function Sidebar({ setPage }: any) {
  const [active, setActive] = useState('dashboard')
  const [open, setOpen] = useState(true)

  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Студенти', icon: Users },
    { id: 'teachers', label: 'Викладачі', icon: GraduationCap },
    { id: 'groups', label: 'Групи', icon: BookOpen },
    { id: 'stats', label: 'Статистика', icon: BarChart3 }
  ]

  function handleClick(id: string) {
    setActive(id)
    setPage(id)
  }

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={{ ...styles.sidebar, width: open ? 250 : 70 }}>

        {/* HEADER */}
        <div style={styles.logo}>
          {open && <h2>🎓 Admin</h2>}

          <button
            onClick={() => setOpen(!open)}
            style={styles.toggle}
          >
            ☰
          </button>
        </div>

        {/* MENU */}
        <div style={{ marginTop: 20 }}>
          {menu.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id

            return (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                style={{
                  ...styles.item,
                  background: isActive ? '#3b82f6' : 'transparent'
                }}
              >
                <Icon size={20} />

                {open && (
                  <span style={{ marginLeft: 10 }}>
                    {item.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* LOGOUT */}
        <div style={styles.logout}>
          <LogOut size={20} />
          {open && <span style={{ marginLeft: 10 }}>Вихід</span>}
        </div>

      </div>
    </div>
  )
}

const styles: any = {
  wrapper: {
    display: 'flex'
  },

  sidebar: {
    height: '100vh',
    background: '#0f172a',
    color: 'white',
    position: 'fixed',
    left: 0,
    top: 0,
    transition: '0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  logo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottom: '1px solid #1e293b'
  },

  toggle: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: 18,
    cursor: 'pointer'
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    cursor: 'pointer',
    borderRadius: 10,
    margin: '5px 10px',
    transition: '0.2s'
  },

  logout: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    borderTop: '1px solid #1e293b',
    cursor: 'pointer'
  }
}