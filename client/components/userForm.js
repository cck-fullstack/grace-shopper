import React from 'react'

const UserForm = props => {
  return (
    <div className="row">
      <div className="col s12">
        <form onSubmit={props.handleSubmit} className="container">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name Here"
            value={props.state.firstName}
            onChange={event => props.handleChange(event)}
          />
          <br />
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last Name Here"
            value={props.state.lastName}
            onChange={event => props.handleChange(event)}
          />
          <br />
          <input
            required
            type="email"
            name="email"
            placeholder="Email Here"
            value={props.state.email}
            onChange={event => props.handleChange(event)}
          />
          <br />
          <input
            required
            type="password"
            name="password"
            placeholder="Password Here"
            value={props.state.password}
            onChange={event => props.handleChange(event)}
          />
          <br />
          <input
            required
            type="text"
            name="address"
            placeholder="Address Here"
            value={props.state.address}
            onChange={event => props.handleChange(event)}
          />
          <br />
          <button type="submit" className="waves-effect waves-light btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserForm
