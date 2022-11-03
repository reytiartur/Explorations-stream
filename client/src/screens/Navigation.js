import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderItem from '../components/HeaderItem'
import { HomeIcon, StarIcon, BookmarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png'

const Navigation = () => {
  return (
    <>
        <header className='flex flex-col items-center py-1 px-2 md:py-4 md:max-h-36 md:flex-row md:justify-between md:items-start md:px-8'>
            <img className='w-36 h-16 object-cover object-center md:w-40' src={logo} alt='logo' />
            <div className='flex w-full gap-x-2 pt-3 justify-evenly sm:w-4/6 md:w-2/5 md:gap-x-3 md:max-w-[305px]'>
                <HeaderItem title='HOME' Icon={HomeIcon} />
                <HeaderItem title='TOP RATED' Icon={StarIcon} />
                <HeaderItem title='YOUR LIST' Icon={BookmarkIcon} />
                <HeaderItem title='SEARCH' Icon={MagnifyingGlassIcon} />
                <HeaderItem title='ACCOUNT' Icon={UserIcon} />
            </div>
        </header>
        <Outlet />
    </>
  )
}

export default Navigation