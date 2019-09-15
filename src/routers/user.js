const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users' , async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)

//using async await
    try {
        await user.save()
        res.status(201).send(user)
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


router.get('/users' , async (req , res) => {

//using async await
try {
    const user = await User.find({})
    res.status(201).send(user)
}catch (err) {
    res.status(400).send(err)
}



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
        //{new: true} option for returing updated data
        //{runValidators: true} option for validation for update value
        const user = await User.findByIdAndUpdate(id, req.body , 
            {new: true , runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/users/:id' , async (req , res) => {

    const id = req.params.id

//using async await
    try {
     const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (err) {
        res.status(400).send(err)
    }

})

module.exports = router