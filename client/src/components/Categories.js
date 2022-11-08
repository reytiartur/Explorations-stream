import React from 'react'
import { categories } from '../data'
import { setCategory } from '../utils/videosReducer'
import { useDispatch } from 'react-redux'

const Categories = () => {
  const dispatch = useDispatch()

  const handleChoose = (category) => {
    dispatch(setCategory(category))
  }

  return (
    <nav className='relative'>
        <div className='w-10 h-full absolute top-0 left-0 bg-gradient-to-r from-secondary z-10' />
        <div className='flex w-screen overflow-x-scroll overflow-y-hidden items-center space-x-10 py-2 md:space-x-20 px-10 md:px-20 whitespace-nowrap md:text-lg scrollbar-hide'>
            {categories.map(category => (
                <p key={category} onClick={() => handleChoose(category)} className='cursor-pointer transition duration-100 transform hover:scale-110 active:text-primary'>{category.toUpperCase()}</p>
            ))}
        </div>
        <div className='w-12 h-full  absolute top-0 right-0 bg-gradient-to-l from-secondary' />
    </nav>
  )
}

export default Categories