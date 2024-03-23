import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    isActive: false,
    username: '',
    password: '',
    errorMessage: '',
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMessage => {
    this.setState({errorMessage, isActive: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {isActive, username, password, errorMessage} = this.state
    return (
      <div className="login-background-container">
        <div className="login-card-container">
          <img
            className="login-logo-style"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <label className="label-style" htmlFor="textId">
              USERNAME
            </label>
            <input
              className="input-style"
              id="textId"
              placeholder="Username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="label-style" htmlFor="passwordId">
              PASSWORD
            </label>
            <input
              className="input-style"
              id="passwordId"
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="submit-button-style">
              Login
            </button>
            {isActive && <p className="error-message-style">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
