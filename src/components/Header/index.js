import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-small-container">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo-style"
          />
        </Link>
        <ul className="nav-list-container">
          <Link to="/" className="link-style">
            <li className="list-style">
              <IoMdHome className="icon-style" />
            </li>
          </Link>

          <Link to="/jobs" className="link-style">
            <li className="list-style">
              <BsBriefcaseFill className="icon-style" />
            </li>
          </Link>

          <li className="list-style">
            <IoIosLogOut className="icon-style" onClick={onLogoutButton} />
          </li>
        </ul>
      </div>
      <div className="nav-large-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo-style"
          />
        </Link>

        <ul className="nav-list-container">
          <Link to="/" className="link-style">
            <li className="list-style">Home</li>
          </Link>
          <Link to="/jobs" className="link-style">
            <li className="list-style">Jobs</li>
          </Link>
        </ul>
        <div className="logout-button-container">
          <button
            type="button"
            className="logout-button-style"
            onClick={onLogoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
