const Hello = (props) => {

  console.log(props)

  return (
    <div>
      <p>

        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {

  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>

      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <Hello age="1200"/>

    </div>
  )
}



/* JSX code that looks a bit like HTML is translated with babel to javascript
All HTML tags nust be closed
dynamic JS content inside curly braces
React treats <Hello /> as a function call to Hello() and renders its returned JSX.
props: tiedonvälitys komponenttien välillä
*/
export default App