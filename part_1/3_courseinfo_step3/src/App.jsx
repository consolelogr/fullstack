

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
  }// Define the course object

  return (
    <div>
      {/* Access the course object properties */}
      <p>{course.name}</p>  
      <p>{course.parts[0].name}: {course.parts[0].exercises} </p> 
      <p>{course.parts[1].name}: {course.parts[1].exercises} </p>
      <p>{course.parts[2].name}: {course.parts[2].exercises} </p>
    </div> 
  )// Return the JSX code
}

export default App      // Export the App component