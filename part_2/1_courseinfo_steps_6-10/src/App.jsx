
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      {/* Access the course object properties */}
      <p>{course.name}</p>  
      <p>{course.parts[0].name}: {course.parts[0].exercises} </p> 
      <p>{course.parts[1].name}: {course.parts[1].exercises} </p>
      <p>{course.parts[2].name}: {course.parts[2].exercises} </p>
      <p>Total exercises:</p>
    </div> 
  )// Return the JSX code
}

export default App      // Export the App component