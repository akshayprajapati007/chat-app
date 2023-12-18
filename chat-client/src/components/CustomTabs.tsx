import React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    fontWeight: "600 !important",
    textTransform: "none",
    padding: `${theme.spacing(1)} !important`,
  },
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface ICustomTabsProps {
  activeTab?: number
  tabs: {
    tabLabel: string | React.ReactNode
    tabPanel: string | React.ReactNode
  }[]
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box paddingY={1}>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  }
}

const ProfileTabs = ({ activeTab, tabs }: ICustomTabsProps) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(activeTab || 0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab, index) => {
            const { tabLabel } = tab
            return (
              <Tab
                label={tabLabel}
                className={classes.tab}
                {...a11yProps(index)}
              />
            )
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => {
        const { tabPanel } = tab

        return (
          <CustomTabPanel value={value} index={index}>
            {tabPanel}
          </CustomTabPanel>
        )
      })}
    </Box>
  )
}

export default ProfileTabs
