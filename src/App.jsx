import { Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

const App = () => {
  const [clickedPeppa, setClickedPeppa] = useLocalStorage("clicked", false)
  // Custom hook
  // https://usehooks.com/useLocalStorage/
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(()=> {
      if(typeof window === "undefined") return initialValue

      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key)
        // Parse stored json or if none return intialvalue
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.log(error)
        return initialValue
      }
    })

    // Return a wrapped version of useState's setter function that...
    // persists the new v alue to locals torage
    const setValue = value => {
      try {
        // Allow value to be afunction so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // save state
        setStoredValue(valueToStore)
        // save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.log(error)
      }
    }
    return [storedValue, setValue]
  }

  useEffect(()=> {
    setClickedPeppa(false)
  }, [])

  const clickThaPeppa = () => setClickedPeppa(true)

  return (
    <>
      <button onClick={clickThaPeppa}>Click the peppa</button>
    </>
  )
}

export default App
