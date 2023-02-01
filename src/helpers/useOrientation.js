import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'

const useOrientation = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'))

  useEffect(() => {

    const onChange = (result) => {
      setScreenInfo(result.screen);
    }

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange)

  }, [])

  return {
    ...screenInfo,
    setPortrait: screenInfo.height > screenInfo.width
  }
}

export default useOrientation

