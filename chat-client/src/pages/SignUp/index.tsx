import { Box, Typography } from "@mui/material"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import TextField from "components/TextField"
import Button from "components/Button"
import { ISignUpValues } from "utility/interfaces/sign-up"
import SignUpService from "services/sign-up-service"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import CustomErrorMessage from "components/CustomErrorMessage"
import AuthLayout from "components/AuthLayout"
import { AppRoutings } from "utility/enums/app-routings"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"

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
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
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
    } catch (e: any) {
      toast.error(e.response.data.error)
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
                <Box>
                  Chat<Typography variant="h5">KI</Typography>
                </Box>
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
                    Sign Up
                  </Button>
                  <Box className={classes.signUpInfo}>
                    <Typography>
                      Already have an account?{" "}
                      <Link to={AppRoutings.SignIn}>Login</Link>
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
