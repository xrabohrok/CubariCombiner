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
        groupName: "",
        imgurLink: "",
        timestamp: "",
        chapterNum: store.chapterCount + 1,
        refId: uuidv4()
      })
  })
}

function catchChapterChange(thing){
  console.log("parent catch:")
  console.log(thing)
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
      <input type="text" name="description" v-model="description"/>
    </label>
    <label>Cover
      <input type="text" name="cover" v-model="cover"/>
    </label>
    <label>Use Current Time For all Chapters
      <input type="checkbox" name="cur-time-all" v-model="useCurTime" />
    </label>
  </form>
  
  <div>{{ store.chapterCount }}</div>
  <button @click="addChapter">Add Chapter</button>

  <FormChapter :chapter-num="i.chapterNum" @form-changed="(thing)=>catchChapterChange(thing)" v-for="i in store.chapters" :key="i.refId"></FormChapter>

</template>

<style scoped>
</style>
