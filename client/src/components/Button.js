import React from 'react'

const Button = ({ text, buttonType, ...props }) => {
    
    const BUTTON_TYPE_STYLES = {
        primary: "bg-primary text-gray-300 border-primary hover:bg-secondary hover:text-primary ",
        secondary: 'bg-secondary text-gray-300 border-gray-300 hover:text-white hover:border-white',
      };

  return (
    <button className={`rounded-lg font-semibold border-2 px-3 py-2 uppercase my-2 flex justify-center whitespace-nowrap min-w-[130px] max-w-[260px] tracking-wider ${BUTTON_TYPE_STYLES[buttonType]}`} {...props}>{text}</button>
  )
}

export default Button