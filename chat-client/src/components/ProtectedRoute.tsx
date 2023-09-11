import React, { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "services/auth-service"
import SignIn from "pages/SignIn"
import { AppRoutings } from "utility/enums/app-routings"
import { IS_DEVELOPMENT_MODE, LOGIN_URL } from "configs"

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const [isPageAccessible, setIsPageAccessible] = useState(false)
  const navigate = useNavigate()

  const redirectToTheSignInScreen = (): void => {
    if (IS_DEVELOPMENT_MODE) {
      navigate(AppRoutings.SignIn)
      return
    }
    window.location.href = LOGIN_URL as string
  }

  useLayoutEffect(() => {
    const isCurrentSessionValid = authService.isCurrentSessionValid()
    if (isCurrentSessionValid) {
      setIsPageAccessible(true)
    } else {
      redirectToTheSignInScreen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isPageAccessible ? children : <SignIn />
}

export default ProtectedRoute
