import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownList = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [jobOptions, setJobOptions] = useState([]); 

  useEffect(() => {
    
    axios.get("http://127.0.0.1:8000/api/jobs")
      .then(response => {
        setJobOptions(response.data.jobs); 
      })
      .catch(error => {
        console.error("Error fetching job data:", error);
      });
  }, []); 

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  return (
    <select
      name="job"
      value={selectedJob}
      onChange={handleJobChange}
    >
      <option value="">Pilih Pekerjaan</option>
      {jobOptions.map((job, index) => (
        <option key={index} value={job.id}>
          {job.name}
        </option>
      ))}
    </select>
  );
}

export default DropdownList;
