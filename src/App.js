import Header from "./Components/Header";
import { useEffect, useReducer } from "react";
import Loading from "./Components/Loading";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";

const initialstate = {
  questions : [], 

  //'Loading', 'error', 'active', 'finished', 'ready'
  status : 'Loading',
  index : 0,
  answer : null,
  points : 0
};

function reducer(state, action) {
  switch(action.type){
    case 'dataRecieved' : return {...state, questions: action.payload, status: 'ready' }

    case 'dataFailed' : return {...state, questions: action.payload, status: 'error'}

    case 'newAnswer' : 
    const question = state.questions.at(state.index)
    return {...state, answer : action.payload, points : action.payload === question.correctOption ? state.points + question.points : state.points}

    case 'start' : return {...state, status: 'active'}
    case 'next' :return { ...state, index: state.index + 1 }
    default :
    throw new Error('Actions Unknown')
  }
}

function App() {

  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer ,initialstate)
  const numQuestions = questions.length
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/questions');
        const data = await response.json();
        dispatch({type: 'dataRecieved', payload : data})

      } catch (error) {
        dispatch({ type: 'dataFailed', payload: 'Error fetching data' })
      }
    }
    fetchData();
  },[])

  return (
    <div>
      <Header points={points} />
      <div>
        {status === 'Loading' && <Loading />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'error' && <Error />}
        {status === 'active' && <Questions index={index} dispatch={dispatch} answer={answer} question={questions[index]} />}
      </div>
    </div>
  );
}

export default App;
