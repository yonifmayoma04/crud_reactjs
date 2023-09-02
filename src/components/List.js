import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Add from "./Add";
// import Update from "./Update";
import "./React.css";

const List = () => {
  const [studentsData, setUSerData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

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
            <th>Jurusan</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((students, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td className="align-left">{students.name} </td>
                <td className="align-left">{students.jurusan} </td>
                <td className="align-left">{students.email} </td>
                <td className="align-left">{students.phone} </td>
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
    </div>
  );
};

export default List;
