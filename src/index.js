const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port=process.env.PORT || 3005

//
// Without middleware: new request -> run route handler
//
// with middleware: new request -> do something -> run route handler
//

/*Now this function is the function that's going to run between the request coming to the server and the
root handler actually running. */
// app.use((req,res , next) => {
//     console.log(req.method , req.path)

//     //this is for forwarding code to router
//     next()
// })


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


// myFunction()

//jsonwebtoken testing code
const jwt = require('jsonwebtoken')

const myFunction1 = async () => {

    //creating token
    //expiresIn set expire of web token
    const token = jwt.sign({_id: 'abcd123'} ,'thisismynewcourse' ,{expiresIn: '7 days'})
    console.log("token")
    console.log(token)
    //first part of token.This is a base64 encoded Jason string.And this is known as the header.
    /*
    The second piece in between the two periods.
    This is known as the payload or body.
    And this contains the data that we provided which in our case would be the I.D. from up above.
    */
    /*
    After that last period to the very end of the Jason Webb token we have the signature.

    And this is used to verify the token later on when we verify it.
    */
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmNkMTIzIiwiaWF0IjoxNTY4NjU2NTk4fQ.S_1woo_2XpWuRc8OwDsp1ppVXXNifG8H7eToBco2yBs
 

    //verify token -- data
    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
}

// myFunction1()

//practice for connecting task to user 
// const User = require('../src/models/user')
// const Task = require ('../src/models/task')

// const main = async () => {
    // const task = await Task.findById('5d8677e979953e5418ca0b15')
    //Allows us to populate data from a relationship such as the data we have right here for owner we pass
    /*So what exactly is this line going to do.
    It's going to go off and it's going to find the user who's associated with this task and task that owner
    will now be their profile the entire document as opposed to just being the I.D..
    */
    // await task.populate('owner').execPopulate()
    // console.log(task)


// const user = await User.findById('5d867669de2d9459ace43c1c')
// await user.populate('tasks').execPopulate()
// console.log(user.tasks)

// }

// main()
 
