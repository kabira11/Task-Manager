require('../src/db/mongoose')
const User = require('../src/models/user')

//5d7514b5ecc0dc127021dded


// User.findByIdAndUpdate('5d7514b5ecc0dc127021dded' , {age: 19}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age : 1181})
// }).then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id , age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5d7514b5ecc0dc127021dded' , 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})