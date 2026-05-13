import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AddSauce from './pages/AddSauce';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-secret-sauce' element={<AddSauce />} />
        </Routes>
      </main>
    </>
  )
}
export default App
