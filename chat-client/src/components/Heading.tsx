import { styled } from "@mui/styles"

const CustomHeading = styled("h1")({
  color: "#333",
})

interface IHeadingProps {
  heading: string
}

const Heading = ({ heading }: IHeadingProps) => {
  return <CustomHeading>{heading}</CustomHeading>
}

export default Heading
