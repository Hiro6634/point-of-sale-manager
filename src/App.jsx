import React from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = () => {
  return <div>Home Page</div> 
}

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
      </Route>
    </Routes>
  )
}

export default App
