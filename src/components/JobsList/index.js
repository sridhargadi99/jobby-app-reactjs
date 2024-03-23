import {IoMdStar} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobsList = props => {
  const {eachList} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
  } = eachList
  return (
    <li className="job-list-style">
      <Link to={`/jobs/${id}`} className="link-styling">
        <div className="job-list-container1">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="title-logo-style"
          />
          <div>
            <h1 className="title-style">{title}</h1>
            <div className="job-list-container2">
              <IoMdStar className="star-style" />
              <p className="rating-style">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-list-container3">
          <ul className="job-list-container4">
            <li className="list-style">
              <IoLocationOutline className="icon-image-style" />
              <p className="icon-content-style">{location}</p>
            </li>
            <li className="list-style">
              <BsBriefcaseFill className="icon-image-style" />
              <p className="icon-content-style">{employmentType}</p>
            </li>
          </ul>
          <p className="package-style">{packagePerAnnum}</p>
        </div>
        <hr className="job-hr-style" />
        <div className="job-list-container5">
          <h1 className="description-heading-style">Description</h1>
          <p className="description-content-style">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobsList
