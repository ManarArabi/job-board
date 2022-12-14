import app from './app.js'
import mongoose from 'mongoose'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Mongoose is running')
}).catch(() => {
  console.log('Failed to start mongoose')
})
