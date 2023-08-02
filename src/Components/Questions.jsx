import React from 'react'

function Questions({ question, dispatch, answer, index }) {
  console.log(question)

  function nextitem() {
    dispatch({type : 'next'})
    dispatch({type : 'newAnswer', payload: null})
  }

  return (
    <div className='text-center'>
      <h1>{question.question}</h1>
      <div className='flex items-center gap-3 flex-col mt-3'>
        {question.options.map((option, index) => (
          <button onClick={() => dispatch({type : 'newAnswer', payload : index})} key={index} className={`py-2 ${index === answer ? 'ml-10' : ''} ${answer !== null ? index === question.correctOption ? 'bg-green-500' : 'bg-red-400' : ''} text-white hover:ml-10 cursor-pointer transition-all duration-300 mb-2 w-1/2 bg-gray-400 rounded-xl`} disabled={answer !== null}>
            {option}
          </button>
        ))}
      </div>
      { answer !== null &&
      <button onClick={nextitem}>Next</button>
      }
    </div>
  )
}

export default Questions