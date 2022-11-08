import '../sass/App.scss';
import React, { useState, useEffect } from "react";

function App() {

  const [hello, setHello] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(res => setHello(res))
  }, [])

  return (
    <div>
      <h1>Hello, World!</h1>
      <h1>{hello}</h1>
    </div>
  );
}

export default App;
