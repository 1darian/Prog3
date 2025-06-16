import TraerPersonas from "./components/TraerPersonas"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Personas</h1>
        <p>Aplicación que consume API de personas</p>
      </header>
      <main>
        <TraerPersonas />
      </main>
    </div>
  )
}

export default App
