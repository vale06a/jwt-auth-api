import express from 'express'
import { config } from './config/config.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(config.port, () => {
  console.log(`Servidor corriendo en puerto ${config.port}`)
})

export default app