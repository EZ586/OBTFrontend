import React, { useState } from 'react'
import dataset from "../../dataset/clustered.csv"
const Home = () => {

  const [text,setText]  = useState();
  
  fetch(dataset).then(response => response.text()).then((content) => {
    setText(content)
    console.log(content)})

  return (
    <div>
      <h1>This is Home Page</h1>
      <p>{text}</p>
    </div>
  )
}

export default Home