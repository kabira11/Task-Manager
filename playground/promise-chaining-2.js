require('../src/db/mongoose')
const Task = require('../src/models/task')



// Task.findByIdAndDelete('5d7a68d6b3c4e42e8456792d').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed : false})
// }).then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count;
}

deleteTaskAndCount('5d7a85912c22975d34d7bc43').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})