import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const Pagination = ({ pages, currentPage, setCurrentPage, passedRef}) => {
    const numberOfPages = Array.from({length: pages}, (_, i) => i + 1)
    
    const handleClick = (pageNum) => {
        setCurrentPage(pageNum)
        passedRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    const nextPage = () => {
        if(currentPage !== pages) {
            setCurrentPage(prevState => prevState + 1)
            passedRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }

    const prevPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(prevState => prevState - 1)
            passedRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }
      
  return (
    <div className='w-full flex items-center justify-center pb-5 text-lg font-semibold gap-3'>
        <ChevronLeftIcon onClick={prevPage} className='w-5 cursor-pointer' />
        {numberOfPages.map(pageNum => (
            <div key={pageNum} onClick={() => handleClick(pageNum)} className={`cursor-pointer ${pageNum === currentPage ? 'text-primary' : 'text-gray-300'}`}>{pageNum}</div>
        ))}
        <ChevronRightIcon onClick={nextPage} className='w-5 cursor-pointer' />
    </div>
  )
}

export default Pagination