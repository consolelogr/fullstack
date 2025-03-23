
const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map(part => (
            <p key={part.id}>
              {part.name}: {part.exercises} exercises
            </p>
          ))}

        </div>
      ))}

      <p><br />
        Total exercises: {courses.reduce((sum, course) =>
          sum + course.parts.reduce((sum, part) => sum + part.exercises, 0), 0)}
        {/*  Calculate the total number of exercises */}
      </p>    
      </div>
  )
}

const App = () => {
    
  const courses = [ // Define the courses array
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return ( // Return the Course component
    <div>

      <Course courses={courses} />
    </div>
  )
}

export default App      // Export the App component

