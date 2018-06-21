const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/studentdb')

const Student = mongoose.model('Student', {
  id: String,
  name: String
})

module.exports = { Student }

// not this way because not requiring react!
// export default Student
