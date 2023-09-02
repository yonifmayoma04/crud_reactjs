import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import List from './List';

const Add = () => {
  const [userField, setUserField] = useState({
    name: "",
    jurusan: "",
    email: "",
    phone: "",

});

// const navigate = useNavigate();

    // const clickToBackHandler=()=>{
    //     navigate('/');
    // }
 
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
 
    }
    const [loading,setLoading]=useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:8000/api/students/save", userField);
            console.log(responce)
            setLoading(true);
            window.location.href = "http://localhost:3000/list/:id";
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <List/>
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
                // id='name'
                placeholder="Enter Your Full Name"
                name='name'
                onChange={e => changeUserFieldHandler(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                // id='jurusan'
                placeholder="Enter Your Job"
                name='jurusan'
                onChange={e => changeUserFieldHandler(e)} required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // id='email'
                placeholder="name@example.com"
                name='email'
                onChange={e => changeUserFieldHandler(e)} required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                // id='phone'
                placeholder="08xxxxxxxxxx"
                name='phone'
                onChange={e => changeUserFieldHandler(e)} required
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={e => onSubmitChange(e)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;