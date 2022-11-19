import React, { useEffect, useRef, useState } from 'react'
import VideoPreview from '../components/VideoPreview'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVideos, setInitialVideos } from '../utils/videosReducer'
import Pagination from '../components/Pagination'

const VideoList = () => {
  const videosToShow = useSelector(state => state.videos.showVideos)
  const stringToSearch = useSelector(state => state.videos.searchVideo)
  const status = useSelector(state => state.videos.status)
  const dispatch = useDispatch()
  const [videos, setVideos] = useState(videosToShow)
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(12);
  const scrollRef = useRef(null);

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



  let loader = <div className='flex flex-col items-center justify-center row-span-full col-span-full self-center justify-self-center	animate-pulse mt-40'> 
              <div className="animate-spin flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-tr from-primary to-white">
                <div className="h-10 w-10 rounded-full bg-secondary"></div>
              </div>
              <p className='mt-4 font-bold text-xl items-center'>Loading...</p>
            </div>

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos?.slice(indexOfFirstVideo, indexOfLastVideo);
  const pages = Math.ceil(videos?.length / videosPerPage)
  let content = currentVideos?.length ? currentVideos?.map(video => (
      <VideoPreview key={video.id} video={video} />
        )) : (
          <p className='col-span-full justify-self-center text-2xl text-bold mt-40 text-center'>Nothing has matched your search parameters...</p>
        )

  return (
    <div ref={scrollRef}>
      <div className='w-full h-full flex flex-col max-h-min px-6 py-6 min-h-[800px] sm:gap-6 sm:grid sm:grid-cols-1 md:grid-cols-2 md:px-12 md:py-10 md:gap-8 lg:gap-6 lg:px-4 lg:grid-cols-3 xl:px-8 2xl:grid-cols-4 2xl:gap-7 2xl:px-16 3xl:flex 3xl:justify-center 3xl:px-9 3xl:gap-8'>
        {status === 'succeeded' ? content : status === 'idle'|| status === 'loading' ? loader : null}
      </div>
      {status === 'succeeded' && <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} passedRef={scrollRef} />}
    </div>
    
  )
}

export default VideoList