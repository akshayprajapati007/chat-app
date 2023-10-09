import { useState, useRef } from "react"
import { Box, Grid, Avatar, IconButton, CircularProgress } from "@mui/material"
import { Theme } from "@mui/material/styles"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import { makeStyles } from "@mui/styles"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { toast } from "react-toastify"
import CustomErrorMessage from "components/CustomErrorMessage"
import TextField from "components/TextField"
import Button from "components/Button"
import profileService from "services/profile-service"
import { IProfileValues } from "utility/interfaces/profile"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { changeUserDetails } from "store/slices/userSlice"
import { RootState } from "store/store"
import { isEqual } from "lodash"
import { AppRoutings } from "utility/enums/app-routings"
import { INavigator } from "utility/interfaces/common"
import NavigatorTree from "components/NavigatorTree"
import { ALLOWED_IMAGE_EXTENSIONS } from "utility/constants"
import { fileToBase64 } from "utility/constants/helper"
import Layout from "components/Layout"

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  formBoxWrapper: {
    boxShadow: "0 2px 18px 4px rgba(176, 176, 176, 0.22)",
    borderRadius: "12px",
    padding: "100px 50px 50px",
    maxWidth: "800px",
    position: "relative",
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
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
})

const Profile = () => {
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

  const navigators: INavigator[] = [
    {
      heading: "Home",
      link: AppRoutings.Home,
    },
    {
      heading: "Profile",
      link: AppRoutings.Profile,
    },
  ]

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
        const allowedExtensions =
          ALLOWED_IMAGE_EXTENSIONS.join("/").toUpperCase()
        toast.error(`Only ${allowedExtensions} files are allowed`)
        return
      }

      handleImageUpload(files)
    } else toast.error("Something went wrong!")
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
      } catch (e: any) {
        toast.error(e.response.data.error)
      }
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong")
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
    } catch (e: any) {
      toast.error(e.response.data.error)
    } finally {
      setIsUpdatingProfile(false)
      setIsEditingProfile(false)
    }
  }

  return (
    <Layout>
      <NavigatorTree navigators={navigators} />
      <Box pt={20}>
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
                      accept="image/png, image/jpeg, image/gif"
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
                          {isEditingProfile ? 'Update Profile' : 'Edit Profile'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  )
}

export default Profile
