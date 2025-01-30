import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props:any) => (
  <ContentLoader 
    speed={2}
    height={460}
    width={800}
    viewBox="0 0 900 460"
    backgroundColor="#ababab"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="78" y="8" rx="6" ry="6" width="488" height="16" /> 
    <rect x="78" y="46" rx="6" ry="6" width="452" height="16" /> 
    <rect x="0" y="84" rx="6" ry="6" width="810" height="16" /> 
    <rect x="0" y="122" rx="6" ry="6" width="780" height="16" />
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
)

export default MyLoader