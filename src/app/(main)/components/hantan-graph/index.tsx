import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useGraph } from '../../hooks/use-graph'

ChartJS.register(ArcElement, Tooltip)

export default function HantanGraph() {
  const { data, filLabel } = useGraph()

  return (
    <main
      className={
        'mt-5 flex flex-col items-center gap-5 justify-center py-5 rounded bg-gray-200'
      }
    >
      <p className={'text-2xl font-semibold'}>{filLabel}</p>
      <div className={'max-w-[300]'}>
        <Pie data={data} />
      </div>
    </main>
  )
}
