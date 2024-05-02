
export default async function ResetPassword (emailField) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

    const response = await fetch(`/api/sendmail?email=${emailField}` ,options)
    const sendmail = await response.json()
    const info = sendmail.data

    return info
}
