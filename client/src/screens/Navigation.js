import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import HeaderItem from '../components/HeaderItem'
import { HomeIcon, StarIcon, BookmarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png'
import SearchBar from '../components/SearchBar'
import { reduceVideos, resetSearchInput, reduceToWatchList, reduceToPopular } from '../utils/videosReducer'
import { useDispatch, useSelector } from 'react-redux'

const Navigation = () => {
  const [open, setOpen] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialVideoList = useSelector(state => state.videos.videoList)

  const handleNavigate = (link) => {
    navigate(link)
    dispatch(resetSearchInput())
    dispatch(reduceVideos(initialVideoList))
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleWatchList = () => {
    dispatch(reduceToWatchList())
  }

  const handleBlur = () => {
    setTimeout(() => {
      handleOpen(false)
    }, 100)
  }

  const reducePopular = () => {
    dispatch(reduceToPopular())
  }
  
  return (
    <>
        <header className='flex flex-col items-center relative py-1 px-2 md:py-4 md:max-h-36 md:flex-row md:justify-between md:items-start md:px-8'>
            <img onClick={() => handleNavigate('/')} className='w-36 h-16 object-cover object-center md:w-40 cursor-pointer' src={logo} alt='logo' />
            <div className='flex w-full gap-x-2 pt-3 justify-evenly sm:w-4/6 md:w-2/5 md:gap-x-3 md:max-w-[305px]'>
                <HeaderItem title='HOME' Icon={HomeIcon} eventHandler={() => handleNavigate('/')} />
                <HeaderItem title='POPULAR' Icon={StarIcon} eventHandler={reducePopular} />
                <HeaderItem title='YOUR LIST' Icon={BookmarkIcon} eventHandler={handleWatchList} />
                <HeaderItem title='SEARCH' Icon={MagnifyingGlassIcon} eventHandler={handleOpen} />
                <HeaderItem title='ACCOUNT' Icon={UserIcon} eventHandler={() => handleNavigate('/account')} />
            </div>
          {open && (<SearchBar handleBlur={handleBlur} />)}
        </header>
        <Outlet />
    </>
  )
}

export default Navigation