<script setup>
import { storeToRefs } from "pinia";
import { ref } from 'vue';
import FormChapter from "../components/FormChapter.vue"

import {useFormStore} from '../stores/form'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import "../assets/form.less"

import {v4 as uuidv4} from 'uuid'

import { serializeFormChapters } from "../scripts/serializer";
import { useTemplateRef } from "vue";

const store = useFormStore()
const modelState = ref({
  hasTitleError: false,
  hasAuthorError: false,
  hasArtistError: false,
})

const chapterRefs = useTemplateRef('chapters')


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

const jsonOutput = ref("")

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

function verifyForm(){
    modelState.value.hasTitleError = title.value === null || title.value === ''
    modelState.value.hasArtistError = artist.value === null || artist.value === ''
    modelState.value.hasAuthorError = author.value === null || author.value === ''

  const formErrors = modelState.value.hasTitleError || modelState.value.hasAuthorError ||
    modelState.value.hasArtistError;
    // console.log(`is errored: ${isErrored}`)
    // console.log(`hasTitleError: ${modelState.value.hasTitleError}, value: ${modelState.value.hasTitleError}, title: ${title.value}`)

    var chapterErrors = chapterRefs.value
      .map(c => c.validate()).reduce((a,b) => a || b, false);

    return formErrors || chapterErrors
}

function serialize(){
  if(verifyForm())
  {
    jsonOutput.value = "Required fields are missing, check above for highlighted boxes. "
  }else{
    
    jsonOutput.value = serializeFormChapters(store)
  }
}

const {title, author, artist, description, cover, useGlobalTime, globalTimestamp} = storeToRefs(store)

//seed with one
addChapter()

</script>

<template>
  <form class="main-form">
    <label>Comic Title </label>
      <input type="text" name="title" v-model="title" :class="{invalid: modelState.hasTitleError}" />

    <label>Author </label>
      <input type="text" name="author" v-model="author" :class="{invalid: modelState.hasAuthorError}"/>

    <label>Artist </label>
      <input type="text" name="artist" v-model="artist" :class="{invalid: modelState.hasArtistError}"/>
   
    <label>Description </label>
      <textarea name="description" v-model="description"></textarea>
    
    <label>Cover Image Hyperlink</label>
      <input type="text" name="cover" v-model="cover"/>
    
    <label>Use Same Time For all Chapters </label>
      <input type="checkbox" name="cur-time-all" v-model="useGlobalTime" />

    <label :disabled="!useGlobalTime">Time Override </label>
      <VueDatePicker :disabled="!useGlobalTime" v-model="globalTimestamp"></VueDatePicker>

  </form>
  <button class="new-chapter" @click="addChapter">Add Chapter</button>

  <FormChapter 
    :chapter-num="index+1" 
    @form-changed="(thing)=>catchChapterChange(thing)" 
    @chapter-remove="(id) => removeChapter(id)"
    v-for="(i, index) in store.chapters" 
    :key="i.refId"
    :total="store.chapters.length"
    :refId="i.refId"
    :locked-time="store.useGlobalTime"
    ref="chapters">
  </FormChapter>

  <button class="generate" @click="serialize">GO!</button>
  <textarea readonly v-model="jsonOutput" cols="30" rows="30" placeholder="output appears here"></textarea>

</template>

<style scoped>
</style>
