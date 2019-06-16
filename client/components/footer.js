import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Created By:</h5>
            <ul className="grey-text text-lighten-4">
              <li>Alex Mok</li>
              <li>Will Golden</li>
              <li>Stan So</li>
              <li>Eric Kreiter</li>
            </ul>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul className="grey-text text-lighten-4">
              <a className="waves-effect waves-light social-icon btn linkedin">
                <i className="fa fa-linkedin" />
              </a>
              <li>Will Golden</li>
              <li>Stan So</li>
              <li>Eric Kreiter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2019 Particle Industries
          <a className="grey-text text-lighten-4 right" href="#!">
            Aggregating leading edge web readiness in the 21st century.
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
