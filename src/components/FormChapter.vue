<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '../assets/chapter.less'

const props = defineProps(['chapterNum', 'lockedTime', 'refId', 'total'])

const model = ref({
    chapterTitle: "",
    timestamp: new Date(),
})

const groupSets = ref([
    {
        id: uuidv4(),
        groupName: "",
        imgur: "",
    }
])

function simplifyModel(model, groups) {
    return {
        chapterTitle: model.chapterTitle,
        chapterGroups: groups.map(g => ({ groupName: g.groupName, imgurLink: g.imgur })),
        timestamp: model.timestamp,
        refId: props.refId
    }
}

defineEmits({
    formChanged(payload) {
        return payload.chapterTitle != "" &&
            payload.groupName != "" &&
            payload.imgurLink != ""
    },
    chapterRemove() { return true }
})

</script>
<template>
    <div class="chapter-row">
        <div class="chapter-label">{{ props.chapterNum }}</div>
        <div class="form-chapter">
            <label>Chapter Title<input type="text" v-model="model.chapterTitle"
                    @change="$emit('formChanged', simplifyModel(model, groupSets))" /></label>
            <div v-for="g in groupSets" :key="g.id">
                <label>Group Name<input type="text" v-model="g.groupName"
                        @change="$emit('formChanged', simplifyModel(model, groupSets))" /></label>
                <label>Imgur Link<input type="text" v-model="g.imgur"
                        @change="$emit('formChanged', simplifyModel(model, groupSets))" /></label>
            </div>
            <label>Timestamp<VueDatePicker v-model="model.timestamp" :disabled="props.lockedTime" 
                @update:model-value="$emit('formChanged', simplifyModel(model, groupSets))" auto-apply /></label>
        </div>
        <button name="Remove" @click="$emit('chapterRemove', props.refId)" :disabled="props.total<=1">X</button>
    </div>
</template>