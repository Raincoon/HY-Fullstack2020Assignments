import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Random = () => Math.floor(Math.random() * 6) //random integer of 0-5
const Anecdote = ({header,text,votes}) => {
    return(<>
    <h1>{header}</h1>
    <p>{text}</p>
    <Votes value={votes} /></>
    )
}
const Votes = ({value}) => <p>This anecdote has {value} votes</p>

let votes = [0,0,0,0,0,0] //vote counts for each anecdote

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [topVoted, setNewTop] = useState(0)
  
  const vote = selected => { //add new vote
      const copy = [...votes]
      copy[selected] += 1
      votes = copy
      
      if (votes[selected] > votes[topVoted]){ //check if new top voted
        setNewTop(selected)
      } else {
        refresh()
      }
  }

  if (votes[topVoted] === 0) { //no votes received yet, initiate voting encouragement
    return (    
        <div>
            <Anecdote   header="Anecdote of the day" 
                        text={anecdotes[selected]}
                        votes={votes[selected]}/>
            <Button onClick={() => vote(selected)} text="Add vote"/>
            <Button onClick={() => setSelected(Random())} text="Next anecdote"/>
            <p>Cast your vote for the best anecdote!</p>
        </div>
    )
  }
  return (
    <div>
        <Anecdote   header="Anecdote of the day" 
                    text={anecdotes[selected]}
                    votes={votes[selected]}/>
        <Button onClick={() => vote(selected)} text="add vote"/>
        <Button onClick={() => setSelected(Random())} text="Next anecdote"/>
        <br/><br/>
        <Anecdote   header="Top voted anecdote" 
                    text={anecdotes[topVoted]}
                    votes={votes[topVoted]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const refresh = () => {
    ReactDOM.render(<App anecdotes={anecdotes} />,
    document.getElementById('root'))
}
refresh()