import React from 'react'
import Carousel from './carousel'
import Footer from './footer'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="sliderboi">
        <Carousel />
      </div>
      <div>
        <Link to="/items">
          <button
            id="view-all-btn"
            className="btn-large waves-effect waves-light blue"
          >
            View All
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default Home
