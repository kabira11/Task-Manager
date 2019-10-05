const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const candidate = require('./routers/candidate')

const app = express()
//process.env.PORT  came from config/dev.env which cmd set in package.json
const port=process.env.PORT 


//how can we upload a file in express
//filesize in bytes below 1mb limit provided
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        //using regex for either a doc file or docx
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("Please upload a Word Document"))
        }

        cb(undefined,true)


        // cb(new Error("File must be PDF"))
        // cb(undefined,true)
        // cb(undefined,false)
    }
})

const errorMiddleware = (req, res, next) => {
    throw new Error ('From my middle ware')
}

//upload.single is middleware
app.post('/upload',upload.single('upload'),(req,res) => {
    res.send()
},(error , req, res, next) => {
    res.status(400).send({error: error.message})

})


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
app.use(candidate)

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
    const token = jwt.sign({_id: 'abcd123'} ,process.env.JWT_SECRET ,{expiresIn: '7 days'})
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
 
