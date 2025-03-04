import { useState } from 'react'
import './App.css'


const Statistics = ({good, neutral, bad}) => {
  const average = (good - bad) / (good + neutral + bad);
  const positive = Math.min(100, good * 100 / (good + neutral + bad));


return(
<div>
  <h2>Statistics</h2>
  <p>Good: {good} <br/> Neutral: {neutral} <br/> Bad: {bad}</p>

  <p>Average: {isNaN(average) ? '0.0' : average.toFixed(1)}</p>
  <p>Positive: {isNaN(positive) ? '0.0' : positive.toFixed(1)+ "%"}</p>

    <p>Total: {good + neutral + bad}</p>
    </div>
)

} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 

    return (
    <div className="feedback">
      <h1>Unicafe</h1>
      <p>Give feedback</p>
    
      <button onClick= { () => 
        {const goodCount=good+1; setGood(goodCount)}  }> Good </button> 
        
      <button onClick= { () => 
        { const neutralCount=neutral+1; setNeutral(neutralCount);  }}> Neutral </button>
        
      <button onClick= { () => 
        { const badCount=bad+1 ;setBad(badCount);  }}> Bad </button>
        
        <br/><br/>
       {Statistics({good, neutral, bad})}

     
      </div>
    
  )
}

export default App