<script setup>
import { ref } from 'vue';

const props = defineProps(['chapterNum', 'lockedTime', 'refId', 'total'])

const model = ref({
    chapterTitle: "",
    groupName: "",
    imgurLink: "",
    timestamp: "",
})

function simplifyModel(model){
    return {
        chapterTitle: model.chapterTitle,
        groupName: model.groupName,
        imgurLink: model.imgurLink,
        timestamp: model.timestamp,
        refId: props.refId
    }
}

defineEmits({
    formChanged(payload){
        return payload.chapterTitle != "" &&
            payload.groupName != "" &&
            payload.imgurLink != "" 
    },
    chapterRemove(){return true}
})

</script>
<template>
    <div class="chapter-row">
        <div class="chapter-label">{{ props.chapterNum }}</div>
        <div class="form-chapter">
            <label>Chapter Title<input type="text" v-model="model.chapterTitle" @change="$emit('formChanged',simplifyModel(model))"/></label>
            <label>Group Name<input type="text" v-model="model.groupName" @change="$emit('formChanged',simplifyModel(model))"/></label>
            <label>Imgur Link<input type="text" v-model="model.imgurLink" @change="$emit('formChanged',simplifyModel(model))"/></label>
            <label>Timestamp<input type="text" v-model="model.timestamp" :disabled="props.lockedTime" @change="$emit('formChanged',simplifyModel(model))"/></label>
        </div>
        <button name="Remove" @click="$emit('chapterRemove', props.refId)" :disabled="props.total<=1">X</button>
    </div>
</template>