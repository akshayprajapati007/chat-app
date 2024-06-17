import { useState, useRef } from "react"
import { Box, Grid, Avatar, IconButton, CircularProgress } from "@mui/material"
import { Theme } from "@mui/material/styles"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import { makeStyles } from "@mui/styles"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { toast } from "react-toastify"
import { isEqual } from "lodash"
import CustomErrorMessage from "components/CustomErrorMessage"
import TextField from "components/TextField"
import Button from "components/Button"
import profileService from "services/profile-service"
import { IProfileValues } from "utility/interfaces/profile"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { changeUserDetails } from "store/slices/userSlice"
import { RootState } from "store/store"
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_TYPES,
} from "utility/constants"
import { fileToBase64, handleCatchError } from "utility/constants/helper"
import {
  ALLOWED_IMAGE_EXTENSIONS_MESSAGE,
  EDIT_PROFILE_LABEL,
  FIRST_NAME_REQUIRED_MESSAGE,
  LAST_NAME_REQUIRED_MESSAGE,
  SOMETHING_WENT_WRONG_MESSAGE,
  UPDATE_PROFILE_LABEL,
} from "utility/constants/messages"

const sharedWrapperStyles = {
  boxShadow: "0 2px 18px 4px rgba(176, 176, 176, 0.22)",
  borderRadius: "12px",
  width: "800px",
}

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  formBoxWrapper: {
    ...sharedWrapperStyles,
    padding: "100px 50px 50px",
    position: "relative",
  },
  friendsListWrapper: {
    ...sharedWrapperStyles,
    padding: "30px 50px",
  },
  profileImageWrapper: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: "50%",
  },
  profileImageChildWrapper: {
    position: "relative",
    "& > button": {
      position: "absolute",
      right: "0",
      bottom: "5%",
      transform: "translateX(0%)",
      backgroundColor: theme.palette.primary.main,
      border: "2px solid #fff",
      "&:hover,&:disabled": {
        backgroundColor: theme.palette.primary.main,
      },
      "& svg": {
        color: "#fff",
        fontSize: "15px",
      },
    },
  },
  profileImageLoader: {
    color: "#fff",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
}))

const validationSchema = Yup.object({
  firstName: Yup.string().required(FIRST_NAME_REQUIRED_MESSAGE),
  lastName: Yup.string().required(LAST_NAME_REQUIRED_MESSAGE),
})

const ProfileInfo = () => {
  const classes = useStyles()
  const profileImageRef: any = useRef(null)
  const dispatch = useAppDispatch()
  const { email, firstName, lastName, profileImage } = useAppSelector(
    (state: RootState) => state.user
  )
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState(false)

  const initialValues: IProfileValues = {
    firstName,
    lastName,
  }

  const handleProfileEditClick = () => {
    if (profileImageRef.current) {
      profileImageRef.current.click()
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files.length > 0) {
      const { type } = files[0]
      const fileExtension = type.split("/").pop()
      const fileType = fileExtension ? fileExtension.toLowerCase() : ""

      if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileType)) {
        toast.error(ALLOWED_IMAGE_EXTENSIONS_MESSAGE)
        return
      }

      handleImageUpload(files)
    } else toast.error(SOMETHING_WENT_WRONG_MESSAGE)
  }

  const handleImageUpload = async (files: FileList) => {
    setIsUpdatingProfileImage(true)
    try {
      const base64Image = await fileToBase64(files[0])
      const payload = {
        profileImage: base64Image as string,
      }

      try {
        const response = await profileService.updateProfileImage(payload)
        const {
          data: { data, message },
        } = response
        dispatch(changeUserDetails(data))
        toast.success(message)
      } catch (error: any) {
        handleCatchError(error)
      }
    } catch (error) {
      handleCatchError(error)
    } finally {
      setIsUpdatingProfileImage(false)
    }
  }

  const handleProfileUpdateSubmit = (values: IProfileValues) => {
    if (isEditingProfile) {
      const isFieldUpdates = !isEqual(initialValues, values)
      if (isFieldUpdates) {
        handleProfileUpdate(values)
      } else {
        setIsEditingProfile(false)
      }
    } else {
      setIsEditingProfile(true)
    }
  }

  const handleProfileUpdate = async (values: IProfileValues) => {
    setIsUpdatingProfile(true)
    try {
      const response = await profileService.updateProfile(values)
      const {
        data: { data, message },
      } = response
      dispatch(changeUserDetails(data))
      toast.success(message)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsUpdatingProfile(false)
      setIsEditingProfile(false)
    }
  }

  return (
    <Formik
      validateOnChange
      validateOnBlur
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleProfileUpdateSubmit}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={classes.formWrapper}>
          <Box className={classes.formBoxWrapper}>
            <Box className={classes.profileImageWrapper}>
              <Box className={classes.profileImageChildWrapper}>
                <Avatar
                  src={profileImage}
                  sx={{ height: 120, width: 120, borderRadius: "50%" }}
                />
                <IconButton
                  size="small"
                  disabled={isUpdatingProfileImage}
                  onClick={handleProfileEditClick}
                >
                  {isUpdatingProfileImage ? (
                    <CircularProgress
                      size={15}
                      className={classes.profileImageLoader}
                    />
                  ) : (
                    <EditRoundedIcon />
                  )}
                </IconButton>
                <input
                  hidden
                  type="file"
                  accept={ALLOWED_IMAGE_TYPES}
                  ref={profileImageRef}
                  disabled={isUpdatingProfileImage}
                  onChange={handleImageSelect}
                />
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    name="firstName"
                    placeholder="First name"
                    disabled={!isEditingProfile}
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  <CustomErrorMessage name="firstName" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    name="lastName"
                    placeholder="Last name"
                    disabled={!isEditingProfile}
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  <CustomErrorMessage name="lastName" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.fieldWrapper}>
                  <TextField
                    disabled
                    placeholder="Email"
                    defaultValue={email}
                  />
                  <CustomErrorMessage name="email" />
                </Box>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box pt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isUpdatingProfile}
                      isLoading={isUpdatingProfile}
                    >
                      {isEditingProfile
                        ? UPDATE_PROFILE_LABEL
                        : EDIT_PROFILE_LABEL}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileInfo
