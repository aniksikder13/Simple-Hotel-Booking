import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';


export default function RoomsItem({type}) {
  const [roomsData, setRoomsData]= useState([])

  useEffect(() => {
    axios.get('http://localhost:3500/rooms')
    .then(({data}) => setRoomsData(data))
  }, [])
  let rooms= []
  
  switch (type) {
    case 'Kings Room':
      rooms= roomsData.filter(item => item.category === 'kings')
      break;
    case 'Double Room':
      rooms= roomsData.filter(item => item.category === 'double')
      break
    case 'Single Room':
      rooms= roomsData.filter(item => item.category === 'single')
      break 
    default:
      rooms= roomsData
      break;
  }

  return (
    <Fragment>
      {
         rooms.map(item => <li key={item.id}>
            <Card sx={{ width: '290px', margin: '15px' }}>
              <a href={`/rooms-gallery/${item.id}`}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={item.image}
                  title={item.name}
                />
              </a>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <a href={`/rooms-gallery/${item.id}`} style={{textDecoration: 'none', color: 'green', fontSize: '1.1rem'}}>{item.name}</a>
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant="body2" color="text.secondary">
                    Price: <b>${item.price}</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: <b>{item.category} room</b>
                  </Typography>
                </div>
              </CardContent>
              <CardActions sx={{marginTop: '-13px'}}>            
                <Button size="small" onClick={() => document.location.href= `/rooms-gallery/${item.id}`}>See Detail</Button>
              </CardActions>
            </Card>
         </li>)
      }
    </Fragment>
  )
}