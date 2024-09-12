import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './context/user.context'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'

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
  const {currentUser} = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={currentUser!= null ? <HomePage /> :<Login/>} />
        <Route path="auth" element={<Login />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  )
}

export default App
