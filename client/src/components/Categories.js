import React from 'react'

const Categories = () => {

    const categories = ['latest', 'prehistoric', 'medieval', 'rome', 'greece', 'egypt', 'asia', 'pre-columbus', 'america', 'WWI', 'WWII', 'cold war' ,'modern']

  return (
    <nav className='relative'>
        <div className='w-10 h-full absolute top-0 left-0 bg-gradient-to-r from-secondary z-10' />
        <div className='flex w-screen overflow-x-scroll overflow-y-hidden items-center space-x-10 md:space-x-20 px-10 md:px-20 whitespace-nowrap md:text-lg scrollbar-hide'>
            {categories.map(category => (
                <p key={category} className='cursor-pointer transition duration-100 transform hover:scale-110 active:text-primary'>{category.toUpperCase()}</p>
            ))}
        </div>
        <div className='w-12 h-full  absolute top-0 right-0 bg-gradient-to-l from-secondary' />
    </nav>
  )
}

export default Categories