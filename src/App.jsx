import { useContext, useEffect } from 'react'
import './App.css'
import Feed from './Feed'
import Header from './Header'
import Login from './Login'
import Sidebar from './Sidebar'
import UserContextProvider from './context/UserContextProvider'
import UserContext from './context/UserContext'
import supabase from '../supabase_config'

function App() {
  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  useEffect(() => {
    document.title = "Facebook"
    async function getUser () {
      const {data, error} = await supabase.auth.getUser()
      console.log(data.user.email);
      const {data:profile, error:profileError} = await supabase
      .from('Profiles')
      .select('*')
      .eq('email', data.user.email)
      if (profile && profileError == null){
        setUser(profile[0])
      }
    }
    getUser()
  }, [])
  
  return!user ? <Login/> :(
    <>
      <div className='app'>
        <Header/>
        <div className='app__body'>
            <Sidebar/>
            <Feed/>
        </div>
      </div>
    </>
  )
}

export default App;
