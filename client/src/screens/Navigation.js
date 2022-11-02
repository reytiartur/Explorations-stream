import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderItem from '../components/HeaderItem'
import { HomeIcon, StarIcon, BookmarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

const Navigation = () => {
  return (
    <>
        <header className='flex flex-col items-center py-4 px-2 md:max-h-36 md:flex-row md:justify-between md:px-8'>
            <img className='w-32 h-32 object-contain' src='https://png2.cleanpng.com/sh/03714acc61d72c5fa564dcfb8fb29a7c/L0KzQYm3VMIxN5l7j5H0aYP2gLBuTfFva5pqhuY2Z4LodbTsTfNweppzjNpyYX6weLbzjfV1NaR1eeR9YT3qgrbsi71zd55mhp9xZXzwdcW0VfFlQWcAfaI6OEa4dIa1VsMxPGU8UKQ6NUK3QYqAWMU3OGoAUZD5bne=/kisspng-ancient-greece-corinthian-helmet-sparta-greek-roman-helmet-5ad969e01865d5.6304478215241978560999.png' />
            <div className='flex w-full gap-x-2 pt-2 justify-evenly sm:w-4/6 md:w-2/5 md:gap-x-3 md:max-w-[305px]'>
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