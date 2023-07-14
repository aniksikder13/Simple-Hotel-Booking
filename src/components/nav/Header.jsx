import { useEffect, useState } from "react"
import {Button} from '@mui/material'

export default function Header() {
  const [isAuth, setIsAuth]= useState(false)

  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem('auth'))

    if(user.auth){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])

  const logOutHandler= () => {
    localStorage.setItem('auth', JSON.stringify({}))
    document.location.reload()
  }

  const authButton= isAuth ? <Button size="large" variant="contained" sx={{backgroundColor: 'red'}} onClick={logOutHandler}>Logout</Button> : <a href="/auth" style={{fontSize: '1rem', color: 'green'}}>Login / Register</a>

  return (
    <header>
      <nav>
        <ul>
              <li>
                  <a href="/">Pure Hotel</a>
              </li>
              <li>
                  {authButton}
              </li>
          </ul>
      </nav>
    </header>
  )
}