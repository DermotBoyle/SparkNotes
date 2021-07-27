import dbConnect from 'middleware/mongodb'
import Note from 'models/note'

export default async function handler (req, res) {
  await dbConnect()

  const { _id, ...rest } = req.body

  if (req.method === 'PUT') {
    try {
      const createdNote = await Note.findOneAndUpdate({ _id }, rest)
      res.status(201).json({ success: true, data: createdNote })
    } catch (error) {
      res.status(400).json({ success: false, error: error })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const allNotes = await Note.findOneAndDelete(_id)
      res.status(201).json({ success: true, data: allNotes })
    } catch (error) {
      res.status(400).json({ success: false, error: error })
    }
  }
}
