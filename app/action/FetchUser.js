export default async function FetchUser () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

    const response = await fetch("/api/user" ,options)
    const getUser = await response.json()

    return console.log("hello")
}
