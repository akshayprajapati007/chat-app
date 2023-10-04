import React, { useEffect, useRef } from "react"
import LoadingBar from "react-top-loading-bar"
import { PRIMARY_MAIN } from "configs/theme"

const TopLoadingBar: React.FC = () => {
  const ref: any = useRef(null)

  useEffect(() => {
    if (ref?.current) ref.current.continuousStart()
  }, [])

  return (
    <>
      <LoadingBar color={PRIMARY_MAIN} ref={ref} shadow height={4} />
    </>
  )
}

export default TopLoadingBar
