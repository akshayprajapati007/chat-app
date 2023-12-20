import { Box, Typography } from "@mui/material"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import TextField from "components/TextField"
import Button from "components/Button"
import SignUpService from "services/sign-up-service"
import AuthService from "services/auth-service"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import CustomErrorMessage from "components/CustomErrorMessage"
import AuthLayout from "components/AuthLayout"
import { AppRoutings } from "utility/enums/app-routings"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { RESEND_OTP_EXPIRATION_TIME } from "utility/constants"
import { toast } from "react-toastify"
import { changeUserDetails } from "store/slices/userSlice"
import { useAppDispatch } from "hooks/storeHook"

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
  otpNote: {
    fontSize: "0.8rem !important",
    marginTop: "5px",
    color: "#818181",
    fontWeight: "500 !important",
  },
  resendBtnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > p": {
      color: "#818181",
      fontWeight: "500 !important",
      fontSize: "0.85rem !important",
    },
    "& > button": {
      backgroundColor: "transparent",
      padding: "3px 10px",
      minHeight: "0px",
      color: theme.palette.primary.main,
      width: "fit-content",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.04)",
      },
    },
  },
}))

const validationSchema = Yup.object({
  otp: Yup.string()
    .required("Please enter an OTP")
    .length(4, "Please enter a valid OTP"),
})

const AccountVerification = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [isVerifying, setIsVerifying] = useState(false)
  const [isSendingOTP, setIsSendingOTP] = useState(false)
  const [resendBtnTime, setResendBtnTime] = useState(RESEND_OTP_EXPIRATION_TIME)

  const initialValues = {
    otp: "",
  }

  useEffect(() => {
    handleOnPageLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (resendBtnTime > 0) {
        setResendBtnTime((prevValue) => prevValue - 1)
      } else {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [resendBtnTime])

  const handleOnPageLoad = () => {
    const { state } = location
    if (!state?.email) {
      navigate(location.state?.from || AppRoutings.Home)
    } else if (state?.sendOTP) {
      handleSendOTP()
    }
  }

  const handleSendOTP = async () => {
    setIsSendingOTP(true)
    try {
      const {
        state: { email },
      } = location
      await SignUpService.sendOTP({ email })
      toast.success("An OTP has been sent to your registered email address")
      setResendBtnTime(RESEND_OTP_EXPIRATION_TIME)
    } catch (e: any) {
      toast.error(e.response?.data?.error)
    } finally {
      setIsSendingOTP(false)
    }
  }

  const handleAccountVerification = async (values: { otp: string }) => {
    try {
      setIsVerifying(true)
      const res = await SignUpService.verifyAccount({
        ...values,
        email: location.state.email,
      })
      if (res.data.success) {
        AuthService.setAuthToken(res.data.token)
        dispatch(changeUserDetails(res.data.data))
        navigate(AppRoutings.Home)
      }
      setIsVerifying(false)
    } catch (e) {
      console.log("error, e")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <AuthLayout>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAccountVerification}
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
                    name="otp"
                    placeholder="OTP"
                    value={values.otp}
                    inputProps={{
                      maxLength: 4,
                    }}
                    onChange={handleChange}
                  />
                  <CustomErrorMessage name="otp" />
                  <Box>
                    <Typography className={classes.otpNote}>
                      NOTE: An OTP has been sent to your registered email
                      address
                    </Typography>
                  </Box>
                  <Box className={classes.resendBtnWrapper}>
                    {resendBtnTime > 0 && (
                      <Typography>{`00:${resendBtnTime}`}</Typography>
                    )}
                    <Button
                      isLoading={isSendingOTP}
                      disabled={isSendingOTP || resendBtnTime > 0}
                      onClick={handleSendOTP}
                    >
                      Resend OTP
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isVerifying}
                  >
                    Verify
                  </Button>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default AccountVerification
