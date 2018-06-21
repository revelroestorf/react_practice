const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuidv1 = require('uuid/v1')
const {student} = require('db')


const app = express()

// Using array instead of a database. So this is our database!
// const students = [
//   {id: uuidv1(), name: 'Jane'},
//   {id: uuidv1(), name: 'Jack'},
//   {id: uuidv1(), name: 'John'}
// ]



app.use(bodyParser.json())
app.use('/api/', cors())

// Return all students
app.get('/api/students', async (req, res) => {
  //  Stringify students array. Will also set http content type to json.
  // res.json(students)
  // but find is async so need a then or async await
  res.json(await Student.find())

})
app.post('/api/students', async (req, res) => {
  //  Stringify students array. Will also set http content type to json.
  // const student = { id: uuidv1(), name: req.body.student }
  // students.push(student)
  const student = new Student({
    id: uuidv1(),
    name: req.body.student
  })
  await student.save()
  res.json(student)
  // console.log(req.body)
})

app.listen(3333, () => console.log('listening on 3333'))
