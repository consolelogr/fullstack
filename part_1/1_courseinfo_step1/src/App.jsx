

const Header = (props) => {   //props from App component passed to Header component
  return (
  <h1>{props.course}</h1>
)
}

const Content = (props) => {   //props from App component passed to Content component
   return (
    <div>
    <p> {props.part1} </p>
    <p> {props.part2} </p>
    <p> {props.part3} </p>
    </div>
  )
}

const Total = (props) => {   //props from App component passed to Total component
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
    <Content part1={part1+ ": " + exercises1}/>
    <Content part2={part2+ ": " + exercises2}/>
    <Content part3={part3+ ": " + exercises3}/>
    <Total exercises={ (exercises1 + exercises2 + exercises3) }/>
    </div>
  )
  // const course passed to Header as props named course
}

export default App