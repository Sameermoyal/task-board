import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"
import { Link } from 'react-router-dom'
import Dnd from "../DropAndDrag/Dnd"

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
          console.log("data>>>>", res.data.listPopulate);
          setData(res.data.listPopulate);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      fetchData()
},[])

function handleDragStart(event,idObj){
  const{descItem,listId,taskId}=idObj;
  // console.log("  listId: ", listId, "descItem: ", descItem, " taskId: ",taskId);
 event.dataTransfer.setData("text",JSON.stringify({descItem,listId,taskId}))
 }

 function handleOnDragOver(e){
  e.preventDefault();
 }

 function handleOnDrop(e,dropListId,dropTaskId){
  e.preventDefault()
  const dropIds={dropListId,dropTaskId}
  const getData=e.dataTransfer.getData('text')
  const dragIds=JSON.parse(getData)
  console.log("dragIds :",dragIds,"dropIds :",dropIds)
  
  async function dropUpdate() {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${api}/dndAdd`, { dropIds,dragIds}, {
        headers: { authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      console.log("Error adding task:", error);
      setError("Adding updation failed.");
    }  
  }

  dropUpdate()
 

 }


  return (
    <div className='home-page'>
     {data.map(listItem=>{
        return(
            <div key={listItem._id} className='list'
            onDragOver={handleOnDragOver}
            onDrop={event=>handleOnDrop(event,listItem._id, listItem.taskId._id )}
            >
                <h1 className='list-title'>{listItem.taskId?.title || "Un Titeled Task"}</h1>
                <div className='list-description'>
                {listItem.descriptionList && listItem.descriptionList.length > 0 ? (
                listItem.descriptionList.map((description, descItem) => (
                  <h5 key={descItem} className="list-detail"
                   draggable
                   onDragStart={event=>handleDragStart(event,{listId:listItem._id,descItem:descItem,taskId:listItem.taskId._id})}
                  >{description}</h5>
                ))
              ) : (
                <h5 className="list-detail">No details available</h5>
              )}

                </div>
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