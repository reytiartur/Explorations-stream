import React from 'react'

const Input = ({ label, type, value, ...props }) => {


  return (
    <div className='relative my-2 w-full text-secondary'>
        <input type={type} className='h-6 py-4 w-full pl-2 outline-primary' value={value} {...props} />
        <label className={`absolute top-1 left-2 pointer-events-none ${value.length ? 'opacity-0' : 'opacity-100'}`}>{label}</label>
    </div>
  )
}

export default Input