import React, { useEffect, useState } from 'react'
import VideoPreview from '../components/VideoPreview'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVideos, setInitialVideos } from '../utils/videosReducer'

const VideoList = () => {
  const videosToShow = useSelector(state => state.videos.showVideos)
  const stringToSearch = useSelector(state => state.videos.searchVideo)
  const status = useSelector(state => state.videos.status)
  const dispatch = useDispatch()
  const [videos, setVideos] = useState(videosToShow)

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchVideos())
    }
  }, [status])

  useEffect(() => {
    const searchedVideos = videosToShow?.filter(video => video.title.toLowerCase().includes(stringToSearch.toLowerCase()))
    setVideos(searchedVideos)
  }, [stringToSearch])

  useEffect(() => {
    setVideos(videosToShow)
  }, [videosToShow])

  let content;
    if(status === 'idle'|| status === 'loading') {
      content = <div className='flex flex-col items-center justify-center row-span-full col-span-full self-center justify-self-center	animate-pulse mt-40'> 
                  <div className="animate-spin flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-tr from-primary to-white">
                    <div className="h-10 w-10 rounded-full bg-secondary"></div>
                  </div>
                  <p className='mt-4 font-bold text-xl items-center'>Loading...</p>
                </div>
    } else if(status === 'succeeded') {
      content = videos?.length ? videos?.map(video => (
        <VideoPreview key={video.id} video={video} />
          )) : (
            <p className='col-span-full justify-self-center text-2xl text-bold mt-40 text-center'>Nothing has matched your search parameters...</p>
          )
    }


  
  return (
    <div className='w-full h-full flex flex-col px-6 py-6 sm:gap-6 sm:grid sm:grid-cols-1 md:grid-cols-2 md:px-12 md:py-10 md:gap-8 lg:gap-6 lg:px-4 lg:grid-cols-3 xl:px-8 2xl:grid-cols-4 2xl:gap-7 2xl:px-16 3xl:flex 3xl:justify-center 3xl:px-9 3xl:gap-8'>
        {content}
    </div>
  )
}

export default VideoList