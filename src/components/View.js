/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
 
const View = () => {
    const {id}=useParams();
    // console.log(id);
    const[students,setUser]=useState([]);
    const navigate = useNavigate();

    // console.log("user", students);
 
    useEffect(()=>{
        fetchUser();
    },[id]);
 
    const fetchUser=async()=>{
        try{
        const result=await axios.get("http://127.0.0.1:8000/api/students/"+id);

        console.log(result.data.student);
        setUser(result.data.student)
 
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const clickToBackHandler=()=>{
        navigate('/list/:id');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
 
                    <h1>User Details</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Job</th>
                                <th>Email</th>
                                <th>Phone</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{students.id}</td>
                                <td>{students.name}</td>
                                <td>{students.job}</td>
                                <td>{students.email}</td>
                                <td>{students.phone}</td>
                            </tr>
 
                        </tbody>
                    </table>
                </div>
 
            </div>
            <div>
            <div xs={12} mb={4} className="float-start"><button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button></div>
        </div>
        </div>
        
    </div>;
};
 
export default View;