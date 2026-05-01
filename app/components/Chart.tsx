'use client'
import { Bar } from 'react-chartjs-2'
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement)

export default function Chart({students, absences}){

const data = {
labels: students.map(s => s.name),
datasets: [
{
label: 'Пропуски',
data: students.map(s => absences(s.id))
}
]
}

return (
<div className='bg-white p-6 rounded-3xl mt-6'>
<h2 className='text-xl mb-4'>Графік пропусків</h2>
<Bar data={data}/>
</div>
)
}