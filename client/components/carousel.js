import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import M from 'materialize-css'

class Carousel extends Component {
  componentDidMount() {
    const slider = document.querySelector('.carousel-slider')
    M.Carousel.init(slider, {
      indicators: true,
      duration: 200,
      fullWidth: true
    })
    // setInterval(function() {
    //   $('.carousel-slider').carousel('next')
    // }, 2000)
  }

  render() {
    return (
      <div className="container">
        <h2>Featured Products</h2>
        <ul className="carousel carousel-slider">
          <li className="carousel-item">
            <Link to="/items/1">
              <img
                src="https://i.ytimg.com/vi/PK2CNau5lus/maxresdefault.jpg"
                className="responsive-img"
              />
            </Link>
          </li>
          <li className="carousel-item">
            <Link to="/items/3">
              <img
                src="https://embedwistia-a.akamaihd.net/deliveries/609a53c94661742ca9df581a2ee932068c530b51.jpg?image_crop_resized=1280x720"
                className="responsive-img"
              />
            </Link>
          </li>
          <li className="carousel-item">
            <Link to="/items/2">
              <img
                src="https://cdn-images-1.medium.com/max/1600/1*tD86WpoW19LFwQ9Lw71lsQ.png"
                className="responsive-img"
              />
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Carousel
