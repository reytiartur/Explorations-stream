import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../components/Comment';
import Button from '../components/Button';
import { addComment } from '../utils/videosReducer';

const VideoPage = () => {
    const { slug } = useParams();
    const videos = useSelector(state => state.videos?.videoList)
    const video = videos?.filter(video => video.slug === slug)[0];
    const { title, source, likes, date, id, description, comments } = video;

    const [comment, setComment] = useState('')

    const handleChange = (e) => {
      const value = e.target.value
      setComment(value)
    }


  return (
    <div className='flex flex-col px-3 md:px-10 xl:px-20 2xl:px-36'>
        <p className='pl-3 py-4 text-2xl capitalize font-bold md:pl-7'>{title}</p>
        <video controls src={source}></video>
        <div className='flex items-center justify-between pt-6'>
            <p className='pl-5 flex items-center flex-nowrap cursor-pointer'>{likes}{<HandThumbUpIcon className='h-5 mx-2 cursor-pointer' />}</p>
            <p className='pr-5'>{date}</p>
        </div>
        <p className='py-6 px-3'>{description}</p>
        <div className="flex flex-col items-center pb-4">
          <form className='w-full px-3 pb-4 md:flex-row md:gap-4 md:w-full lg:gap-16 xl:gap-26 2xl:gap-30 flex flex-col items-center'>
            <textarea className='text-secondary px-2 py-2 h-24 md:h-10 w-full' placeholder='Leave your comment...' value={comment} onChange={(e) => handleChange(e)} />
            <Button text="POST" buttonType='primary' />
          </form>
          <div className="px-2 w-full md:w-3/4 lg:w-2/3 2xl:w-1/2">
            {comments && comments?.map(comment => (
              <Comment key={comment.text} comment={comment} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default VideoPage