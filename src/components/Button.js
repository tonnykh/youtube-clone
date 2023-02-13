import React from 'react'

const Button = ({name}) => {
  return (
      <div>
          <button className='py-1 px-3 rounded-lg bg-gray-200 m-2'>{name}</button>
    </div>
  )
}

export default Button