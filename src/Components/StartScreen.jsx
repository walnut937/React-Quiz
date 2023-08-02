import React from 'react'

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className='text-center text-3xl mt-5'>
        <h1>Welcome to the React Quiz</h1>
        <p>{numQuestions} questions to test your react skills</p>
        <button onClick={() => dispatch({type : 'start'})} className='px-3 py-2 bg-black text-white'>Let's Start</button>
    </div>
  )
}

export default StartScreen