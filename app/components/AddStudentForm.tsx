'use client'

import {useState} from 'react'

export default function AddStudentForm({onAdd}:any){

const [surname,setSurname]=useState('')
const [name,setName]=useState('')
const [group,setGroup]=useState('')

const submit=()=>{
onAdd({
id:Date.now(),
surname,
name,
group,
absences:0
})
}

return(
<div className='bg-white p-8 rounded-3xl shadow'>
<h2 className='text-2xl font-bold mb-4'>
Додати студента
</h2>

<input
className='border p-3 w-full mb-3 rounded-xl'
placeholder='Прізвище'
onChange={(e)=>setSurname(e.target.value)}
/>

<input
className='border p-3 w-full mb-3 rounded-xl'
placeholder="Ім'я"
onChange={(e)=>setName(e.target.value)}
/>

<input
className='border p-3 w-full mb-3 rounded-xl'
placeholder='Група'
onChange={(e)=>setGroup(e.target.value)}
/>

<button
onClick={submit}
className='bg-black text-white px-6 py-3 rounded-2xl'
>
Додати
</button>

</div>
)
}