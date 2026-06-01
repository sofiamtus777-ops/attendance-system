type Student = {
  id: number
  name: string
  absences: number
}

type StatisticsPanelProps = {
  students: Student[]
}

export default function StatisticsPanel({
  students
}: StatisticsPanelProps) {

  const absent = students.filter(
    (s) => s.absences > 0
  ).length

  const present = students.length - absent

  const percent = students.length > 0
    ? Math.round((present / students.length) * 100)
    : 0

  return (
    <div className="bg-white p-8 rounded-3xl mb-8">

      <p>Студентів: {students.length}</p>
      <p>Присутні: {present}</p>
      <p>Відсутні: {absent}</p>
      <p>Відвідуваність: {percent}%</p>

      <p>Вересень: 5 пропусків</p>
      <p>Жовтень: 2 пропуски</p>

    </div>
  )
}