import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Swap from './pages/Swap'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/swap' Component={Swap}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
