import React, { useEffect, useState } from 'react'
import axios from 'axios'


const FetchResgistrations = () => {
  const [res,setresult]=useState([])
  const [formdata,setformdata]=useState({
    name:'',role:'',email:'',password:''
  })
  const FetchData= async()=>{
  axios.get('http://localhost:8080/retrieve',{
      
  }).then((response)=>{
    setresult(response.data)
    console.log(response.data)
  })}
  useEffect(()=>{
     FetchData()
  },[])
  const updateData=async(id)=>{
     const res=await axios.put(`http://localhost:8080/users/${id}`,formdata)
     FetchData()
     console.log(res.data)
  }
  const handleDelete=async(id)=>{
    await axios.delete(`http://localhost:8080/users/${id}`)
    .then((response)=>{
      console.log(response.data)
    })
    FetchData()
  }

  const changeHandler=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value});
    
  }

  return (
    <div>
       <center> <h1>Registrations</h1></center>
        <table border='2' align='center'>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Password</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            {res.map((user,index)=>(
                
                    <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <input type='text' name='name'
                      placeholder='new name' onChange={changeHandler}/>
                       <input type='text' name='role'
                      placeholder='new role' onChange={changeHandler}/>
                       <input type='text' name='email'
                      placeholder='new email' onChange={changeHandler}/>
                       <input type='password' name='password'
                      placeholder='new password' onChange={changeHandler}/>
                      <button onClick={()=>updateData(user._id)}>update</button>               
                      </td>
                      <td>
                      <button onClick={()=>handleDelete(user._id)}>Delete</button>
                      </td>
                </tr>
                )
            )
           
}
        </table>
    </div>
  )
}


export default FetchResgistrations