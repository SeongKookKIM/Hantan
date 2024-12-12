export const useDate = () => {
  const todayDate = new Date()

  const year = todayDate.getFullYear()
  const month = String(todayDate.getMonth() + 1).padStart(2, '0')
  const day = String(todayDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return { formattedDate }
}
