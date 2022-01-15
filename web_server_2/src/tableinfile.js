'use strict'

const fs = require('fs')

function getTable (fileName) {
    const data = fs.readFileSync(fileName)
    return JSON.parse(data)
}

function getRec (fileName, id) {
    const data = fs.readFileSync(fileName)
    const jsonDataArray = JSON.parse(data)
    for (let i = 0; i < jsonDataArray.length; i++) {
        if (id === jsonDataArray[i].id) {
            return jsonDataArray[i]
        }
    }
    throw 'id not found'
}

function addRec (fileName, newData) {
    let idExists = false
    const data = fs.readFileSync(fileName)
    const jsonDataArray = JSON.parse(data)
    for (let i = 0; i < jsonDataArray.length; i++) {
        if (newData.id === jsonDataArray[i].id) {
            idExists = true
        }
    }
    if (!idExists) {
        jsonDataArray.push(newData)
        const jsonDataString = JSON.stringify(jsonDataArray)
        fs.writeFileSync(fileName, jsonDataString)
    } else {
        throw 'id already exits'
    }
}

function updateRec (fileName, newData) {
    let idExists = false
    const data = fs.readFileSync(fileName)
    const jsonDataArray = JSON.parse(data)
    for (let i = 0; i < jsonDataArray.length; i++) {
        if (newData.id === jsonDataArray[i].id) {
            jsonDataArray[i] = newData
            idExists = true
        }
    }
    if (idExists) {
        const jsonDataString = JSON.stringify(jsonDataArray)
        fs.writeFileSync(fileName, jsonDataString)
    } else {
        throw 'id not found'
    }
}

function saveTable (fileName, data) {
    const jsonDataString = JSON.stringify(data)
    fs.writeFileSync(fileName, jsonDataString)
}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    addRec: addRec,
    updateRec: updateRec,
    saveTable: saveTable
}
