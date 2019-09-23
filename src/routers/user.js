const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//second argument is middleware function to run 
router.post('/users' , async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)

//using async await
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})
    }catch (err) {
        res.status(400).send(err)
    }

//using without async await
    // user.save().then(() => {
    //     //201 for created something
    //     res.status(201).send(user)
    // }).catch((err) => {
    //     //setting error status code and sending response
    //     res.status(400).send(err)
    // })

})

router.post('/users/login' , async (req , res) => {
    console.log(req.body)
    //using async await
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user,token})
    }catch (err) {
        res.status(400).send(err)
    }
    
})


router.post('/users/logout' ,auth, async (req , res) => {
    //using async await
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch (err) {
        console.log("error")
        res.status(500).send(err)
    }
    
})


router.post('/users/logoutAll' ,auth, async (req , res) => {
    // console.log(req)
    //using async await
    try {

        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch (err) {
        console.log("error")
        res.status(500).send(err)
    }
    
})



//second argument is middleware function to run 
router.get('/users/me' , auth ,  async (req , res) => {

    res.send(req.user)
//using async await
// try {
//     const user = await User.find({})
//     res.status(201).send(user)
// }catch (err) {
//     res.status(400).send(err)
// }



//using without async await
    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((e) => {
    //     res.status(500).send(e) 
    // })

})

router.get('/users/:id' , async (req , res) => {

    const id = req.params.id

//using async await
    try {
     const user = await User.findById(id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (err) {
        res.status(400).send(err)
    }


//using without async await
    // console.log(req.params)
    // const id = req.params.id
    // User.findById(id).then((users) => {
    //     if(!users){
    //         return res.status(404).send(users)
    //     }
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })

})

router.patch('/users/:id' , async (req , res) => {

    const id = req.params.id

//Object.keys return array of string for keys
    const updates = Object.keys(req.body)

    const allowedUpdates = ['name' , 'email' , 'password' , 'age']
//suppose 4 true and a false return result is false
//this is for update property which is not exist
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error : "Invalid Updates!"})
    }

    try{

        const user = await User.findById(id)

        updates.forEach((update) => user[update] = req.body[update] )
        await user.save()
        
        //alternate of this code is above for using middleware which is witten in user model
        //{new: true} option for returing updated data
        //{runValidators: true} option for validation for update value
        // const user = await User.findByIdAndUpdate(id, req.body , 
        //     {new: true , runValidators: true})


        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

//auth adding as second parameter for check user login or not
router.delete('/users/me' , auth, async (req , res) => {

    // const id = req.params.id

//using async await
//req.user._id came from auth()
    try {
    //  const user = await User.findByIdAndDelete(req.user._id)
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //above code replacement done by below
        await req.user.remove()
        res.send(req.user)
    }catch (err) {
        res.status(400).send(err)
    }

})

module.exports = router