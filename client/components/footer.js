import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer grey darken-3">
      <div className="ui container">
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
              <h5 className="white-text">Visit our links:</h5>
              <ul className="grey-text text-lighten-4">
                <li>
                  <a href="http://facebook.com/pewdiepie">
                    <button className="ui facebook button">Facebook</button>
                  </a>
                </li>
                <li>
                  <a href="http://instagram.com/pewdiepie">
                    <button className="ui instagram button">Instagram</button>
                  </a>
                </li>
                <li>
                  <a href="http://twitter.com/pewdiepie">
                    <button className="ui twitter button">Twitter</button>
                  </a>
                </li>
                <li>
                  <a href="mailto:kat@reelstyle.co">
                    <button className="ui primary button teal">Email us</button>
                  </a>
                </li>
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
      </div>
    </footer>
  )
}

export default Footer
