import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import PublicRoute from "components/PublicRoute"
import ProtectedRoute from "components/ProtectedRoute"
import { AppRoutings } from "utility/enums/app-routings"

const SignIn = lazy(() => import("pages/SignIn"))
const Home = lazy(() => import("pages/Home"))
const Profile = lazy(() => import("pages/Profile"))
const UserProfile = lazy(() => import("pages/UserProfile"))
const Chats = lazy(() => import("pages/Chats"))
const SignUp = lazy(() => import("pages/SignUp"))
const AccountVerification = lazy(() => import("pages/AccountVerification"))

const RoutesList = [
  {
    path: AppRoutings.SignIn,
    component: <SignIn />,
    isProtectedRoute: false,
  },
  {
    path: AppRoutings.SignUp,
    component: <SignUp />,
    isProtectedRoute: false,
  },
  {
    path: AppRoutings.AccountVerification,
    component: <AccountVerification />,
    isProtectedRoute: false,
  },
  {
    path: AppRoutings.Home,
    component: <Home />,
    isProtectedRoute: true,
  },
  {
    path: AppRoutings.Profile,
    component: <Profile />,
    isProtectedRoute: true,
  },
  {
    path: AppRoutings.Chats,
    component: <Chats />,
    isProtectedRoute: true,
  },
  {
    path: AppRoutings.UserId,
    component: <UserProfile />,
    isProtectedRoute: true,
  },
]

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {RoutesList.filter((route) => !route.isProtectedRoute).map(
          ({ path, component }, key) => {
            return (
              <Route
                key={key}
                path={path}
                element={<PublicRoute>{component}</PublicRoute>}
              />
            )
          }
        )}
        {RoutesList.filter((route) => !!route.isProtectedRoute).map(
          ({ path, component }, key) => {
            return (
              <Route
                key={key}
                path={path}
                element={<ProtectedRoute>{component}</ProtectedRoute>}
              />
            )
          }
        )}
        <Route path="*" element={<Navigate replace to={AppRoutings.Home} />} />
      </Routes>
    </>
  )
}

export default AllRoutes
