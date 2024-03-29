const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req , res ,next) => {

    try{
        //taking data from header
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id , 'tokens.token': token})
        console.log(token)
        if(!user){
            throw new Error()
        }
        console.log(user)
        req.token = token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }

    // console.log('auth middleware')
    // next()
}

module.exports = auth