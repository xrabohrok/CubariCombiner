import { defineStore } from 'pinia'

export const useFormStore = defineStore('form-meta', {
  state: () => ({
    title: "",
    author: "",
    artist: "",
    description: "",
    cover: "",
    useCurTime: false,
    chapters: []
  }),
  getters: {
    chapterCount: (store) => store.chapters.length
  },
  actions: {}
})
