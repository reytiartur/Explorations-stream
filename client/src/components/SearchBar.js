import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchInput, resetSearchInput } from '../utils/videosReducer'

const SearchBar = ({ handleBlur }) => {
    const stringToSearch = useSelector(state => state.videos.searchVideo)
    const [search, setSearch] = useState(stringToSearch)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = (e) => {
      setSearch(e.target.value)
    }

    const handleOutsideSearch = (e) => {
      if(e.keyCode === 13) {
        navigate('/')
        dispatch(searchInput(search))
      }
    }

    useEffect(() => {
      dispatch(searchInput(search))
    }, [search])

  return (
    <input type="text" autoFocus onKeyDown={handleOutsideSearch} onBlur={handleBlur} className='text-secondary px-3 py-2 rounded-xl absolute bottom-2 h-10 md:right-4 md:w-2/5 md:bottom-3 xl:w-1/3' placeholder='Search' onChange={(e) => handleSearch(e)} value={search} />
  )
}

export default SearchBar