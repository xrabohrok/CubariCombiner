function doSerialization(obj){
    return JSON.stringify(obj, null, 2)
}

function serializeFormChapters(store){
    const chapterObj = {}
    store.chapters.forEach((c,i) =>{
        const groups = {}
        c.chapterGroups.forEach(cg => {
            groups[cg.groupName] = cg.imgurLink
        })
        chapterObj[i+1] = {
            title: c.chapterTitle,
            volume: "1",
            groups: groups,
            last_updated: store.useGlobalTime ? 
                store.globalTimestamp :
                c.timestamp
        }
    })
    const rawObj = {
        title: store.title,
        author: store.author,
        cover: store.cover,
        description: store.description,
        chapters: chapterObj
    }

    return doSerialization(rawObj)
}

export {serializeFormChapters}

