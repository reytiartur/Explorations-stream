import React from 'react'

const HeaderItem = ({ title, Icon, eventHandler }) => {
  return (
    <div className='group flex flex-col items-center w-10 hover:cursor-pointer active:text-primary md:basis-1/5' onClick={eventHandler} >
        <Icon className='group-hover:animate-bounce' />
        <p className='opacity-0 tracking-wide pt-1 text-center group-hover:opacity-100 transition ease-in delay-150'>{ title }</p>
    </div>
  )
}

export default HeaderItem