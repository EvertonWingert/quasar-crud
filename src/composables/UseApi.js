import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    const { data } = await api.get(url)
    return data
  }

  const getById = async (id) => {
    const { data } = await api.get(`${url}/${id}`)
    return data
  }

  const post = async (form) => {
    const { data } = await api.post(url, form)
    return data
  }

  const update = async (form) => {
    const { data } = await api.put(`${url}/${form.id}`, form)
    return data
  }

  const remove = async (id) => {
    const { data } = await api.delete(`${url}/${id}`)
    return data
  }

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
