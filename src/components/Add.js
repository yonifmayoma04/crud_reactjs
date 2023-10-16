import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import List from "./List";

const Add = () => {
  const [userField, setUserField] = useState({
    name: "",
    job: "",
    email: "",
    phone: "",
    status: "",
  });

  

  const [jobs, setJobs] = useState([]); // State to hold the dropdown options
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    async function fetchDropdownData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/jobs/dropdown"
        );
        setJobs(response.data.dropdownData);
      } catch (err) {
        console.log("Error fetching dropdown data:", err);
      }
    }

    fetchDropdownData();
  }, []);

  useEffect(() => {
    // Mengambil data dari API Laravel
    axios
      .get("http://127.0.0.1:8000/api/students")
      .then((response) => {
        setOptions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }, []);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/students/save",
        userField
      );
      setLoading(true);
      window.location.href = "http://localhost:3000/list/:id";
      Swal.fire({
        title: "Success",
        text: "Data Berhasil Ditambahkan",
        icon: "success",
        confirmButtonText: "Ok",
        timer: 3000,
      });
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (loading) {
    return <List />;
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Full Name"
                name="name"
                onChange={(e) => changeUserFieldHandler(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Control
                as="select"
                name="job"
                onChange={(e) => changeUserFieldHandler(e)}
                value={userField.job} // Set the selected value from state
                autoFocus
              >
                <option value="">Select a job</option>
                {Object.keys(jobs).map((jobId) => (
                  <option key={jobId} value={jobId}>
                    {jobs[jobId]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                onChange={(e) => changeUserFieldHandler(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="08xxxxxxxxxx"
                name="phone"
                onChange={(e) => changeUserFieldHandler(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="Checkbox">
              <Form.Label>Pilih Status:</Form.Label>
              {options.map((option) => (
                <div className="form-check" key={option.id}>
                  {/* <label>Aktive</label> */}
                  <input
                    type="radio"
                    name="status"
                    value={option.status}
                    onChange={handleRadioChange}
                    Checked={selectedOption === option.status}
                    className="custom-radio"
                  />
                  {/* <label>Inactive</label> */}
                  {/* <input
                    type="radio"
                    name="status"
                    value={option.status}
                    onChange={handleRadioChange}
                    Checked={selectedOption === option.status}
                    className="custom-radio"
                  /> */}
                  
                  <label className="form-check-label">{option.status}</label>
                </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => onSubmitChange(e)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
