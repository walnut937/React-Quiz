import React from 'react'

function Header({ points }) {
  return ( 
    <>
    <div className='text-center text-red-500 text-4xl py-7 font-bold'>React App Quiz</div>
    <p> points : {points}</p>
    </>
  )
}

export default Header