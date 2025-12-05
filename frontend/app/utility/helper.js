import axios from 'axios'

const Axiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true
});
const getCokies = (name) => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export { Axiosinstance, getCokies }