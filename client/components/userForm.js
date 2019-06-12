import React from 'react'

const UserForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name Here"
        value={props.state.firstName}
        onChange={event => props.handleChange(event)}
      />
      <br />
      <input
        name="lastName"
        placeholder="Last Name Here"
        value={props.state.lastName}
        onChange={event => props.handleChange(event)}
      />
      <br />
      <input
        name="email"
        placeholder="Email Here"
        value={props.state.email}
        onChange={event => props.handleChange(event)}
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password Here"
        value={props.state.password}
        onChange={event => props.handleChange(event)}
      />
      <br />
      <input
        name="address"
        placeholder="Address Here"
        value={props.state.address}
        onChange={event => props.handleChange(event)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default UserForm
