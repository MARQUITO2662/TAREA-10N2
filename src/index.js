import express from 'express'
import { getUsers, createUser, getUserById, updateUser, deleteUser } from './controller/userController.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5500'
}))

// Rutas para las operaciones CRUD de usuarios

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios.' })
  }
})

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const user = await getUserById(userId)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario.' })
  }
})

app.post('/users', async (req, res) => {
  const userData = req.body
  try {
    const userId = await createUser(userData)
    res.json({ id: userId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id
  const userData = req.body
  try {
    const success = await updateUser(userId, userData)
    if (success) {
      res.json({ message: 'Usuario actualizado exitosamente.' })
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const success = await deleteUser(userId)
    if (success) {
      res.json({ message: 'Usuario eliminado exitosamente.' })
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`)
})
