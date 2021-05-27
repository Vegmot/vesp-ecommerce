// https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b

import React, { useEffect, useState, useRef } from 'react'

const Timer = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isTimerGoing, setIsTimerGoing] = useState(false)
  const increment = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsTimerGoing(true)
    increment.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsTimerGoing(false)
  }

  const handleResume = () => {
    setIsTimerGoing(true)
    increment.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setIsTimerGoing(false)
    setTimer(0)
  }

  // timer will start as soon as the page gets loaded
  useEffect(() => {
    handleStart()

    return () => handleReset()
  }, [])

  const formatAndDisplayTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <>
      <h3>Timer</h3>
      <div>
        <p>{formatAndDisplayTime()}</p>
        <div>
          {!isActive && !isTimerGoing ? (
            <button onClick={handleStart}>Start</button>
          ) : isTimerGoing ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handleResume}>Resume</button>
          )}
          <button onClick={handleReset} disabled={!isActive}>
            Reset
          </button>
        </div>
      </div>
    </>
  )
}

export default Timer
