import React from 'react'

const Comment = ({ comment }) => {
    const { author, text, date } = comment;

  return (
    <div className='flex flex-col w-full border bg-gray-900 border-gray-400 rounded-lg px-3 py-1 mb-2'>
        <div className="flex justify-between">
            <p className='text-primary font-semibold'>{author} :</p>
            <p>{date}</p>
        </div>
        <p className='font-semibold pl-2 p-1'>{text}</p>
    </div>
  )
}

export default Comment