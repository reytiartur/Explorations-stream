import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'

const VideoPreview = ({ video }) => {
  const navigate = useNavigate()
  const { slug, thumbnail, title, description, likes, date } = video;
  const truncDesc = description.substring(0, 100).concat('...')

  const handleNavigate = () => {
    console.log(slug)
    navigate(`/video/${slug}`)
  }

  return (
    <div className='py-6 sm:py-2 group flex flex-col xl:hover:scale-110 xl:hover:z-50 transition ease-in duration-250'>
      <div className="relative object-fit">
        <img className='aspect-video w-full' src={thumbnail} alt="thumbnail" />
        <div className='flex gap-3 absolute bottom-1/2 translate-y-[50%] left-1/2 translate-x-[-50%] lg:group-hover:opacity-100 lg:group-hover:translate-y-[-50%] transition ease-in-out duration-500 lg:opacity-0 lg:bottom-0 xl:flex-row'>
          <Button onClick={handleNavigate} text='WATCH NOW' buttonType='primary' />
          <Button text='WATCH LATER' buttonType='secondary' />
        </div>
      </div>
      <p className='capitalize pl-4 pt-3 pb-1 text-xl group-hover:font-bold cursor-default'>{title}</p>
      <p className='px-3 cursor-default'>{truncDesc}</p>
      <div className='flex items-center justify-between pt-3 mt-auto'>
        <p className='pl-5 flex items-center flex-nowrap'>{likes}{<HandThumbUpIcon className='h-5 mx-2 cursor-pointer' />}</p>
        <p className='pr-5'>{date}</p>
      </div>
    </div>
  )
}

export default VideoPreview