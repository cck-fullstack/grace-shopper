import React from 'react'
import {Modal, Button} from 'react-materialize'
import {Link} from 'react-router-dom'

{
  /* <Footer
      id="footer"
      className="page-footer grey darken-3"
      copyrights="
    © 2019 Particle Industries
    "
      links={<a />}
      moreLinks={
        <ul className="grey-text text-lighten-4">
          <li>
            <a href="http://facebook.com/pewdiepie">
              <button className="ui facebook button">Facebook</button>
            </a>
          </li>
          <br />
          <li>
            <a href="http://instagram.com/pewdiepie">
              <button className="ui instagram button">Instagram</button>
            </a>
          </li>
          <br />
          <li>
            <a href="http://twitter.com/pewdiepie">
              <button className="ui twitter button">Twitter</button>
            </a>
          </li>
        </ul>
      }
    >
      <div id="logo" style={{display: 'flex'}}>
        <img
          src="https://cdn.discordapp.com/attachments/581912987577876502/590217108122763267/6455ecdcad33ab630747b56c640a6a696e380c8d.png"
          width="100px"
          height="100px"
        />
        <div id="logotext">
          <h5 className="white-text">Particle Industries</h5>
          <p className="grey-text text-lighten-4">
            Aggregating leading edge web readiness in the 21st century
          </p>
        </div>
      </div> */
}

const Footer = () => {
  return (
    <footer id="footer" className="page-footer grey darken-3">
      <div className="ui container">
        <div className="ui grid">
          <div className="column seven wide">
            {/* <h5 className="white-text">Created By:</h5>
              <ul className="grey-text text-lighten-4">
                <li>Alex Mok</li>
                <li>Will Golden</li>
                <li>Stan So</li>
                <li>Eric Kreiter</li>
              </ul>
              <a href="mailto:kat@reelstyle.co">
                <button className="ui primary button teal">Email us</button>
              </a> */}
          </div>
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

      <div className="footer-copyright" style={{'justify-content': 'center'}}>
        <div
          className="container"
          style={{
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'flex-end',
            margin: '25px 0px 0px'
          }}
        >
          © 2019 Particle Industries
          <ul className="grey-text text-lighten-4" style={{display: 'flex'}}>
            <li>
              <a>
                <div>
                  <button href="#modal1" className="modal-trigger">
                    About Us{' '}
                  </button>
                  <Modal id="modal1" header="Team">
                    <uli>
                      <li>Alex Mok</li>
                      <li>Eric Kreiter</li>
                      <li>Stan So</li>
                      <li>Will Golden</li>
                    </uli>
                  </Modal>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:kat@reelstyle.co">
                <button>Email Us</button>{' '}
              </a>
            </li>
            <li>
              <a href="http://facebook.com/pewdiepie">
                <button className="ui facebook button">Facebook</button>
              </a>
            </li>
            <br />
            <li>
              <a href="http://instagram.com/pewdiepie">
                <button className="ui instagram button">Instagram</button>
              </a>
            </li>
            <br />
            <li>
              <a href="http://twitter.com/pewdiepie">
                <button className="ui twitter button">Twitter</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
