import dbConnect from 'middleware/mongodb'
import Note from 'models/note'

export default async function handler (req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    try {
      const createdNote = await Note.create(req.body)
      res.status(201).json({ success: true, data: createdNote })
    } catch (error) {
      res.status(400).json({ success: false, error: error })
    }
  }

  if (req.method === 'GET') {
    try {
      const allNotes = await Note.find()
      res.status(201).json({ success: true, data: allNotes })
    } catch (error) {
      res.status(400).json({ success: false, error: error })
    }
  }
}
