import { Box, Typography } from "@mui/material"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { useState } from "react"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { Link, useNavigate } from "react-router-dom"
import TextField from "components/TextField"
import Button from "components/Button"
import { ISignUpValues } from "utility/interfaces/sign-up"
import SignUpService from "services/sign-up-service"
import CustomErrorMessage from "components/CustomErrorMessage"
import AuthLayout from "components/AuthLayout"
import { AppRoutings } from "utility/enums/app-routings"
import { handleCatchError } from "utility/constants/helper"
import {
  ALREADY_HAVE_AN_ACCOUNT_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  FIRST_NAME_REQUIRED_MESSAGE,
  INVALID_EMAIL_ADDRESS_MESSAGE,
  LAST_NAME_REQUIRED_MESSAGE,
  LOGIN_LABEL,
  PASSWORD_REQUIRED_MESSAGE,
  SIGN_UP_LABEL,
} from "utility/constants/messages"
import { BRAND_LABEL } from "utility/constants"

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
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
      gap: "25px",
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
  firstName: Yup.string().required(FIRST_NAME_REQUIRED_MESSAGE),
  lastName: Yup.string().required(LAST_NAME_REQUIRED_MESSAGE),
  email: Yup.string()
    .email(INVALID_EMAIL_ADDRESS_MESSAGE)
    .required(EMAIL_REQUIRED_MESSAGE),
  password: Yup.string().required(PASSWORD_REQUIRED_MESSAGE),
})

const SignUp = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [isSigningUp, setIsSigningUp] = useState(false)

  const initialValues: ISignUpValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }

  const handleSignUp = async (values: ISignUpValues) => {
    setIsSigningUp(true)
    try {
      const res = await SignUpService.signUp(values)
      navigate(AppRoutings.AccountVerification, {
        state: {
          email: res.data.data.email,
          sendOTP: false,
        },
      })
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <AuthLayout>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box className={classes.formWrapper}>
              <Box>
                <Box>{BRAND_LABEL}</Box>
              </Box>
              <Box>
                <Box display="flex" gap="15px">
                  <Box className={classes.fieldWrapper}>
                    <TextField
                      name="firstName"
                      placeholder="First name"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <CustomErrorMessage name="firstName" />
                  </Box>
                  <Box className={classes.fieldWrapper}>
                    <TextField
                      name="lastName"
                      placeholder="Last name"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    <CustomErrorMessage name="lastName" />
                  </Box>
                </Box>
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
                    disabled={isSigningUp}
                  >
                    {SIGN_UP_LABEL}
                  </Button>
                  <Box className={classes.signUpInfo}>
                    <Typography>
                      {ALREADY_HAVE_AN_ACCOUNT_MESSAGE}{" "}
                      <Link to={AppRoutings.SignIn}>{LOGIN_LABEL}</Link>
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

export default SignUp
