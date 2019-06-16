import React from 'react'
import Carousel from './carousel'

const Home = () => {
  return (
    <div>
      <div className="sliderboi">
        <Carousel />
      </div>
      <div>
        <button
          id="view-all-btn"
          className="btn-large waves-effect waves-light blue"
        >
          View All
        </button>
      </div>
    </div>
  )
}

export default Home
