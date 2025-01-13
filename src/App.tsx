import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import { Secure } from './components/Secure'
import { SecureRedirect } from './pages/SecureRedirect'
import { Main } from './pages/Main'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard} from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { EditProfile } from './pages/EditProfile'
import { User } from './pages/User'
import { OtherUser } from './pages/OtherUser'
import { EditUser } from './pages/EditUser'

function App() {

return(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecureRedirect/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/dashboard" element={<Secure element={<Dashboard />} />} />
        <Route path ="/profile" element={<Secure element={<Profile/>}/>}/>
        <Route path ="/editProfile" element={<Secure element={<EditProfile/>}/>}/>
        <Route path ="/editUser" element={<Secure element={<EditUser/>}/>}/>
        <Route path ="/user" element={<Secure element={<User/>}/>}/>
        <Route path ="/otheruser" element={<Secure element={<OtherUser/>}/>}/>
      </Routes>
    </BrowserRouter>
  </>
)
}
export default App
