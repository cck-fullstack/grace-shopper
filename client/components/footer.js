import React from 'react'
import {Modal, Button} from 'react-materialize'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer" className="page-footer grey darken-3">
      <div className="ui container">
        <div className="ui grid">
          <div className="column seven wide" />
          <div id="logo" style={{display: 'flex'}}>
            <img
              src="https://cdn.discordapp.com/attachments/581912987577876502/590217108122763267/6455ecdcad33ab630747b56c640a6a696e380c8d.png"
              width="100px"
              height="100px"
            />
            <div id="logotext">
              <h5 className="white-text">Particle Industries</h5>
              <div>
                <p className="grey-text text-lighten-4">
                  Aggregating leading edge web readiness in the 21st century
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright" style={{justifyContent: 'center'}}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            margin: '25px 0px 0px'
          }}
        >
          © 2019 Particle Industries
          <ul className="grey-text text-lighten-4" style={{display: 'flex'}}>
            <li>
              <a>
                <div>
                  {/* <button href="#modal1" className="modal-trigger">
                    About Us{' '}
                  </button> */}
                  <img
                    href="#modal1"
                    className="modal-trigger"
                    height="50px"
                    width="50px"
                    src="http://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Info-icon.png"
                  />
                  <Modal id="modal1" header="Team">
                    <ul>
                      <li>Alex Mok</li>
                      <li>Eric Kreiter</li>
                      <li>Stan So</li>
                      <li>Will Golden</li>
                    </ul>
                  </Modal>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:kat@reelstyle.co">
                <img
                  height="50px"
                  width="50px"
                  src="https://cdn3.iconfinder.com/data/icons/user-interface-web-1/550/web-circle-circular-round_67-512.png"
                />
                {/* <button>Email Us</button>{' '} */}
              </a>
            </li>
            <li>
              <a href="http://facebook.com/pewdiepie">
                <img
                  height="50px"
                  width="50px"
                  src="http://icons.iconarchive.com/icons/yootheme/social-bookmark/512/social-facebook-button-blue-icon.png"
                />
                {/* <button className="ui facebook button">Facebook</button> */}
              </a>
            </li>
            <br />
            <li>
              <a href="http://instagram.com/pewdiepie">
                <img
                  height="50px"
                  width="50px"
                  src="https://sguru.org/wp-content/uploads/2018/01/best-instagram-logo-download-here-15.png"
                />
                {/* <button className="ui instagram button">Instagram</button> */}
              </a>
            </li>
            <br />
            <li>
              <a href="http://twitter.com/pewdiepie">
                <img
                  height="50px"
                  width="50px"
                  src="http://pngimg.com/uploads/twitter/twitter_PNG39.png"
                />
                {/* <button className="ui twitter button">Twitter</button> */}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
