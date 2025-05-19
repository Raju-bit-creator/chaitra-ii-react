import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0); //initialize

  return (
    <>
      <div>
        <h1 className="title">chaitra group</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 5)}>
            count is {count}
          </button>
          <button onClick={() => setCount((count) => count - 5)}>
            decrease {count}
          </button>
        </div>
        <div>
          <h4>hello world</h4>
        </div>
      </div>
    </>
  );
}

export default App;
