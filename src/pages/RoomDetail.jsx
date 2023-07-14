import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Modal from '../components/Modal'

export default function RoomDetail() {
  const [room, setRoom]= useState({})
  const [isBook, setIsBook]= useState(true)
  const [authUser, setAuthUser]= useState({})
  const [modalOpen, setModalOpen] = useState(false);
  const params= useParams()

  useEffect(() => {
    axios.get('http://localhost:3500/rooms')
    .then(({data}) => {
      setRoom(data.find(room => room.id === +params.id))
    })
    setAuthUser(JSON.parse(localStorage.getItem('auth')))

    axios.get('http://localhost:3500/users')
    .then(({data}) => {
      let roomID= []
      data.map(user => {roomID.push(...user.roomId)})

      roomID.map(id => {
        if(id === +params.id){
          setIsBook(false)
        }
      })
    })

  }, [params])

  const roomHandler= () => {
    if(authUser.auth){
      axios.get(`http://localhost:3500/users`)
      .then(({data}) => {
        const currentUser= data.find(user => user.email === authUser.email)
        axios.put(`http://localhost:3500/users/${currentUser.id}`, {...currentUser, roomId: [...currentUser.roomId, +params.id]})
        setModalOpen(true)
      })
    } else {
      window.location.href='/auth'
    }
  }

  return (
  <Fragment>
      <div className='room-container'>
        <div className='room-image'>
          <img src={room.image} alt={room.name} style={{borderRadius: '5px', width: '100%'}} />
        </div>
        <div className='room-detail'>
          <h2 style={{fontSize: '1.4rem'}}>{room.name}</h2>
          <p><b>Price: </b>{room.price}</p>
          <p><b style={{color: isBook ? 'green' : 'red'}}>{isBook ? 'Booking Available' : 'Not availabel for booking'}</b></p>
          <button onClick={roomHandler} className={`${!authUser.auth && 'danger'}`} disabled={!isBook && true}>{authUser.auth ? `${isBook ? 'Book now' : 'Not Available'}` : 'Login'}</button>
        </div>
      </div>
      <Modal open={modalOpen} close={() => setModalOpen(false)}>
      <h3 style={{color: 'green'}}>Your Room Is Booked!</h3>
      <p>Your name: {authUser.name}</p>
      <p>Your Phone Number: {authUser.phone}</p>
      </Modal>
  </Fragment>
  )
}
