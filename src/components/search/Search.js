import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchChange } from './searchSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchChange(searchTerm))
  }
  return(
    <form onSubmit={handleSubmit}>
      <input 
        type='text' 
        name='search' 
        value={searchTerm} 
        placeholder='Search...'
        onChange={(e) => setSearchTerm(e.target.value)}/>
    </form>
  )
}
