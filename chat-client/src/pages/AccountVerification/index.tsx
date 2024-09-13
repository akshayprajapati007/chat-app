import { Box, Typography } from "@mui/material"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import TextField from "components/TextField"
import Button from "components/Button"
import SignUpService from "services/sign-up-service"
import AuthService from "services/auth-service"
import CustomErrorMessage from "components/CustomErrorMessage"
import AuthLayout from "components/AuthLayout"
import { AppRoutings } from "utility/enums/app-routings"
import {
  BRAND_LABEL,
  OTP_LENGTH,
  RESEND_OTP_EXPIRATION_TIME,
} from "utility/constants"
import { changeUserDetails } from "store/slices/userSlice"
import { useAppDispatch } from "hooks/storeHook"
import { handleCatchError } from "utility/constants/helper"
import {
  BLANK_OTP_MESSAGE,
  INVALID_OTP_MESSAGE,
  NOTE_LABEL,
  OTP_SENT_TO_EMAIL_MESSAGE,
  RESEND_OTP_LABEL,
  VERIFY_LABEL,
} from "utility/constants/messages"
import { useSocket } from "socket/socket"

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
    gap: "5px",
    "& > p": {
      color: "#818181",
      fontWeight: "500 !important",
      fontSize: "0.85rem !important",
    },
    "& > button": {
      backgroundColor: "transparent",
      padding: "3px 10px",
      height: "auto",
      color: theme.palette.primary.main,
      width: "fit-content",
      boxShadow: "none",
      lineHeight: "normal",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.04)",
      },
    },
  },
}))

const validationSchema = Yup.object({
  otp: Yup.string()
    .required(BLANK_OTP_MESSAGE)
    .length(OTP_LENGTH, INVALID_OTP_MESSAGE),
})

const AccountVerification = () => {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { initializeSocket } = useSocket()

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
    if (state) {
      if (!state.email) {
        navigate(location.state?.from || AppRoutings.Home)
      } else if (state.sendOTP) {
        handleSendOTP()
      }
    } else {
      navigate(AppRoutings.Home)
    }
  }

  const handleSendOTP = async () => {
    setIsSendingOTP(true)
    try {
      const {
        state: { email },
      } = location
      await SignUpService.sendOTP({ email })
      toast.success(OTP_SENT_TO_EMAIL_MESSAGE)
      setResendBtnTime(RESEND_OTP_EXPIRATION_TIME)
    } catch (error: any) {
      handleCatchError(error)
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
        const authToken = res.data.token
        initializeSocket(authToken)
        AuthService.setAuthToken(res.data.token)
        dispatch(changeUserDetails(res.data.data))
        navigate(AppRoutings.Home)
      }
    } catch (error: any) {
      handleCatchError(error)
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
                <Box>{BRAND_LABEL}</Box>
              </Box>
              <Box>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    name="otp"
                    placeholder="OTP"
                    value={values.otp}
                    inputProps={{
                      maxLength: OTP_LENGTH,
                    }}
                    onChange={handleChange}
                  />
                  <CustomErrorMessage name="otp" />
                  <Box>
                    <Typography className={classes.otpNote}>
                      {NOTE_LABEL}: {OTP_SENT_TO_EMAIL_MESSAGE}
                    </Typography>
                  </Box>
                  <Box className={classes.resendBtnWrapper}>
                    {resendBtnTime > 0 && (
                      <Typography>{`00:${resendBtnTime}`}</Typography>
                    )}
                    <Button
                      variant="text"
                      isLoading={isSendingOTP}
                      disabled={isSendingOTP || resendBtnTime > 0}
                      onClick={handleSendOTP}
                    >
                      {RESEND_OTP_LABEL}
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
                    {VERIFY_LABEL}
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
