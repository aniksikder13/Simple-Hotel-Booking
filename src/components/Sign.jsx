import {Fragment, useState} from 'react';
import {Box,TextField,Button} from '@mui/material';
import axios from 'axios';

export default function Sign(props) {
  const [userData, setUserData]= useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const inputHandler= e => {
    const name= e.target.name
    const value= e.target.value

    setUserData({
      ...userData,
      [name]: value,
      roomId: []
    })
  }

  const formHandler= e => {
    e.preventDefault()
    if(props.type === 'login'){
      axios.get('http://localhost:3500/users')
      .then(({data}) => {
        const user= data.find(item => item.email === userData.email && item.password === userData.password)
        if(user){
          localStorage.setItem('auth', JSON.stringify({name: user.name, phone: user.phone, email: user.email, auth: true}))
          document.location.href= '/'
        }
      })
    } else {
      axios.post('http://localhost:3500/users', userData)
      .then(({data}) => {
        localStorage.setItem('auth', JSON.stringify({name: data.name, phone: data.phone, email: data.email, auth: true}))
        document.location.href= '/'
      })
    }
  }

  return (
    <form onSubmit={formHandler}>
      <h3 style={{marginBottom: '20px'}}>
        {props.type === 'login' ? 'Login' : 'Register'}
      </h3>
      {
        !props.type && (<Fragment>      <Box
          sx={{
            width: '100%',
          }}
        >
          <TextField fullWidth label="Name" id="name" name='name' type='text' onChange={inputHandler} />
        </Box>
        <Box
          sx={{
            width: '100%',
            margin: '20px 0px'
          }}
        >
          <TextField fullWidth label="Phone number" id="phone" name='phone' type='number' onChange={inputHandler} />
        </Box></Fragment>)
      }
      <Box
        sx={{
          width: '100%',
          margin: '20px 0px'
        }}
      >
        <TextField fullWidth label="Email" id="email" name='email' type='email' onChange={inputHandler} />
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: '20px 0px'
        }}
      >
        <TextField fullWidth label="Password" id="password" name='password' type='password' onChange={inputHandler} />
      </Box>
      <Button
        size="large"
        variant="contained"
        type='submit'
      >
        {props.type === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  )
}