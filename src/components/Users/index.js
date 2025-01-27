import ErrorBoundary from '../ErrorBoundary'
import UserForm from '../UserForm'
import UserList from '../UserList'
import {Component} from 'react'
import './index.css'

// Main App Component
class Users extends Component {
  state = {
    users: [],
    formData: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    },
    showForm: false,
    error: null,
  }

  // Fetch users from the API on component mount
  componentDidMount() {
    try {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({users}))
        .catch(error => this.setState({error: 'Failed to fetch users.'}))
    } catch (error) {
      this.setState({error: 'An unexpected error occurred.'})
    }
  }

  // Handle changes in form input fields
  handleFormChange = (name, value) => {
    this.setState({formData: {...this.state.formData, [name]: value}})
  }

  // Handle adding a new user
  handleAddUser = () => {
    const {formData, users} = this.state
    const newUser = {
      ...formData,
      id: users.length + 1, // Simulate an ID for the new user
    }

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(user => {
        this.setState({
          users: [...users, user],
          formData: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
          },
          showForm: false,
        })
      })
      .catch(error => this.setState({error: 'Failed to add user'}))
  }

  // Handle editing an existing user
  handleEditUser = user => {
    this.setState({formData: {...user}, showForm: true})
  }

  // Handle updating a user
  handleUpdateUser = () => {
    const {formData, users} = this.state

    fetch(`https://jsonplaceholder.typicode.com/users/${formData.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(updatedUser => {
        const updatedUsers = users.map(user =>
          user.id === updatedUser.id ? updatedUser : user,
        )
        this.setState({
          users: updatedUsers,
          formData: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
          },
          showForm: false,
        })
      })
      .catch(error => this.setState({error: 'Failed to update user'}))
  }

  // Handle deleting a user
  handleDeleteUser = id => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedUsers = this.state.users.filter(user => user.id !== id)
        this.setState({users: updatedUsers})
      })
      .catch(error => this.setState({error: 'Failed to delete user'}))
  }

  render() {
    return (
      <ErrorBoundary>
        <div>
          <h1>User Management</h1>
          <button onClick={() => this.setState({showForm: true})}>
            Add User
          </button>

          {this.state.showForm && (
            <UserForm
              formData={this.state.formData}
              onSaveUser={this.handleAddUser}
              onFormChange={this.handleFormChange}
            />
          )}

          {this.state.error && <p>{this.state.error}</p>}

          <UserList
            users={this.state.users}
            onEditUser={this.handleEditUser}
            onDeleteUser={this.handleDeleteUser}
          />
        </div>
      </ErrorBoundary>
    )
  }
}

export default Users
