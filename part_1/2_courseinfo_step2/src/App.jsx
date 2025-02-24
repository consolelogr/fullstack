

const Header = (props) => {   //props from App component passed to Header component
  return (
  <h1>{props.course}</h1>
)
}

const Content = (props) => {   //props from App component passed to Content component
   return (
    <div>
      <Part name={props.part1} exercises={props.exercises1} />
      <Part name={props.part2} exercises={props.exercises2} />
      <Part name={props.part3} exercises={props.exercises3} />
    </div>
  )
}


const Part = (props) => {   //props from Content component passed to Part component
  return (
   <p>{props.name}: {props.exercises}</p>
  )
}


const Total = (props) => {   //props (exercises) from App component passed to Total component
  return (
    <p> {props.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
    <Header course={course}/>
    <Content part1={part1} exercises1={exercises1}
      part2={part2} exercises2= {exercises2}
      part3={part3} exercises3= {exercises3} />
    <Total exercises={ (exercises1 + exercises2 + exercises3) }/>
    </div>
  )
  // const course passed to Header as props named course
  // Total: in ( ) is plain JS expression to calculate total exercises

}

export default App

/*
App  
│  
├── Header (renders course name)  
│  
├── Content  
│   ├── Part (renders part1 + exercises1)  
│   ├── Part (renders part2 + exercises2)  
│   ├── Part (renders part3 + exercises3)  
│  
└── Total (renders total exercises)  
*/