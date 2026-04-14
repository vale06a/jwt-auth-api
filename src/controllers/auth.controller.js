import bcrypt from 'bcrypt'
import { pool } from '../db/connection.js'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
// Dominios permitidos
const DOMINIOS_VALIDOS = ['gmail.com', 'hotmail.com', 'yahoo.com']

const emailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return false
  const dominio = email.split('@')[1]
  return DOMINIOS_VALIDOS.includes(dominio)
}

export const register = async (req, res) => {
  const { email, password } = req.body

  // Validar email
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' })
  }

  if (!emailValido(email)) {
    return res.status(400).json({ 
      message: 'Email no válido. Solo se permiten dominios: gmail.com, hotmail.com, yahoo.com' 
    })
  }

  try {
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?', [email]
    )
    if (existing.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, password_hash]
    )

    res.status(201).json({
      message: 'Usuario creado correctamente',
      id: result.insertId
    })

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message })
  }
}
export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' })
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    )
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const user = rows[0]

    const passwordOk = await bcrypt.compare(password, user.password_hash)
    if (!passwordOk) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    )

    res.json({ message: 'Login exitoso', token })

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message })
  }
}
export const profile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, created_at FROM users WHERE id = ?', [req.user.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json({ user: rows[0] })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message })
  }
}