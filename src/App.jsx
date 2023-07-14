import './App.css'
import Auth from './pages/auth'
import RoomDetail from './pages/RoomDetail'
import RoomItemsLanding from './pages/RoomItemsLanding'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/rooms-gallery' element={<RoomItemsLanding />} />
        <Route path='/rooms-gallery/:id' element={<RoomDetail />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/rooms-gallery' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App