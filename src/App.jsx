import { useState } from "react"
import "./App.css"

// url base de la query
const URL = "http://localhost:8983/solr/app_test/select?rows=3&q=id%3A"

export default function App() {
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)

  const handleChange = (event) => {
    // Quito todas los espacios al inicio y al final del texto
    // Cambio los espacios internos por "%20"
    setText(event.target.value.trim().replaceAll(" ", "%20"));

    if (!event.target.value) setResult(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(`${URL}${text}%20OR%20content%3A${text}`)
    const res = await response.json()
    setResult(res.response.docs)
  }

  // función que pasa el path a el nombre del archivo con su extención
  const parcePath = path => path.replace(/^.*[\\\/]/, '')

  return (
    <div className="App">
      <span>{text}</span>
      <form onSubmit={handleSubmit} className="search">
        <div>
          <input onChange={handleChange} type="text" />
          <button>Buscar</button>
        </div>
        <ul>
          {result &&
            result.map((file) => (
              <li key={file.id}>
                <a href={file.id}>{parcePath(file.id)}</a>
              </li>
            ))}
        </ul>
      </form>
    </div>
  )
}
