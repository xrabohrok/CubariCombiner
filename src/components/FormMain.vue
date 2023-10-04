<script setup>
import FormChapter from "../components/FormChapter.vue"

import {useFormStore} from '../stores/form'

const store = useFormStore()

function addChapter(){
  store.chapterCount++
}

function catchChapterChange(thing){
  console.log("parent catch:")
  console.log(thing)
}


</script>

<template>
  <form>
    <label>Comic Title
      <input type="text" name="title" />
    </label>
    <label>Author
      <input type="text" name="author" />
    </label>
    <label>Artist
      <input type="text" name="artist" />
    </label>
    <label>Description
      <input type="text" name="description" />
    </label>
    <label>Use Current Time For all Chapters
      <input type="checkbox" name="cur-time-all" />
    </label>
  </form>
  
  <div>{{ store.chapterCount }}</div>
  <button @click="addChapter">Add Chapter</button>

  <FormChapter :chapter-num="i" @form-changed="(thing)=>catchChapterChange(thing)" v-for="i in store.chapterCount" :key="i"></FormChapter>

</template>

<style scoped>
</style>
