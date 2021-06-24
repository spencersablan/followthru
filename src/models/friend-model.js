const mongoose = require('mongoose')
const hbs = require('hbs')
const validator = require('validator')
const { DateTime } = require('luxon')

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
    dates: [{
        label: {
            type: String
        },
        date: {
            type: Date
        },
        formattedDate: {
            type: String
        }
    }],
    notes:  [{
        title: {
            type: String
        },
        body: {
            type: String
        }
    }],
    associatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// Create frequency that user should see friend
// const createFrequency = (num,unit) => {
//     if (unit === "week") return `*/${num} * * * * *`

//     return `*/${num} * * * *`
// }

// Schedule hang out
// friendSchema.methods.scheduleHang = async (friend) => {
//     const {frequencyNum,frequencyUnit} = friend

//     const frequency = await createFrequency(frequencyNum,frequencyUnit)
    
//     schedule.scheduleJob(frequency, () => {
//         console.log(`${frequencyNum} ${frequencyUnit} passed...`)
//     })
// }

friendSchema.pre('save', function(next) {
    const friend = this

    friend.dates.forEach( (date) => date.formattedDate = DateTime.fromJSDate(date.date).toLocaleString(DateTime.DATE_SHORT))

    next()
})


const Friend = mongoose.model('friend',friendSchema)

module.exports = Friend