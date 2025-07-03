export const getTokenHelper = () => {
  return localStorage.getItem('token') || ''
}
