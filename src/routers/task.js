const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks' ,auth, async (req, res) => {
    // const task = new Task(req.body)
    console.log(req.body)

    //user id added to task whoever is creating task
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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


//show task whoever is created
router.get('/tasks' , auth , async (req , res) => {

//using async await
    try {
        // const task = await Task.find({owner: req.user._id})
        //this line works exact the same as above line
        await req.user.populate('tasks').execPopulate()
        res.status(201).send(req.user.tasks)
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

router.get('/tasks/:id' , auth , async (req , res) => {
    const _id = req.params.id

    //using async await
    try {
    //  const task = await Task.findById(id)

    const task = await Task.findOne({_id, owner: req.user._id})
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
//task update option for whoever is created
router.patch('/tasks/:id' ,auth, async (req , res) => {

    const id = req.params.id
    console.log("object")
    console.log(req.user._id)
    console.log(id) 
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

        //finding task for user who is created
        const task = await Task.findOne({_id: id , owner: req.user._id})
        // const task = await Task.findById(id)


        
        //alternate of this code is above for using middleware which is witten in user model
        //{new: true} option for returing updated data
        //{runValidators: true} option for validation for update value
        // const task = await Task.findByIdAndUpdate(id, req.body , 
        //     {new: true , runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update] )
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id' , auth, async (req , res) => {

    const id = req.params.id

//using async await
    try {
    //  const task = await Task.findByIdAndDelete(id)
    //this code is for delete task for particular user
    const task = await Task.findOneAndDelete({_id: id , owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (err) {
        res.status(400).send(err)
    }

})

module.exports = router