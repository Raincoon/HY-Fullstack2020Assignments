import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({g, n, b}) => {
  if (g+n+b === 0) {
    return(<p>No feedback given</p>)
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="Good:" value={g} />
        <StatisticLine text="Neutral:" value={n} />
        <StatisticLine text="Bad:" value={b} />
        <StatisticLine text="Total:" value={g+n+b}/>
        <StatisticLine text="Average:" value={(g-b)/(g+n+b)}/>
        <StatisticLine text="Positive:" value={<>{(g/(g+n+b))*100}%</>}/>
      </tbody>
    </table>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine  = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good+1)} text='Good' />
      <Button onClick={() => setNeutral(neutral+1)} text='Neutral' />
      <Button onClick={() => setBad(bad+1)} text='Bad' />
      
      <h1>Stats</h1>
      <Statistics g = {good} n ={neutral} b = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)