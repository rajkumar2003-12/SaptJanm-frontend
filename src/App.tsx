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
import { UserDetails } from './pages/UserDetails'
import { EditUser } from './pages/EditUser'
import { AuthorProfile } from './pages/AuthorProfile'

function App() {

return(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecureRedirect/>}/>
        <Route path="/main" element={<Main/>}/>
        {/* <Route path="/main" element={<SecureRedirect  {<Main />}/>} /> */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/dashboard" element={<Secure element={<Dashboard />} />} />
        <Route path ="/profile" element={<Secure element={<Profile/>}/>}/>
        <Route path ="/editProfile" element={<Secure element={<EditProfile/>}/>}/>
        <Route path ="/editUser" element={<Secure element={<EditUser/>}/>}/>
        <Route path ="/userDetails" element={<Secure element={<UserDetails/>}/>}/>
        <Route path ="/authorProfile" element={<Secure element={<AuthorProfile/>}/>}/>
      </Routes>
    </BrowserRouter>
  </>
)
}
export default App
