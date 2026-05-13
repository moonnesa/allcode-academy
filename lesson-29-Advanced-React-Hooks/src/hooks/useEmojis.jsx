import { useState, useLayoutEffect } from "react";  

// Custom hook to fetch emojis, can be reused in other components
const useEmojis = (initialState) => {
  const [emojis, setEmojis] = useState(initialState);
  
  useLayoutEffect(() => {
    const emojis = ["❤️", "✅", "😭", "✨", "🥹", "🔥", "🫩", "✔️"];
    setEmojis(emojis);
  }, []);

  return [emojis, setEmojis];
};

export default useEmojis;