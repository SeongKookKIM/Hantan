export const useGraph = () => {
  const filLabel = '행복해요'

  const data = {
    datasets: [
      {
        data: [12, 29],
        backgroundColor: ['hsl(0, 0%, 66%)', 'hsl(283, 100%, 23%)'],
        borderWidth: 0,
      },
    ],
  }

  return { data, filLabel }
}
