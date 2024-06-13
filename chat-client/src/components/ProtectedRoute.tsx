import React, { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "services/auth-service"
import { AppRoutings } from "utility/enums/app-routings"
import { IS_DEVELOPMENT_MODE, LOGIN_URL } from "configs"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isPageAccessible, setIsPageAccessible] = useState<boolean | null>(null)
  const navigate = useNavigate()

  const redirectToTheSignInScreen = (): void => {
    if (IS_DEVELOPMENT_MODE) {
      navigate(AppRoutings.SignIn)
    } else {
      window.location.href = LOGIN_URL as string
    }
  }

  useLayoutEffect(() => {
    const isCurrentSessionValid = authService.isCurrentSessionValid()
    if (isCurrentSessionValid) {
      setIsPageAccessible(true)
    } else {
      redirectToTheSignInScreen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  if (isPageAccessible === null) {
    return null
  }

  return isPageAccessible ? <>{children}</> : null
}

export default ProtectedRoute
