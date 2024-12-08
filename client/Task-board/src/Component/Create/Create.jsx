import React from 'react'
import { useState } from 'react'

function Create() {
    const [title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[error,setError]=useState('')
  return (
    <div>Create</div>
  )
}

export default Create