const EmployeementItem = props => {
  const {eachEmployeeList, addEmployeement} = props
  const {employmentTypeId, label} = eachEmployeeList
  const clickCheckBox = () => {
    addEmployeement(employmentTypeId)
  }
  return (
    <li className="list-style">
      <input
        type="checkbox"
        className="checkbox-style"
        id="checkId"
        onChange={clickCheckBox}
        value={employmentTypeId}
      />
      <label htmlFor="checkId" className="label-style">
        {label}
      </label>
    </li>
  )
}

export default EmployeementItem
