import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdStar} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {ImNewTab} from 'react-icons/im'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

const jwtToken = Cookies.get('jwt_token')

const apiUrlStatuses = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    idUrlStatus: apiUrlStatuses.initial,
    idUrlDetails: {},
  }

  componentDidMount() {
    this.getIdDetails()
  }

  clickRetryButton = () => this.getIdDetails()

  getIdDetails = async () => {
    this.setState({idUrlStatus: apiUrlStatuses.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details

      const updatedJobSkills = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: jobDetails.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
      }

      const similarJobs = data.similar_jobs
      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
        id: eachJob.id,
      }))
      this.setState({
        idUrlDetails: {updatedJobSkills, updatedSimilarJobs},
        idUrlStatus: apiUrlStatuses.success,
      })
    } else {
      this.setState({idUrlStatus: apiUrlStatuses.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderIdSuccessView = () => {
    const {idUrlDetails} = this.state
    const {updatedJobSkills, updatedSimilarJobs} = idUrlDetails
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-item-list-style">
            <div className="job-item-list-container1">
              <img
                src={updatedJobSkills.companyLogoUrl}
                alt="job details company logo"
                className="item-title-logo-style"
              />
              <div>
                <h1 className="item-title-style">{updatedJobSkills.title}</h1>
                <div className="job-item-list-container2">
                  <IoMdStar className="item-star-style" />
                  <p className="item-rating-style">{updatedJobSkills.rating}</p>
                </div>
              </div>
            </div>

            <div className="job-item-list-container3">
              <ul className="job-item-list-container4">
                <li className="item-list-style">
                  <IoLocationOutline className="item-icon-image-style" />
                  <p className="item-icon-content-style">
                    {updatedJobSkills.location}
                  </p>
                </li>
                <li className="item-list-style">
                  <BsBriefcaseFill className="item-icon-image-style" />
                  <p className="item-icon-content-style">
                    {updatedJobSkills.employmentType}
                  </p>
                </li>
              </ul>
              <p className="item-package-style">
                {updatedJobSkills.packagePerAnnum}
              </p>
            </div>
            <hr className="item-hr-style" />
            <div className="job-item-list-container5">
              <div className="job-item-list-container6">
                <h1 className="item-heading-style">Description</h1>
                <a
                  href={updatedJobSkills.companyWebsiteUrl}
                  target="_blank"
                  className="navigation-style"
                  rel="noreferrer"
                >
                  <p>Visit</p>
                  <ImNewTab />
                </a>
              </div>
              <p className="item-description-content-style">
                {updatedJobSkills.jobDescription}
              </p>
              <h1 className="item-heading-style">Skills</h1>
              <ul className="job-item-list-container7">
                {updatedJobSkills.skills.map(eachSkill => (
                  <li className="skills-list-style" key={eachSkill.name}>
                    <img
                      className="skills-image-style"
                      src={eachSkill.imageUrl}
                      alt={eachSkill.name}
                    />
                    <p className="skills-content-style">{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
              <h1 className="item-heading-style">Life at Company</h1>
              <div className="job-item-list-container8">
                <p className="item-description-content-style">
                  {updatedJobSkills.lifeAtCompany.description}
                </p>
                <img
                  className="life-image-style"
                  src={updatedJobSkills.lifeAtCompany.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>

          <div>
            <h1 className="similar-jobs-heading-style">Similar Jobs</h1>
            <ul className="similar-jobs-list-container">
              {updatedSimilarJobs.map(eachJob => (
                <li className="similar-jobs-list-style" key={eachJob.id}>
                  <div className="job-item-list-container1">
                    <img
                      src={eachJob.companyLogoUrl}
                      alt="similar job company logo"
                      className="item-title-logo-style"
                    />
                    <div>
                      <h1 className="item-title-style">{eachJob.title}</h1>
                      <div className="job-item-list-container2">
                        <IoMdStar className="item-star-style" />
                        <p className="item-rating-style">{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h1 className="item-heading-style">Description</h1>
                  <p className="item-description-content-style">
                    {eachJob.jobDescription}
                  </p>
                  <ul className="job-item-list-container4">
                    <li className="item-list-style">
                      <IoLocationOutline className="item-icon-image-style" />
                      <p className="item-icon-content-style">
                        {eachJob.location}
                      </p>
                    </li>
                    <li className="item-list-style">
                      <BsBriefcaseFill className="item-icon-image-style" />
                      <p className="item-icon-content-style">
                        {eachJob.employmentType}
                      </p>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderIdFailureView = () => (
    <>
      <Header />
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
            onClick={this.clickRetryButton}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderIdUrl = () => {
    const {idUrlStatus} = this.state
    switch (idUrlStatus) {
      case apiUrlStatuses.inProgress:
        return this.renderLoading()
      case apiUrlStatuses.success:
        return this.renderIdSuccessView()
      case apiUrlStatuses.failure:
        return this.renderIdFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderIdUrl()
  }
}
export default JobItemDetails
