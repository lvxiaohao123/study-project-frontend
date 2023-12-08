import {reactive} from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const auth = reactive({
    user: null
  })

  // 保存数据到 localStorage
  const saveDataToLocalStorage = () => {
    localStorage.setItem('auth', JSON.stringify(auth))
  }

  // 从 localStorage 中加载数据
  const loadDataFromLocalStorage = () => {
    const data = localStorage.getItem('auth')
    if (data) {
      Object.assign(auth, JSON.parse(data))
    }
  }

  // 在页面刷新前保存数据
  window.addEventListener('beforeunload', saveDataToLocalStorage)

  // 在页面加载时加载数据
  loadDataFromLocalStorage()

  return { auth }
})
