import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'

const HomePage = () => {
  return <div>Home Page</div> 
}

const ProductsPage = () => {
  return <div>Products Page</div>
}

const TicketsPage = () => {
  return <div>Tickets Page</div>
}

const SettingsPage = () => {
  return <div>Settings Page</div>
} 

const HelpPage = () => {
  return <div>Help Page</div>
} 

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  )
}

export default App
