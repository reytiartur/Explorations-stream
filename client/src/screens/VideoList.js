import React from 'react'
import VideoPreview from '../components/VideoPreview'
import { videos } from '../data'


const VideoList = () => {
  return (
    <div className='px-6 py-6 sm:gap-6 sm:grid sm:grid-cols-1 md:grid-cols-2 md:px-12 md:py-10 md:gap-8 lg:gap-6 lg:px-4 lg:grid-cols-3 xl:px-8 2xl:grid-cols-4 2xl:gap-7 3xl:flex 3xl:justify-center 3xl:px-9 3xl:gap-8 flex-wrap'>
        {videos.map(video => (
          <VideoPreview key={video.id} video={video} />
        ))}
    </div>
  )
}

export default VideoList