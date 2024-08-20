/* import React from 'react' */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ConversionPage from './pages/ConversionPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/convert-log" element={<ConversionPage />} />
      </Routes>
    </Router>
  )
}

export default App