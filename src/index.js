const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port=process.env.PORT || 3005

//Automatically parse json to js object
app.use(express.json())
//register userRouter and taskRouter router to our existing app
app.use(userRouter)
app.use(taskRouter)


// const router = new express.Router()

// //create router 
// router.get('/test' , (req,res) => {
//     res.send('this is from my other router')
// })

// //register test router to our existing app
// app.use(router)

app.listen(port , () => {
    console.log('Server is on port ' + port)
})

const bcrypt = require('bcryptjs')
const myFunction = async () => {
    const pass = "user1234"
    const hashedPassword = await bcrypt.hash(pass, 8)

    console.log(pass)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare(pass,hashedPassword)
    console.log(isMatch)
}


myFunction()