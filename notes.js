const fs = require('fs')
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...'
}
const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(note => {
    //     return note.title === title
    // })
    const duplicateNote = notes.find(note => note.title === title)

    console.log(duplicateNotes)
    // if (duplicateNotes.length === 0) 
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("new note added!"))
    } else {
        console.log(chalk.red.inverse("ntoe title taken"))
    }
}
const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => {
        return note.title !== title
    })
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green('Note removed!'));

    } else {
        console.log(chalk.red('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach(note => console.log(chalk.green.inverse(note.title)))
}
const readNote = (title) => {
    const notes = loadNotes()
    const toRead = notes.find(note => note.title === title)

    if (toRead) {
        console.log(chalk.inverse.magenta(toRead.title))
        console.log(toRead.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}