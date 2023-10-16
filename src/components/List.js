import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Add from "./Add";

import Swal from 'sweetalert2';
import "./React.css";
import 'bootstrap/dist/js/bootstrap'

const List = () => {
  const [studentsData, setUSerData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  // constructor(props); {
  //   super(props);
  //   this.state = {
  //     dropdownOptions: [], // Store the fetched dropdown options
  //     selectedOption: '', // Store the selected option
  //   };
  // }

  // componentDidMount(); {
  //   // Make an API request to fetch dropdown options when the component mounts
  //   fetch('/api/dropdown-options')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Assuming the API response is an array of options
  //       this.setState({ dropdownOptions: data });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching dropdown options:', error);
  //     });
  // }

  // handleDropdownChange = (event) => {
  //   // Update the selected option in the state when the dropdown value changes
  //   this.setState({ selectedOption: event.target.value });
  // };

  // render(); {
  //   const { dropdownOptions, selectedOption } = this.state;
  

  

  console.log("user", studentsData);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/api/students");
      console.log("result", result);
      //console.log(result.data.results);
      setUSerData(result.data.students);
    } catch (err) {
      console.log("somthing Wrong");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete("http://127.0.0.1:8000/api/students/delete/" + id);
        console.log("handleDelete", handleDelete);
        const newstudentsData = studentsData.filter((item) => {
          return item.id !== id;
        });
        setUSerData(newstudentsData);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const navigate = useNavigate();

  const clickToBackHandler = () => {
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Yakin ingin logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
    navigate("/");
  }
});
  };



  return (
    <div className="container">
      <h3 class="mb-3">User Details</h3>
      <div xs={12} mb={4} className="float-start">
        <div>
          <Add />
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Job</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((students, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td className="align-left">{students.name} </td>

                {/* <div>
        <h1>Dropdown Example</h1>
        <label htmlFor="dropdown">Select an option:</label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={this.handleDropdownChange}
        >
          <option value="">Select an option</option>
          {dropdownOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p>Selected Option: {selectedOption}</p>
      </div> */}

                <td className="align-left">{students.job} </td>
                
                <td className="align-left">{students.email} </td>
                <td className="align-left">{students.phone} </td>
                <td>{students.status} </td>
                <td>
                  <NavLink
                    to={`/view/${students.id}`}
                    className="btn btn-success mx-2"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to={`/update/${students.id}`}
                    className="btn btn-info mx-2"
                  >
                    Edit
                  </NavLink>
                  {/* <div >
                                        <div>
                                             <Update  />
                                        </div>
                                    </div> */}

                  <button
                    onClick={() => handleDelete(students.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div xs={12} mb={4} className="float-end">
        <button className="btn btn-primary" onClick={clickToBackHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default List;
