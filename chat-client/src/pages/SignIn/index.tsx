import { Box, Typography } from "@mui/material"
import { useState } from "react"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import TextField from "components/TextField"
import Button from "components/Button"
import { ISignInValues } from "utility/interfaces/sign-in"
import AuthService from "services/auth-service"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import CustomErrorMessage from "components/CustomErrorMessage"
import AuthLayout from "components/AuthLayout"
import { Link, useNavigate } from "react-router-dom"
import { AppRoutings } from "utility/enums/app-routings"
import { toast } from "react-toastify"
import { useAppDispatch } from "hooks/storeHook"
import { changeUserDetails } from "store/slices/userSlice"

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    boxShadow: "0 2px 18px 4px rgba(176, 176, 176, 0.22)",
    borderRadius: "12px",
    padding: "30px 50px",
    "& > div:nth-child(1)": {
      display: "flex",
      justifyContent: "center",
      paddingBottom: "15px",
      borderBottom: `3px solid ${theme.palette.primary.main}`,
      "& > div": {
        display: "flex",
        fontSize: "1.75rem",
        alignItems: "center",
        fontFamily: "'Montserrat', sans-serif",
        "& > h5": {
          color: theme.palette.primary.main,
        },
      },
    },
    "& > div:nth-child(2)": {
      display: "flex",
      flexDirection: "column",
      gap: "40px",
      height: "100%",
    },
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  signUpInfo: {
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > p": {
      fontSize: "15px",
      textAlign: "center",
      "& > a": {
        fontWeight: 500,
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
  },
}))

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const SignIn = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isSigning, setIsSigning] = useState(false)

  const initialValues: ISignInValues = {
    email: "",
    password: "",
  }

  const handleLogin = async (values: ISignInValues) => {
    setIsSigning(true)
    try {
      const res = await AuthService.signIn(values)
      AuthService.setAuthToken(res.data.token)
      dispatch(changeUserDetails(res.data.data))
      navigate(AppRoutings.Home)
    } catch (e: any) {
      const errorMessage = e.response.data.error
      if (errorMessage === "Email not verified!") {
        navigate(AppRoutings.AccountVerification, {
          state: {
            email: values.email,
            sendOTP: true,
          },
        })
      } else {
        toast.error(e.response.data.error)
      }
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <AuthLayout>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box className={classes.formWrapper}>
              <Box>
                <Box>
                  Chat<Typography variant="h5">KI</Typography>
                </Box>
              </Box>
              <Box>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <CustomErrorMessage name="email" />
                </Box>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <CustomErrorMessage name="password" />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSigning}
                    isLoading={isSigning}
                  >
                    Login
                  </Button>
                  <Box className={classes.signUpInfo}>
                    <Typography>
                      Don't have an account?{" "}
                      <Link to={AppRoutings.SignUp}>SignUp</Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default SignIn
