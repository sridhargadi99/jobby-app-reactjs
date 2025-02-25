import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-sub-container">
        <h1 className="home-name-style">Find The Job That Fits Your Life</h1>
        <p className="home-description-style">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-button-style">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
