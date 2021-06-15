const mongoose = require('mongoose')
const validator = require('validator')
const schedule = require('node-schedule')

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    frequencyNum: {
        type: Number,
        default: 1,
        min: 1,
        max: 60
    },
    frequencyUnit: {
        type: String,
        default: 'month',
        enum: ['week', 'month']
    },
    lastHang: {
        type:Date
    },
    nextHang: {
        type: Date
    },
    birthday: {
        type: Date
    }
})

// Create frequency that user should see friend
const createFrequency = (num,unit) => {
    if (unit === "week") return `*/${num} * * * * *`

    return `*/${num} * * * *`
}

// TODO: Change this from node-schedule to Agenda.  We want to use their mongodb database
// Schedule hang out
friendSchema.methods.scheduleHang = async (friend) => {
    const {frequencyNum,frequencyUnit} = friend

    const frequency = await createFrequency(frequencyNum,frequencyUnit)
    
    schedule.scheduleJob(frequency, () => {
        console.log(`${frequencyNum} ${frequencyUnit} passed...`)
    })
}

const Friend = mongoose.model('friend',friendSchema)

module.exports = Friend