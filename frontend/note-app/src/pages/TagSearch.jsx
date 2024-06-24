import React from 'react'
import Header from '../components/Header'
import FilteredNotesContainer from '../components/FilteredNotesContainer'

const TagSearch = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-20">
    <Header />
    <FilteredNotesContainer/>
  </div>
  )
}

export default TagSearch