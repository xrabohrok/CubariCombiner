<script setup>
import { storeToRefs } from "pinia";
import FormChapter from "../components/FormChapter.vue"

import {useFormStore} from '../stores/form'

import {v4 as uuidv4} from 'uuid'

const store = useFormStore()

function addChapter(){
  store.$patch(()=>{
    store.chapters.push(
      {
        chapterTitle: "",
        chapterGroups: [],
        timestamp: "",
        refId: uuidv4()
      })
  })
}

function removeChapter(id){
  console.log(`removing ${id}`)
  store.$patch(()=>{
    var targetIndex = store.chapters.findIndex(chapter => {
      return chapter.refId === id
    })
    if (targetIndex < 0) return
    store.chapters.splice(targetIndex,1)
  })
}

function updateChapter(insertModel){
  store.$patch(() => {
    var targetIndex = store.chapters.findIndex(chapter => {
      return chapter.refId === insertModel.refId
    })
    if (targetIndex < 0) return
    const finalInsert = {...insertModel}
    store.chapters[targetIndex] = finalInsert
  })
}

function catchChapterChange(thing){
  console.log("parent catch:")
  console.log(thing)
  updateChapter(thing)
}

const {title, author, artist, description, cover, useCurTime} = storeToRefs(store)

//seed with one
addChapter()

</script>

<template>
  <form>
    <label>Comic Title
      <input type="text" name="title" v-model="title" />
    </label>
    <label>Author
      <input type="text" name="author" v-model="author" />
    </label>
    <label>Artist
      <input type="text" name="artist" v-model="artist"/>
    </label>
    <label>Description
      <textarea name="description" v-model="description"></textarea>
    </label>
    <label>Cover
      <input type="text" name="cover" v-model="cover"/>
    </label>
    <label>Use Current Time For all Chapters
      <input type="checkbox" name="cur-time-all" v-model="useCurTime" />
    </label>
  </form>
  <button @click="addChapter">Add Chapter</button>

  <FormChapter 
    :chapter-num="index+1" 
    @form-changed="(thing)=>catchChapterChange(thing)" 
    @chapter-remove="(id) => removeChapter(id)"
    v-for="(i, index) in store.chapters" 
    :key="i.refId"
    :total="store.chapters.length"
    :refId="i.refId"
    :locked-time="store.useCurTime">
  </FormChapter>

  <button>GO!</button>

</template>

<style scoped>
</style>
