const mongoose = require('mongoose')
const validator = require('validator')


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        /*
        So this is saying that the data stored and owner is going to be an object I.D.
        And that's correct.
        */
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //It allows us to create a ref which is short for reference from this field to another model.
        //And in that case it would be a reference to the following a user.
        //'User' is model name whatever is given in User model schema
        ref: 'User'
    }
},
{
    timestamps: true
})


//Creating schema and collection.
const Task = mongoose.model('Task', taskSchema)

module.exports = Task