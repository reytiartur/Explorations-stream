import React from 'react'
import { useParams } from 'react-router-dom'
import { videos } from '../data'
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const VideoPage = () => {

    const { slug } = useParams();
    const video = videos?.filter(video => video.slug === slug)[0];
    const { title, source, likes, date, description } = video;

  return (
    <div className='flex flex-col px-3 md:px-10 xl:px-20 2xl:px-36'>
        <p className='pl-3 py-4 text-2xl capitalize font-bold md:pl-7'>{title}</p>
        <video controls src={source}></video>
        <div className='flex items-center justify-between pt-6'>
            <p className='pl-5 flex items-center flex-nowrap cursor-pointer'>{likes}{<HandThumbUpIcon className='h-5 mx-2 cursor-pointer' />}</p>
            <p className='pr-5'>{date}</p>
        </div>
        <p className='py-6 px-3'>{description}</p>
    </div>
  )
}

export default VideoPage