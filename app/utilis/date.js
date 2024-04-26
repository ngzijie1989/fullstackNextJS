export const getCurrentDate = () => {
  const fromDate = Date.now()
  const date = new Date(fromDate);
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2, '0');
  const day = String((date.getDate())).padStart(2, '0');

  const formatDate = `${year}-${month}-${day}`
  return formatDate
}

export const getEndDatePlusMonth = () => {
  const fromDate = Date.now() + 2629746000
  const date = new Date(fromDate);
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2, '0');
  const day = String((date.getDate())).padStart(2, '0');

  const formatDate = `${year}-${month}-${day}`
  return formatDate
}

export const getEndDateMinusMonth = () => {
  const fromDate = Date.now() - 2629746000
  const date = new Date(fromDate);
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2, '0');
  const day = String((date.getDate())).padStart(2, '0');

  const formatDate = `${year}-${month}-${day}`
  return formatDate
}