import { useState, useEffect, useLayoutEffect, useRef, useReducer, useMemo, useCallback, useContext} from 'react'
import './App.css'
import useEmojis from './hooks/useEmojis';
import { useUser } from './context/UserContext.jsx';

/*
// Custom hook to fetch emojis, can be reused in other components
const useEmojis = (initialState) => {
  const [emojis, setEmojis] = useState(initialState);
  
  useLayoutEffect(() => {
    const emojis = ["❤️", "✅", "😭", "✨", "🥹", "🔥", "🫩", "✔️"];
    setEmojis(emojis);
  }, []);

  return [emojis, setEmojis];
};
*/

// useReducer is used when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
const backgroundReducer = (state, action) => {
  switch (action.type) {
    case 'Increment':
      const nextIndex = (state.colorIndex + 1) % action.colors.length;
      return {
        backgroundColor: action.colors[nextIndex],
        colorIndex: nextIndex,
      };
    default:
      return state;
  }
};

function App() {

  const [count, setCount] = useState(0);
  const [emojis, setEmojis] = useEmojis([]);
  const [emoji, setEmoji] = useState("");
  const [user, setUser] = useUser();

  const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
  const [background, dispatch] = useReducer(backgroundReducer, { backgroundColor: 'red', colorIndex: 0 });
  
  // useMemo is used to memoize expensive calculations so that they are only re-computed when their dependencies change. This can help improve performance by avoiding unnecessary calculations on every render.
  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    return count * 2; 
  }, []);

  const buttonRef = useRef();

  const buttonClick = () => {
    const nextCount = count + 1;
    // buttonRef.current.style.backgroundColor = colors[nextCount % colors.length]; // ❌ fjern
    dispatch({ type: 'Increment', colors });  // 👈 send colors med
    setCount(nextCount);
  };
  
  // use when you want to do something before the component is rendered, and useEffect when you want to do something after the component is rendered
  /* useLayoutEffect(() => {
    const emojis = ["❤️", "✅", "😭", "✨", "🥹", "🔥", "🫩", "✔️"];
    setEmojis(emojis);
  }, []);
  */

  useEffect(() => {
    const index = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[index]);  
  }, [count]);
  
  return(
    <div className='flex justify-center'>
      <div className='flex flex-col gap-6'>
        <h2 style={{ fontSize: '12rem' }}>{emoji}</h2>
        <h1 className='text-4xl'>
          {count}
        </h1>
        <button style={{ backgroundColor: background.backgroundColor }} ref={buttonRef} className='bg-blue-500 text-white p-2' onClick={buttonClick}>
          Increment!
        </button>
        <div className='text-left'>
          <h2 className='text-2xl'>User Info:</h2>
          {user ? (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App

//se videre fra 50:00