import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">
              You can use rows and columns here to organize your footer content.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <a className="social-icon" />
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2019 Alex and the Mokkasins
          <a className="grey-text text-lighten-4 right" href="#!">
            Grace Shopper Project
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
