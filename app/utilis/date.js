import moment from "moment";

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

export const formatISO= (toFormat) => {

  const formatDate= new Date(toFormat)
  const DateString= formatDate.toString()
  
  const splitDate = DateString.split(" ")

  const dateProper = splitDate[2] + " " + splitDate[1] + " " + splitDate[3]

  let options = { timeStyle: 'short', hour12: true };
  let timeString = formatDate.toLocaleTimeString('en-US', options);
  
  const fullDateFormat = dateProper + ', ' + timeString

  return fullDateFormat
}