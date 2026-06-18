import * as React from "react";
import ContentLoader from "react-content-loader";

const ContentLoaderCustom = (props) => {
  if (props.terminal) {
    return (
      <ContentLoader
        height={"30vh"}
        width={"90vw"}
        speed={2}
        uniqueKey="1"
        primarycolor="#f3f3f3"
        secondarycolor="#ecebeb"
      >
        <rect x="1%" y="10%" rx="10" ry="10" width="15%" height="90%" />
        <rect x="17%" y="10%" rx="10" ry="10" width="15%" height="90%" />
        <rect x="33%" y="10%" rx="10" ry="10" width="15%" height="90%" />
        <rect x="49%" y="10%" rx="10" ry="10" width="15%" height="90%" />
        <rect x="65%" y="10%" rx="10" ry="10" width="15%" height="90%" />
        <rect x="81%" y="10%" rx="10" ry="10" width="15%" height="90%" />
      </ContentLoader>
    );
  } else {
    return (
      <ContentLoader
        height={"30vh"}
        width={"90vw"}
        speed={2}
        uniqueKey="2"
        primarycolor="#f3f3f3"
        secondarycolor="#ecebeb"
      >
        <rect x="1%" y="5%" rx="10" ry="10" width="19%" height="80%" />
        <rect x="26%" y="5%" rx="3" ry="3" width="70%" height="12%" />
        <rect x="26%" y="22%" rx="3" ry="3" width="70%" height="12%" />
        <rect x="26%" y="39%" rx="3" ry="3" width="70%" height="12%" />
        <rect x="26%" y="56%" rx="3" ry="3" width="70%" height="12%" />
        <rect x="26%" y="73%" rx="3" ry="3" width="70%" height="12%" />
      </ContentLoader>
    );
  }
};

export default ContentLoaderCustom;
