import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Carousel from './components/carousel'

const App = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Routes />
    </div>
  )
}

export default App
