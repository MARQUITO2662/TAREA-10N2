import connection from '../db.js'

const getUsers = async () => {
  try {
    const [rows] = await connection.execute('SELECT * FROM usuario')
    return rows
  } catch (error) {
    console.error('Error al obtener usuarios de la base de datos:', error)
    throw error
  }
}

const createUser = async (userData) => {
  try {
    const { nombre, apellido, correo, edad } = userData

    // Validar que los campos obligatorios no estén vacíos
    if (!nombre || !apellido || !correo || !edad) {
      throw new Error('Todos los campos son obligatorios.')
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      throw new Error('El formato del correo electrónico no es válido.')
    }

    const [result] = await connection.execute(
      'INSERT INTO usuario (nombre, apellido, correo, edad) VALUES (?, ?, ?, ?)',
      [nombre, apellido, correo, edad]
    )
    return result.insertId
  } catch (error) {
    console.error('Error al crear usuario en la base de datos:', error)
    throw error
  }
}

const getUserById = async (userId) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM usuario WHERE id = ?', [userId])
    if (rows.length > 0) {
      return rows[0]
    } else {
      throw new Error('Usuario no encontrado')
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error)
    throw error
  }
}

const updateUser = async (userId, userData) => {
  try {
    const { nombre, apellido, correo, edad } = userData
    const [result] = await connection.execute(
      'UPDATE usuario SET nombre=?, apellido=?, correo=?, edad=? WHERE id=?',
      [nombre, apellido, correo, edad, userId]
    )
    return result.affectedRows > 0
  } catch (error) {
    console.error('Error al actualizar usuario en la base de datos:', error)
    throw error
  }
}

const deleteUser = async (userId) => {
  try {
    const [result] = await connection.execute('DELETE FROM usuario WHERE id = ?', [userId])
    return result.affectedRows > 0
  } catch (error) {
    console.error('Error al eliminar usuario en la base de datos:', error)
    throw error
  }
}

const insertUserData = async (nombre, apellido, correo, edad) => {
  try {
    // Validar que los campos obligatorios no estén vacíos
    if (!nombre || !apellido || !correo || !edad) {
      throw new Error('Todos los campos son obligatorios.')
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      throw new Error('El formato del correo electrónico no es válido.')
    }

    const [result] = await connection.execute(
      'INSERT INTO usuario (nombre, apellido, correo, edad) VALUES (?, ?, ?, ?)',
      [nombre, apellido, correo, edad]
    )
    return result.insertId
  } catch (error) {
    console.error('Error al insertar datos en la base de datos:', error)
    throw error
  }
}

export { getUsers, createUser, getUserById, updateUser, deleteUser, insertUserData }
