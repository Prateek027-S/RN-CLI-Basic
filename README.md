# MEMOIZATION Example (React)
```
import React, { useState, useRef, useMemo, useCallback } from 'react';


const NumList = React.memo(
  ({squaredList, handleItemClick}) => {
  console.log('NumList rendered');
  
  return (
    <div>
      <ul>
        {
          squaredList.map((item, index) => 
            <li key={index} onClick={(item) => handleItemClick(item)}>{item}</li>
          )
        }
      </ul>
    </div>
  )
}
)

function App() {
  const [count, setCount] = useState(0)
  const list = useRef([2, 5, 6, 7, 10]);
  
  function squareNums() {
    console.log('square list items...')
    return list.current.map((item) => item*item);
  }
  
  const squaredList = useMemo(() => {
    return squareNums();
  }, [list.current]);
  
  // const squaredList = squareNums();
  
  const handleItemClick = useCallback((item) => {
    console.log(item.target.textContent, ' clicked');
  }, [])
  
  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4'
    },
  };

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Hello, World!</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count {count}
        </button>
        <NumList squaredList={squaredList} handleItemClick={handleItemClick} />
      </div>
    </div>
  )
}

export default App

```