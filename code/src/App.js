import React, { useEffect, useState } from 'react'

import ThoughtForm  from './components/ThoughtForm'
import ThoughtItem from './components/ThoughtItem'
import LoadingItem from './components/Loading'

import { API_URL, LIKES_URL } from './utils/urls'

export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [newThought,setNewThought] = useState('')
  const [loading, setLoading] = useState(false)

  // getting all the toughts by a GET request
  useEffect(() => {
    fetchThoughts()
  }, [])

  const fetchThoughts = () => {
    setLoading(true)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .finally(() => setLoading(false))
  }

  //making a POST request to the sam URL
  const handleFormSubmit = (event) => {
    event.preventDefault ()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messsage: newThought }),
    }

    fetch(API_URL, options)
      .then((res) => res.json())
      .then((data) => {
        fetchThoughts()
        setNewThought("")
      })
  }

  // function to increase the number of likes
  const handleLikesIncrease = (thoughtId) => {
    
    const options = {
      method: 'POST',
    }

    fetch(LIKES_URL(thoughtId), options)
    .then(res => res.json())
    .then((data) => {
      fetchThoughts()
    })
  }

  // displaying all new thoughts as well as the form to type new thoughts
  return (
    <div className="body">
      {loading && <LoadingItem />}
      <h1>Happy thougts everywhere</h1>
      <ThoughtForm  
      onFormSubmit={handleFormSubmit} 
      newThought={newThought} 
      setNewThought={setNewThought}
      />
      
      {thoughts.map((thought) => (
        <ThoughtItem 
        key={thought._id} 
        thought={thought} 
        onLikesIncrease={handleLikesIncrease}/
        >
      ))}
    </div>
  )
}

