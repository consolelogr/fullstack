import { useState } from 'react'
import './App.css'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const average = (good - bad) / (good + neutral + bad);
  const positive = Math.min(100, good * 100 / (good + neutral + bad));

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="Average" value={isNaN(average) ? '0.0' : average.toFixed(1)} />
      <StatisticsLine text="Positive" value={isNaN(positive) ? '0.0' : positive.toFixed(1) + "%"} />
      <StatisticsLine text="Total" value={good + neutral + bad} />
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

      {Button({ text: 'Good', onClick: () => setGood(good + 1) })}
      {Button({ text: 'Neutral', onClick: () => setNeutral(neutral + 1) })}
      {Button({ text: 'Bad', onClick: () => setBad(bad + 1) })}
      <br /><br />
      {Statistics({ good, neutral, bad })}
    </div>
  )
}

export default App


/*   
         +--------------------+
         |      App           |
         |  (Holds State)     |
         |  good, neutral, bad|
         +--------------------+
                  │
   +--------------+--------------+
   |              |              |
+--------+   +--------+   +--------+
| Button |   | Button |   | Button |  (Each updates state)
|  Good  |   | Neutral|   |  Bad   |
+--------+   +--------+   +--------+
                  │
                  ↓
         +--------------------+
         |   Statistics       |
         |  (Receives Props)  |
         | good, neutral, bad |
         +--------------------+
                  │
     +------------+------------+
     |            |            |
+-------------+ +-------------+ +-------------+
| Statistic  | | Statistic   | | Statistic   |  (Displays each stat)
|  Good      | |  Neutral    | |  Bad        |
+-------------+ +-------------+ +-------------+
     |            |            |
+-------------+ +-------------+ +-------------+
| Statistic  | | Statistic   | | Statistic   |
|  Average   | |  Positive % | |  Total      |
+-------------+ +-------------+ +-------------+
*/