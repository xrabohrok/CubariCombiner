<script setup>
import {useFormStore} from '../stores/form'

const store = useFormStore()

function addChapter(){
  store.chapterCount++
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
    <lablel>Use Current Time For all Chapters
      <input type="checkbox" name="cur-time-all" />
    </lablel>
  </form>
  
  <div>{{ store.chapterCount }}</div>
  <button @click="addChapter">Add Chapter</button>

</template>

<style scoped>
</style>
