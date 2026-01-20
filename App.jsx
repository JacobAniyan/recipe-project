import './src/CSS/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Homepage from './Homepage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipe" element={<div>All Recipes Page</div>} />
          <Route path="/recipe/:id" element={<div>Individual Recipe Page</div>} />
          <Route path="/results" element={<div>Search Results Page</div>} />
          <Route path="/favourites" element={<div>Favourites Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
