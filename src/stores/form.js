import { defineStore } from 'pinia'

export const useFormStore = defineStore('form-meta', {
  state: () => ({
    title: "",
    author: "",
    artist: "",
    description: "",
    cover: "",
    useGlobalTime: false,
    globalTimestamp: new Date(),
    chapters: []
  }),
  getters: {
    chapterCount: (store) => store.chapters.length
  },
  actions: {}
})
