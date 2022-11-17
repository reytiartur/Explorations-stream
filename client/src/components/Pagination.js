import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const Pagination = ({ pages, currentPage, setCurrentPage}) => {
    const numberOfPages = Array.from({length: pages}, (_, i) => i + 1)
    
    const handleClick = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const nextPage = () => {
        if(currentPage !== pages) 
            setCurrentPage(prevState => prevState + 1)
    }

    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(prevState => prevState - 1)
    }
      
  return (
    <div className='w-full flex items-center justify-center pb-5 text-lg font-semibold gap-3'>
        <ChevronLeftIcon onClick={prevPage} className='w-5 cursor-pointer' />
        {numberOfPages.map(pageNum => (
            <div key={pageNum} onClick={() => handleClick(pageNum)} className={pageNum === currentPage ? 'text-primary' : 'text-gray-300'}>{pageNum}</div>
        ))}
        <ChevronRightIcon onClick={nextPage} className='w-5 cursor-pointer' />
    </div>
  )
}

export default Pagination