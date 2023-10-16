import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOptions: [], 
      selectedOption: '', 
    }; 
    console.log(this.state.dropdownOptions);
  }

  componentDidMount() {
    
    fetch('http://127.0.0.1:8000/api/jobs/')
      .then((response) => response.json())
      .then((jobs) => {
        console.log(jobs);
        
        this.setState({ dropdownData: jobs });
      })
      .catch((error) => {
        console.error('Error fetching dropdown options:', error);
      });
  }

  handleDropdownChange = (event) => {
    
    this.setState({ selectedOption: event.target.value });
  };

  render() {
    const { dropdownOptions, selectedOption } = this.state;
    console.log(dropdownOptions, "DROP");

    return (
      <div>
        
        <select
          id="job"
          value={selectedOption}
          onChange={this.handleDropdownChange}
        >
          <option value="">Select Job</option>
          {dropdownOptions.map((job, index) => (
            <option key={index} value={job.id}>
              {job.label}
            </option>
          ))}
        </select>
       
      </div>
    );
  }
}

export default Dropdown;




