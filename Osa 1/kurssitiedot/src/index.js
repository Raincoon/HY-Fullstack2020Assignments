import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h1>{name}</h1>
const Content = ({parts}) => {
	return (
	<div>
		<Part info = {parts[0]}/>
		<Part info = {parts[1]}/>
		<Part info = {parts[2]}/>
	</div>
	)
}
const Part = ({info}) => <p>{info.name} {info.exercises}</p>
const Total = ({parts}) => {
	return (<p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>)
}

const App = () => {
    const course = {
		name: 'Half Stack application development',
		parts: [
		  {
			name: 'Fundamentals of React',
			exercises: 10
		  },
		  {
			name: 'Using props to pass data',
			exercises: 7
		  },
		  {
			name: 'State of a component',
			exercises: 14
		  }
		]
	  }


    return (
        <div>
            <Header name={course.name} />
				<Content parts={course.parts} />
				<Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))