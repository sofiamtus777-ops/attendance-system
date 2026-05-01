'use client'
import {useState} from 'react'

export default function StudentTable({
students,
setStudents,
user
}){

const [search,setSearch]=useState('')

function removeStudent(id){
setStudents(
students.filter(
s=>s.id!==id
)
)
}

function editStudent(id){

const newName=prompt('Нове ПІБ')

if(!newName) return

setStudents(
students.map(s=>
s.id===id
? {...s,name:newName}
: s
)
)

}

return(

<div className='bg-white p-8 rounded-3xl'>

<input
placeholder='Пошук'
onChange={e=>setSearch(e.target.value)}
className='border p-3 mb-4 rounded-xl'
/>

<div className='flex gap-3 mb-4'>
<button className='bg-blue-600 text-white px-4 py-2 rounded-xl'>
Експорт Excel
</button>

<button className='bg-purple-600 text-white px-4 py-2 rounded-xl'>
PDF звіт
</button>
</div>

<table className='w-full'>

<tbody>

{students
.filter(s=>
s.name.toLowerCase().includes(
search.toLowerCase()
)
)
.map(s=>(

<tr key={s.id}>
<td>{s.name}</td>
<td>{s.group}</td>
<td>{s.absences}</td>

<td>

{user.role!=='Староста' &&(

<>

<button
onClick={()=>editStudent(s.id)}
className='bg-yellow-400 px-3 py-2 rounded-xl mr-2'
>
Редагувати
</button>

<button
onClick={()=>removeStudent(s.id)}
className='bg-red-500 text-white px-3 py-2 rounded-xl'
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

)

}