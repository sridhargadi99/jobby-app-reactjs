import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-sub-container">
      <img
        className="not-found-image-style"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-name-style">Page Not Found</h1>
      <p className="not-found-description-style">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
