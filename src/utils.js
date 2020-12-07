export const capitalise = (word) => {
    if (word) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase()
    }
}

export const formatDate = (createdAt => {
    // takes a string representing the date and time eg 2018-05-30T15:59:13.341Z
    // returns a string with '<date> at <time (mins hours and mins only)>'
    if (createdAt) {
        const date = createdAt.slice(0, 10)
        const time = createdAt.slice(11, 16)
        return `${date} at ${time}`
    }
})