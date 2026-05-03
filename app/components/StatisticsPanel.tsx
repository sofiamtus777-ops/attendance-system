export default function StatisticsPanel({students}){

const absent=
students.filter(
s=>s.absences>0
).length

const present=
students.length-absent

const percent=Math.round(
(present/students.length)*100
)

return(

<div className='bg-white p-8 rounded-3xl mb-8'>

<p>Студентів: {students.length}</p>
<p>Присутні: {present}</p>
<p>Відсутні: {absent}</p>
<p>Відвідуваність: {percent}%</p>

<p>Вересень: 5 пропусків</p>
<p>Жовтень: 2 пропуски</p>

</div>

)

}