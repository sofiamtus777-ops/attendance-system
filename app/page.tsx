'use client'
import {useState,useEffect} from 'react'
import LoginForm from './components/LoginForm'

export default function Home(){

const [user,setUser]=useState(null)

const [students,setStudents]=useState([
{id:1,name:'Іваненко Іван',group:'ІПЗ-21'},
{id:2,name:'Петренко Марія',group:'ІПЗ-21'},
{id:3,name:'Коваленко Андрій',group:'КН-31'}
])

const groups=['ІПЗ-21','КН-31']
const [activeGroup,setActiveGroup]=useState('ІПЗ-21')

const [attendance,setAttendance]=useState({})
const [month,setMonth]=useState('Вересень')
const [day,setDay]=useState(1)

const [newName,setNewName]=useState('')
const [newGroup,setNewGroup]=useState('ІПЗ-21')

/* ЗБЕРЕЖЕННЯ */
useEffect(()=>{
const s=localStorage.getItem('students')
const a=localStorage.getItem('attendance')

if(s) setStudents(JSON.parse(s))
if(a) setAttendance(JSON.parse(a))
},[])

useEffect(()=>{
localStorage.setItem('students',JSON.stringify(students))
},[students])

useEffect(()=>{
localStorage.setItem('attendance',JSON.stringify(attendance))
},[attendance])

/* РОЛІ */
if(!user){
return <LoginForm onLogin={setUser}/>
}

const isAdmin=user.role==='Адміністратор'
const isTeacher=user.role==='Викладач'
const isStudent=user.role==='Староста'

/* ЛОГІКА */
function addStudent(){
if(!newName) return

setStudents([...students,{
id:Date.now(),
name:newName,
group:newGroup
}])

setNewName('')
}

function deleteStudent(id){
setStudents(students.filter(s=>s.id!==id))
}

function editStudent(id){
const name=prompt('Нове ПІБ')
if(!name) return

setStudents(students.map(s=>
s.id===id?{...s,name}:s
))
}

function dayKey(){
return `${month}-${day}`
}

function mark(id,status){
const key=dayKey()

setAttendance({
...attendance,
[key]:{
...(attendance[key]||{}),
[id]:status
}
})
}

function getStatus(id){
return attendance[dayKey()]?.[id] || 'present'
}

function absences(id){
let total=0
Object.values(attendance).forEach((d:any)=>{
if(d[id]==='absent') total++
})
return total
}

/* ФІЛЬТР */
const filtered=students.filter(s=>s.group===activeGroup)

return(

<div className='min-h-screen bg-sky-100 p-8 text-black'>

<h1 className='text-4xl font-bold mb-4'>
Моніторинг відвідуваності студентів
</h1>

<p className='mb-4'>
Роль: <b>{user.role}</b>
</p>

<button
onClick={()=>setUser(null)}
className='bg-red-600 text-white px-4 py-2 rounded-xl mb-6'
>
Вийти
</button>

{/* ДОДАТИ */}
{(isAdmin || isTeacher) && (
<div className='bg-white p-6 rounded-3xl mb-6'>

<input
value={newName}
onChange={e=>setNewName(e.target.value)}
placeholder='ПІБ'
className='border p-3 mr-2 rounded-xl'
/>

<select
value={newGroup}
onChange={e=>setNewGroup(e.target.value)}
className='border p-3 mr-2 rounded-xl'
>
{groups.map(g=><option key={g}>{g}</option>)}
</select>

<button
onClick={addStudent}
className='bg-green-600 text-white px-5 py-3 rounded-xl'
>
Додати
</button>

</div>
)}

{/* КАЛЕНДАР */}
<div className='bg-white p-6 rounded-3xl mb-6'>

<select
value={month}
onChange={e=>setMonth(e.target.value)}
className='border p-3 mb-4 rounded-xl'
>
<option>Вересень</option>
<option>Жовтень</option>
<option>Листопад</option>
</select>

<div className='grid grid-cols-6 gap-2'>
{Array.from({length:30},(_,i)=>(
<button
key={i}
onClick={()=>setDay(i+1)}
className={
day===i+1
?'bg-orange-500 text-white p-3 rounded-xl'
:'bg-yellow-300 p-3 rounded-xl'
}
>
{i+1}
</button>
))}
</div>

</div>

{/* ГРУПИ */}
<div className='mb-6'>
{groups.map(g=>(
<button
key={g}
onClick={()=>setActiveGroup(g)}
className={
activeGroup===g
?'bg-blue-600 text-white px-4 py-2 mr-2 rounded-xl'
:'bg-blue-200 px-4 py-2 mr-2 rounded-xl'
}
>
{g}
</button>
))}
</div>

{/* ТАБЛИЦЯ */}
<div className='bg-white p-6 rounded-3xl'>

<h2 className='text-2xl mb-4'>
Журнал {activeGroup} — {day} {month}
</h2>

<table className='w-full'>

<thead>
<tr>
<th>Студент</th>
<th>Пропуски</th>
<th>Статус</th>
<th>Дії</th>
</tr>
</thead>

<tbody>

{filtered.map(s=>(
<tr key={s.id} className='border-b'>

<td>{s.name}</td>

<td>{absences(s.id)}</td>

<td>
{getStatus(s.id)==='absent'
?'❌ Пропуск'
:'✅ Присутній'}
</td>

<td className='flex gap-2 py-2'>

{!isStudent && (
<>
<button
onClick={()=>mark(s.id,'present')}
className='bg-green-500 text-white px-3 py-1 rounded'
>
✔
</button>

<button
onClick={()=>mark(s.id,'absent')}
className='bg-red-500 text-white px-3 py-1 rounded'
>
✖
</button>
</>
)}

{isAdmin && (
<>
<button
onClick={()=>editStudent(s.id)}
className='bg-blue-500 text-white px-3 py-1 rounded'
>
Редагувати
</button>

<button
onClick={()=>deleteStudent(s.id)}
className='bg-gray-700 text-white px-3 py-1 rounded'
>
Видалити
</button>
</>
)}

</td>

</tr>
))}

</tbody>
</table>

</div>

</div>
)
}