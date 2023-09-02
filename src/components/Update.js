import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';
import List from './List';

const Update = () => {
    const {id}=useParams()
    const navigate = useNavigate();

    const [userField, setUserField] = useState({
    name: "",
    jurusan: "",
    email: "",
    phone: "",

    });
    
    useEffect(()=>{
        fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
 
    const fetchUser=async()=>{
        try{
            const result=await axios.get("http://127.0.0.1:8000/api/students/edit/"+id);
            console.log(result.data.student);
            setUserField(result.data.student)
        }catch(err){
            console.log("Something Wrong");
        }
    }

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }
     
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://127.0.0.1:8000/api/students/update/"+id, userField);
            navigate('/list/:id');  
        } catch (err) {
            console.log("Something Wrong");
        }
    }

    const [loading]=useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(loading){
        return <List/>
    }

    return (
          
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                // id='id'
                placeholder=""
                name='id'
                value={id}
                disabled
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                // id='name'
                placeholder="Enter Your Full Name"
                name='name'
                value={userField.name}
                onChange={e => changeUserFieldHandler(e)}
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="jurusan"
                // id='jurusan'
                placeholder="Enter Jurusan"
                name='jurusan'
                value={userField.jurusan}
                onChange={e => changeUserFieldHandler(e)} required
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // id='email'
                placeholder="Enter Email"
                name='email'
                value={userField.email}
                onChange={e => changeUserFieldHandler(e)} required
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                // id='phone'
                placeholder="Enter Number Phone"
                name='phone'
                value={userField.phone}
                onChange={e => changeUserFieldHandler(e)} required
                
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={e => onSubmitChange(e)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Update;