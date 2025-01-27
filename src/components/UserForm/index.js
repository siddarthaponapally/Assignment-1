// UserForm Component for adding and editing users
import {Component} from 'react'

import './index.css'

class UserForm extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.onFormChange(name, value)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSaveUser()
  }

  render() {
    const {formData} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          placeholder="Department"
          onChange={this.handleChange}
        />
        <button type="submit">Save User</button>
      </form>
    )
  }
}

export default UserForm
