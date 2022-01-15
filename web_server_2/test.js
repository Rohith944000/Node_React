'use strict'
const table = require('./src/tableinfile.js')
const path = require('path')
const assert = require('assert')
const fileName = path.join(__dirname, 'users.json')

// get all records from table
console.log(table.getTable(fileName))

const records = (table.getTable(fileName))
assert.strictEqual(records.length, 3, 'getTable is not working') // checking getTable function

// get record from table by id
console.log(table.getRec(fileName, 101))
const rec = table.getRec(fileName, 101)
// checking addRec function
assert.deepStrictEqual(rec, {
    id: 101,
    userName: 'jcote',
    age: 66
}, 'getRec function not working')

// Add Row in table
table.addRec(fileName, {
    id: 106,
    userName: 'Rishabh',
    age: 25
})
const totalRecords = (table.getTable(fileName))
assert.strictEqual(totalRecords.length, 4, 'addRec is not working') // checking addRec function

// update Row in table
table.updateRec(fileName, {
    id: 106,
    userName: 'Rishabh',
    age: 50
})
const updatedRecord = table.getRec(fileName, 106)
assert.deepStrictEqual(updatedRecord, {
    id: 106,
    userName: 'Rishabh',
    age: 50
}, 'updateRec is not working') // checking updateRec function

// save new data in table
table.saveTable(fileName, [
    {
        id: 100,
        userName: 'mvachon',
        age: 12
    },
    {
        id: 101,
        userName: 'jcote',
        age: 66
    },
    {
        id: 102,
        userName: 'pmartineau',
        age: 99
    }
]
)

const newRecords = (table.getTable(fileName))
assert.strictEqual(newRecords.length, 3, 'saveTable is not working') // checking saveTable function
