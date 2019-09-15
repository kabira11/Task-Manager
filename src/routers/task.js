const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks' , async (req, res) => {
    const task = new Task(req.body)
    console.log(req.body)

//using async await
    try {
        await task.save()
        res.status(201).send(task)
    }catch (err) {
        res.status(400).send(err)
    }

//using without async await
    // const task = new Task(req.body)
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((err) => {
    //     //setting error status code and sending response
    //     res.status(400).send(err)
    // })

})


router.get('/tasks' , async (req , res) => {

//using async await
    try {
        const task = await Task.find({})
        res.status(201).send(task)
    }catch (err) {
        res.status(400).send(err)
    }

//using without async await
    // Task.find({}).then((task) => {
    //     res.status(200).send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })

})

router.get('/tasks/:id' , async (req , res) => {
    const id = req.params.id

//using async await
    try {
     const task = await Task.findById(id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (err) {
        res.status(400).send(err)
    }


//using without async await
    // Task.findById(id).then((task) => {
    //     if(!task){
    //         return res.status(404).send(task)
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })

})

//update task
router.patch('/tasks/:id' , async (req , res) => {

    const id = req.params.id

//Object.keys return array of string for keys
    const updates = Object.keys(req.body)

    const allowedUpdates = ['description' , 'completed']
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
        const task = await Task.findByIdAndUpdate(id, req.body , 
            {new: true , runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id' , async (req , res) => {

    const id = req.params.id

//using async await
    try {
     const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (err) {
        res.status(400).send(err)
    }

})

module.exports = router