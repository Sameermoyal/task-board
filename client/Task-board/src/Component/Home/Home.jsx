import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"
import { Link } from 'react-router-dom'

function Home() {
const [data,setData]=useState([])

const api='http://localhost:3000'

useEffect(()=>{
    const fetchData = async () => {
        try {
          const token =localStorage.getItem('token')
          
          const res = await axios.get(`${api}/getAll`,{
            headers :{
              authorization : `Bearer ${token}`
          }});
          console.log("data>>>>", res.data.userPopulate);
          setData(res.data.userPopulate);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      fetchData()
},[])


  return (
    <div className='home-page'>
     {data.map(i=>{
        return(
            <div key={i._id} className='list'>
                <h1 className='list-title'>{i.title}</h1>
                <p className='list-description'>{i.descriptionList.map(j=>{
                    return <h5 className='list-detail'>{j}</h5>
                })}</p>
            </div>
        )
     })}
    <div className='list' style={{border:"2px solid transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Link to='/create'><button>+</button></Link>
    </div>
    </div>
  )
}

export default Home