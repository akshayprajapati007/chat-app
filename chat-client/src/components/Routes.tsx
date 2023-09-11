import SignIn from "pages/SignIn"
import { Routes, Route, Navigate } from "react-router-dom"
import PublicRoute from "components/PublicRoute"
import ProtectedRoute from "components/ProtectedRoute"
import Layout from "components/Layout"
import { AppRoutings } from "utility/enums/app-routings"
import Home from "pages/Home"
import SignUp from "pages/SignUp"
import AccountVerification from "pages/AccountVerification"

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
]

const AllRoutes = () => {
  return (
    <Layout>
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
        <Route
          path="*"
          element={<Navigate replace to={AppRoutings.SignIn} />}
        />
      </Routes>
    </Layout>
  )
}

export default AllRoutes
