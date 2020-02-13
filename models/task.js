const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    importance: {
        type: 'boolean',
        default: false
    },
    completion: {
        type: 'boolean',
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task