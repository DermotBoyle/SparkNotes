import mongoose from 'mongoose'
import moment from 'moment'

var Schema = mongoose.Schema

const NoteSchema = new Schema({
  created: {
    type: Date,
    required: false,
    default: () => moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')
  },
  subject: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    required: false,
    default: () => moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')
  }
})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
