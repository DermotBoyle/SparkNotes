import dbConnect from 'middleware/mongodb'
import Note from 'models/note'

export default async function handler (req, res) {
  await dbConnect()

  const { word } = req?.query

  if (req.method === 'GET') {
    try {
      const notesWithMatch = await Note.find({ keywords: word })
      res.status(201).json({ success: true, data: notesWithMatch })
    } catch (error) {
      res.status(400).json({ success: false, error: error })
    }
  }
}
