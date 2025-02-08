import {extractIdFromLink} from "./cubari"

function doSerialization(obj){
    return JSON.stringify(obj, null, 2)
}

function cubariTicks(indate){
    return Math.floor(indate.getTime()/1000)
}

function serializeFormChapters(store){
    const chapterObj = {}
    store.chapters.forEach((c,i) =>{
        const groups = {}
        c.chapterGroups.forEach(cg => {
            groups[cg.groupName] = `/proxy/api/imgur/chapter/${extractIdFromLink(cg.imgurLink)}`
        })
        chapterObj[i+1] = {
            title: c.chapterTitle,
            volume: "1",
            groups: groups,
            last_updated: store.useGlobalTime ? 
                cubariTicks(store.globalTimestamp) :
                cubariTicks(c.timestamp)
        }
    })
    const rawObj = {
        title: store.title,
        author: store.author,
        artist: store.artist,
        cover: store.cover,
        description: store.description,
        chapters: chapterObj
    }

    return doSerialization(rawObj)
}

export {serializeFormChapters}
