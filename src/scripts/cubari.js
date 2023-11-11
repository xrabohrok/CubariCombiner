const GalleryIdTest = /^(\w){7}$/i
const validLinkTest = /^(https:\/\/)?(www\.)?imgur\.com\/(a|gallery)\/.......$/i
const idPart = /(a|gallery)\/.......$/

function isFullLink(input){
    const testString = input.trim()
    return validLinkTest.test(testString)
}

function isGalleryId(input){
    const testString = input.trim()
    return GalleryIdTest.test(testString)
}

function isValidLink(input){
    //https://imgur.com/a/ruOqLxv

    return isFullLink(input) || isGalleryId(input)
}

function extractIdFromLink(input){
    if(!isFullLink(input)) return ""
    var matches = idPart.matches(input.trim())
    if(matches === null) return ""
    return matches[0].split("/")[2]
}

export {isValidLink, isGalleryId, extractIdFromLink}