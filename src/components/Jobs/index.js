/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobsList from '../JobsList'
import EmployeementItem from '../EmployeementItem'
import SalaryRangeItem from '../SalaryRangeItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jwtToken = Cookies.get('jwt_token')

const apiUrlStatuses = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileUrlStatus: apiUrlStatuses.initial,
    profileUrlDetails: {},
    searchParameterStatus: apiUrlStatuses.initial,
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    searchParameterDetailsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getSearchDetails()
  }

  clickProfileRetryButton = () => this.getProfileDetails()

  clickSearchRetryButton = () => this.getSearchDetails()

  addSearchInput = () => this.getSearchDetails()

  onChangeInput = event => this.setState({searchInput: event.target.value})

  addSalaryRange = id =>
    this.setState({minimumPackage: id}, this.getSearchDetails)

  addEmployeement = id => {
    const {employmentType} = this.state
    const condition = employmentType.includes(id)
    let newEmployeeMentDetails
    if (condition === false) {
      newEmployeeMentDetails = [...employmentType, id]
    } else {
      newEmployeeMentDetails = employmentType.filter(
        eachType => eachType !== id,
      )
    }
    this.setState(
      {employmentType: newEmployeeMentDetails},
      this.getSearchDetails,
    )
  }

  convertSnakeCaseToCamelCase = object => ({
    id: object.id,
    title: object.title,
    rating: object.rating,
    companyLogoUrl: object.company_logo_url,
    employmentType: object.employment_type,
    jobDescription: object.job_description,
    packagePerAnnum: object.package_per_annum,
    location: object.location,
  })

  getSearchDetails = async () => {
    this.setState({searchParameterStatus: apiUrlStatuses.inProgress})
    const {searchInput, employmentType, minimumPackage} = this.state
    const newEmployeementDetails = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${newEmployeementDetails}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachObject =>
        this.convertSnakeCaseToCamelCase(eachObject),
      )
      this.setState({
        searchParameterDetailsList: updatedData,
        searchParameterStatus: apiUrlStatuses.success,
      })
    } else {
      this.setState({
        searchParameterStatus: apiUrlStatuses.failure,
      })
    }
  }

  getProfileDetails = async () => {
    this.setState({profileUrlStatus: apiUrlStatuses.inProgress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileUrlDetails: updatedData,
        profileUrlStatus: apiUrlStatuses.success,
      })
    } else {
      this.setState({
        profileUrlStatus: apiUrlStatuses.failure,
      })
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileUrlDetails} = this.state
    const {name, imageUrl, shortBio} = profileUrlDetails
    return (
      <div className="profile-container">
        <img src={imageUrl} className="profile-logo-style" alt="profile" />
        <h1 className="profile-name-style">{name}</h1>
        <p className="profile-description-style">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="retry-container">
      <button
        className="retry-button-style"
        type="button"
        onClick={this.clickProfileRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderProfileUrl = () => {
    const {profileUrlStatus} = this.state
    switch (profileUrlStatus) {
      case apiUrlStatuses.inProgress:
        return this.renderLoading()
      case apiUrlStatuses.success:
        return this.renderProfileSuccessView()
      case apiUrlStatuses.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderSearchSuccessView = () => {
    const {searchParameterDetailsList} = this.state
    return (
      <>
        {searchParameterDetailsList.length > 0 ? (
          <ul className="search-list-container">
            {searchParameterDetailsList.map(eachList => (
              <JobsList eachList={eachList} key={eachList.id} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-found-container1">
            <div className="no-jobs-found-container2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                alt="no jobs"
                className="no-jobs-found-image-style"
              />
              <h1 className="no-jobs-found-heading-style">No Jobs Found</h1>
              <p className="no-jobs-found-description-style">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          </div>
        )}
      </>
    )
  }

  renderSearchFailureView = () => (
    <div className="failure-view-container1">
      <div className="failure-view-container2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-image-style"
        />
        <h1 className="failure-view-heading-style">
          Oops! Something Went Wrong
        </h1>
        <p className="failure-view-description-style">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="retry-button-style"
          type="button"
          onClick={this.clickSearchRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderSearchDetails = () => {
    const {searchParameterStatus} = this.state
    switch (searchParameterStatus) {
      case apiUrlStatuses.inProgress:
        return this.renderLoading()
      case apiUrlStatuses.success:
        return this.renderSearchSuccessView()
      case apiUrlStatuses.failure:
        return this.renderSearchFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-search-container1">
            <input
              className="jobs-input-style"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeInput}
            />
            <button
              type="button"
              className="jobs-search-icon-button-style"
              onClick={this.addSearchInput}
              data-testid="searchButton"
            >
              <BsSearch size="25" color="#ffffff" />
            </button>
          </div>

          <div className="container1">
            {this.renderProfileUrl()}

            <hr className="hr-style" />

            <div>
              <h1 className="name-style">Type of Employment</h1>
              <ul className="list-container">
                {employmentTypesList.map(eachEmployeeList => (
                  <EmployeementItem
                    eachEmployeeList={eachEmployeeList}
                    key={eachEmployeeList.employmentTypeId}
                    addEmployeement={this.addEmployeement}
                  />
                ))}
              </ul>
            </div>

            <hr className="hr-style" />

            <div>
              <h1 className="name-style">Salary Range</h1>
              <ul className="list-container">
                {salaryRangesList.map(eachSalaryList => (
                  <SalaryRangeItem
                    eachSalaryList={eachSalaryList}
                    key={eachSalaryList.salaryRangeId}
                    addSalaryRange={this.addSalaryRange}
                  />
                ))}
              </ul>
            </div>
            <hr className="hr-style hr-style1" />
          </div>

          <div className="container2">
            <div className="jobs-search-container2">
              <input
                className="jobs-input-style"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                className="jobs-search-icon-button-style"
                onClick={this.addSearchInput}
                data-testid="searchButton"
              >
                <BsSearch size="25" color="#ffffff" />
              </button>
            </div>
            {this.renderSearchDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
