import './index.css'

const SalaryRangeItem = props => {
  const {eachSalaryList, addSalaryRange} = props
  const {salaryRangeId, label} = eachSalaryList
  const clickRadioButton = event => {
    if (event.target.checked) {
      addSalaryRange(salaryRangeId)
    }
  }
  return (
    <li className="list-style">
      <input
        type="Radio"
        className="checkbox-style"
        id="radioId"
        onChange={clickRadioButton}
        value={salaryRangeId}
        name="salary-radio"
      />
      <label htmlFor="radioId" className="label-style">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
