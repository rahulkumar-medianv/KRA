import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/support' element={<SupportPage />} />
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App;