import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LayOut from './components/LayOut.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LayOut>
      <App />
    </LayOut>
  </React.StrictMode>
)
