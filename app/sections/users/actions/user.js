export const FETCH_ME = 'FETCH_ME'

export const fetchMe = () => {
  const query = `{
    me {
      name, id
    }
  }`

  return {
    query,
    status: 'pending',
    type: FETCH_ME
  }
}