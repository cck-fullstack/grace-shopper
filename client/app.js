import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AllItems from './components/all-items'

const App = () => {
  return (
    <div>
      <Navbar />
      <AllItems />
      <Routes />
    </div>
  )
}

export default App
