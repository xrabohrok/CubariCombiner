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

function blankGroup(){
    return {
        id: uuidv4(),
        groupName: "",
        imgur: "",
    }
}

const groupSets = ref([
    blankGroup(),
])

function simplifyModel(model, groups) {
    return {
        chapterTitle: model.chapterTitle,
        chapterGroups: groups.map(g => ({ groupName: g.groupName, imgurLink: g.imgur })),
        timestamp: model.timestamp,
        refId: props.refId
    }
}

function addGroup(){
    groupSets.value.push(
        blankGroup()
    )
}

function deleteGroup(id){
    var targetIndex = groupSets.value.findIndex(group => {
      return group.id === id
    })
    if (targetIndex < 0) return
    groupSets.value.splice(targetIndex,1)
}

function allowGroupDelete(groupSet){
    return groupSet.length >1
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
        <div class="chapter-label">
            <button name="Remove" @click="$emit('chapterRemove', props.refId)" :disabled="props.total<=1">X</button> 
            {{ props.chapterNum }}
        </div>
        <div class="form-chapter">
            <label>Chapter Title</label>
            <input type="text" v-model="model.chapterTitle"
                    @change="$emit('formChanged', simplifyModel(model, groupSets))" />
            <label class="timestamp">Timestamp</label>
            <VueDatePicker v-model="model.timestamp" :disabled="props.lockedTime" 
                @update:model-value="$emit('formChanged', simplifyModel(model, groupSets))" auto-apply />
            <div class="groups" v-for="(g, i) in groupSets" :key="g.id">
                <div class="group-label">
                    <button name="GroupRemove" @click="deleteGroup(g.id)" :disabled="!allowGroupDelete(groupSets)">X</button> 
                    {{ i+1 }}
                </div>
                <label> Group Name</label><input type="text" v-model="g.groupName"
                        @change="$emit('formChanged', simplifyModel(model, groupSets))" />
                <label>Imgur Link</label><input type="text" v-model="g.imgur"
                        @change="$emit('formChanged', simplifyModel(model, groupSets))" />
            </div>
            <button name="GroupAdd" class="group-add-button" @click="addGroup()">Add Group</button>
            <div class="imgur-preview"></div>
            
        </div>
    </div>
</template>