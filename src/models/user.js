const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//validate is middleware are function which are passed control during execution of async function
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive integer..') ;
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


/*
Instead what we're going to do is set up what's known as a virtual property a virtual property is not

actual data stored in the database.

It's a relationship between two entities.

In this case between our user and our task to start off we'll be using something on user schema.
Now it's virtual because we're not actually changing what we store for the user document it is just

a way for a mongoose to figure out how these two things are related.

Right here we pass to it two arguments.

The first is the name for our virtual field we could pick anything we wanted but something like tasks

seems appropriate.
And in here we're going to configure the individual field we're going to start by setting up ref like

we did for the task model and we're going to set this one equal to task.

So over inside of the task model we have a reference to the user on owner owner is a real field.

It is stored in the database.

Over here we have a reference between the user and the task on a virtual.

This is not stored in the database.

It is just for Mongoose to be able to figure out who owns what and how they're related.

Now we're going to set up two other fields on this virtual to get things to work correctly.

We have to specify the local field which will be a string.

And we also have to specify the foreign field the foreign field is also going to be a string so the

foreign field is the name of the field.

On the other thing in this case on the task that's going to create this relationship and we set that

up to be the owner of the local field is that is where that local data is stored.

So we have the owner object I.D. on the task and that is associated with the I.D. of the user here.

So the local field the users I.D. is a relationship between that and the task owner field which is also

a user I.D..

So now that we have this in place we can actually take that same code we had before use populate once

again and get all tasks that a user created.

So right here I'm going to save user.js asked the model file.
*/

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//this is explained in episode 112
//hiding private data like toke and password
userSchema.methods.toJSON = function() {
    const user = this
    /*
    Right here we'll create a another variable I'll call this something like user object and we'll get its
    value by using the two object method which is provided by Mongoose.
    */
    const userObject = user.toObject()

    //removing password and tokens
    delete userObject.password
    delete userObject.tokens

    return userObject
}
/*
So I will use an async function not an async arrow function.

And right here we'll have access to the ability to write that code so static methods are accessible

on the model sometimes called Model methods and our methods are accessible on the instances sometimes

called instance methods.
*/
userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()} , 'thisismynewcourse' ,{expiresIn: '7 days'})

    user.tokens = user.tokens.concat({token})

    //Store tokens while users login
    await user.save()
    return token
}

/*
So by setting up a value on user schema dot statics we're setting that up as something we can access

directly on the model.

Once we actually have access to it.

So right here user defined by credentials will call whatever is defined on user schema dot statics defined

by credentials.
*/

userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


//pre used for using before creating schema
//arrow function dont bind this
//next uses for run this code before a user is saved 
/*
But how does it know when we're done running our code.

Now it could just say when the function is over.

But that wouldn't account for any asynchronous process which might be occurring.

So that's why next is provided.
*/
// mongoose middleware hash the plain text password before saving
userSchema.pre('save', async function (next) {
    //this is user object for using before save in db for bcrypt pass
    const user = this
    //Returns true if this document was modified, else false.
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password , 8)
    }

console.log("just before saving")
console.log(user)

    next()
})


const User = mongoose.model("User" , userSchema)


module.exports = User