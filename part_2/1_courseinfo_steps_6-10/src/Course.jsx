const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name}: {part.exercises} exercises
            </p>
          ))}
        </div>
      ))}

      <p>
        <br />
        Total exercises:{" "}
        {courses.reduce(
          (sum, course) =>
            sum + course.parts.reduce((sum, part) => sum + part.exercises, 0),
          0,
        )}
      </p>
    </div>
  );
};

export default Course;
