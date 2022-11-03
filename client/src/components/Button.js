import React from 'react'

const Button = ({ text, type, buttonType }) => {
    
    const BUTTON_TYPE_STYLES = {
        primary: "bg-primary text-gray-200 border-primary hover:bg-secondary hover:text-primary ",
      };

  return (
    <button type={type} className={`rounded-lg font-semibold border-2 px-3 py-3 uppercase my-2 w-[160px] max-w-[260px] tracking-wider ${BUTTON_TYPE_STYLES[buttonType]}`}>{text}</button>
  )
}

export default Button