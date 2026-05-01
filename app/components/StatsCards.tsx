export default function StatsCards({students}:any){

const total=students.reduce(
(sum:any,s:any)=>sum+s.absences,0
)

return(
<div className='grid md:grid-cols-2 gap-6'>

<div className='bg-white p-8 rounded-3xl shadow'>
<h2 className='text-2xl font-bold'>Усі пропуски</h2>
<p className='text-5xl mt-4'>
{total}
</p>
</div>

<div className='bg-white p-8 rounded-3xl shadow'>
<h2 className='text-2xl font-bold'>Боржники</h2>

{
students
.filter((s:any)=>s.absences>=10)
.map((s:any)=>(
<p key={s.id}>{s.surname}</p>
))
}

</div>

</div>
)
}