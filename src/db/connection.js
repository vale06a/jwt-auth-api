import mysql from 'mysql2/promise'
import { config } from '../config/config.js'

export const pool = mysql.createPool({
  host:     config.db.host,
  port:     4000,
  user:     config.db.user,
  password: config.db.password,
  database: config.db.database,
  ssl:      { rejectUnauthorized: true }
})