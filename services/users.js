const BASE_API = 'https://reqres.in/api/users'

export async function getUsers (page = 1) {
  const url = BASE_API + `?page=${page}`
  const res = await fetch(url)

  if (!res.ok) {
    throw Error(`Fetch failed: ${res}`)
  }

  return res.json()
}