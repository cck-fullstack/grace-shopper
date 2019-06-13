import React from 'react'
import Carousel from './carousel'
import Footer from './footer'

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
      <Footer />
    </div>
  )
}

export default Home
