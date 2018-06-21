const { Student } = require ('./db')
const uuidv1 = require('uuid/v1')


const students = [
  {id: uuidv1(), name: 'Jane'},
  {id: uuidv1(), name: 'Jack'},
  {id: uuidv1(), name: 'John'}
]

Student.insertMany(students)
