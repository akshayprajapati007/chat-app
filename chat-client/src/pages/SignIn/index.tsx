import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import CustomErrorMessage from "components/CustomErrorMessage"
import AuthLayout from "components/AuthLayout"
import TextField from "components/TextField"
import Button from "components/Button"
import AuthService from "services/auth-service"
import { ISignInValues } from "utility/interfaces/sign-in"
import { AppRoutings } from "utility/enums/app-routings"
import { useAppDispatch } from "hooks/storeHook"
import { changeUserDetails } from "store/slices/userSlice"
import { handleCatchError } from "utility/constants/helper"
import { BRAND_LABEL } from "utility/constants"
import {
  DO_NOT_HAVE_AN_ACCOUNT_MESSAGE,
  EMAIL_NOT_VERIFIED_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  INVALID_EMAIL_ADDRESS_MESSAGE,
  LOGIN_LABEL,
  PASSWORD_REQUIRED_MESSAGE,
  SIGN_UP_LABEL,
} from "utility/constants/messages"
import { useSocket } from "socket/socket"

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
    .email(INVALID_EMAIL_ADDRESS_MESSAGE)
    .required(EMAIL_REQUIRED_MESSAGE),
  password: Yup.string().required(PASSWORD_REQUIRED_MESSAGE),
})

const SignIn = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { initializeSocket } = useSocket()
  const [isSigning, setIsSigning] = useState(false)

  const initialValues: ISignInValues = {
    email: "",
    password: "",
  }

  useEffect(() => {
    const isLoggedIn = AuthService.isCurrentSessionValid()
    if (isLoggedIn) {
      console.log("log in")
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (values: ISignInValues) => {
    setIsSigning(true)
    try {
      const res = await AuthService.signIn(values)
      const authToken = res.data.token
      initializeSocket(authToken)
      AuthService.setAuthToken(authToken)
      dispatch(changeUserDetails(res.data.data))
      navigate(AppRoutings.Home)
    } catch (error: any) {
      if (
        error.response.data.error &&
        error.response.data.error === EMAIL_NOT_VERIFIED_MESSAGE
      ) {
        navigate(AppRoutings.AccountVerification, {
          state: {
            email: values.email,
            sendOTP: true,
          },
        })
      } else {
        handleCatchError(error)
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
                <Box>{BRAND_LABEL}</Box>
              </Box>
              <Box>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    autoComplete="on"
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
                    {LOGIN_LABEL}
                  </Button>
                  <Box className={classes.signUpInfo}>
                    <Typography>
                      {DO_NOT_HAVE_AN_ACCOUNT_MESSAGE}{" "}
                      <Link to={AppRoutings.SignUp}>{SIGN_UP_LABEL}</Link>
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
