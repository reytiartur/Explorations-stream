import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as SolidThumbUpIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux'
import { addToList, deleteFromList, reduceToWatchList, resetSearchInput } from '../utils/videosReducer'

const VideoPreview = ({ video }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug, thumbnail, title, description, likes, date, id } = video;
  const truncDesc = description.substring(0, 100).concat('...')
  const watchLaterList = useSelector(state => state.videos.watchLaterList)
  const [onList, setOnList] = useState([])
  const [liked, setLiked] = useState(false)


  useEffect(() => {
    const checkList = watchLaterList?.map(video => video.id).some(videoId => videoId === id)
    setOnList(checkList)
  }, [watchLaterList])

  const handleNavigate = () => {
    navigate(`/video/${slug}`)
    dispatch(resetSearchInput())
  }

  const handleAddToList = (video) => {
    dispatch(addToList(video))
  }

  const handleDeleteFromList = () => {
    dispatch(deleteFromList(id))
    dispatch(reduceToWatchList())
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className='py-6 sm:py-2 group flex flex-col justify-start xl:hover:scale-110 xl:hover:z-50 transition ease-in duration-250'>
      <div className="relative object-fit">
        <img className='aspect-video w-full' src={thumbnail} alt="thumbnail" />
        <div className='flex gap-3 absolute bottom-1/2 translate-y-[50%] left-1/2 translate-x-[-50%] lg:group-hover:opacity-100 lg:group-hover:translate-y-[-50%] transition ease-in-out duration-500 lg:opacity-0 lg:bottom-0 xl:flex-row'>
          <Button onClick={handleNavigate} text='WATCH NOW' buttonType='primary' />
          {!onList ? (<Button onClick={() => handleAddToList(video)} text='WATCH LATER' buttonType='secondary' />) : (<Button onClick={() => handleDeleteFromList(video)} text='REMOVE' buttonType='secondary' />)}
        </div>
      </div>
      <p className='capitalize pl-4 pt-3 pb-1 text-xl group-hover:font-bold cursor-default'>{title}</p>
      <p className='px-3 cursor-default'>{truncDesc}</p>
      <div className='flex items-center justify-between pt-3'>
        <div className='pl-5 flex items-center flex-nowrap cursor-pointer'>{likes}<button onClick={handleLike} className='h-5 mx-2'>{liked ? (<SolidThumbUpIcon pointerEvents="none" className='w-full h-full fill-primary pointer-events-none' />) : (<HandThumbUpIcon pointerEvents="none" className='w-full h-full pointer-events-none' />)}</button></div>
        <p className='pr-5'>{date}</p>
      </div>
    </div>
  )
}

export default VideoPreview