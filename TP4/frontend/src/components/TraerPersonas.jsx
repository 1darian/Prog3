"use client"

import { useState, useEffect } from "react"
import ListaTarjetas from "./ListaTarjetas"

const TraerPersonas = () => {
  const [personas, setPersonas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  const fetchPersonas = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_URL}/personas`)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setPersonas(data)
    } catch (err) {
      setError(err.message)
      console.error("Error al obtener personas:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPersonas()
  }, [])

  if (loading) {
    return <div className="loading">Cargando personas...</div>
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error al cargar los datos</h3>
        <p>{error}</p>
        <button className="refresh-button" onClick={fetchPersonas}>
          Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button className="refresh-button" onClick={fetchPersonas}>
          Actualizar lista
        </button>
      </div>
      <ListaTarjetas personas={personas} />
    </div>
  )
}

export default TraerPersonas
