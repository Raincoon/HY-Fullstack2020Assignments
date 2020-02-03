import React from 'react'

const Header = ({name}) => <h1>{name}</h1>
const Content = ({parts}) => {
	return (
	<div>
		{parts.map((part, i) => 
			<Part key={i} info = {part}/>
		)}
	</div>
	)
}
const Part = ({info}) => <p>{info.name} {info.exercises}</p>
const Total = ({parts}) => {
	return (<p>Total of {parts.reduce((n, current)=> n+ current.exercises,0)} exercises</p>) //reduce sums exercise amounts
}
const Course = ({course}) => {
	return(
		<>
		<Header name={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
		</>
	)
}

export default Course