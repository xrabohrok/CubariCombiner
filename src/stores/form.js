import { defineStore } from 'pinia'

export const useFormStore = defineStore('form-meta', {
  state: () => ({
    title: "",
    author: "",
    artist: "",
    description: "",
    cover: "",
    useCurTime: false,
    chapterCount: 1,
    chapters: []
  }),
  getters: {
    
  },
  actions: {}
})
