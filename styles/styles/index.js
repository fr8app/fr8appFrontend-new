import { makeStyles } from "@material-ui/core/styles";
import appImages from "../../constants/appImages";
const Colors = {
  white: "#ffffff",
  black: "#000000",
  primary: "#196EA1",
  breadcrumb: "#222222",
  "--forgot-text": "#555",
  title: "#3C4858",
  greyIcon: "#a9afbb",
  dashboardCards: "#333333",
  coolBlue: "#f6f7fa",
};
// import TruckBgWhite from '/images/truckBgWhite.png';
export const useStyles = makeStyles((theme) => ({
  // Carousel
  carouselContainer: {
    marginTop: "2.5%",
    alignItems: "center",
    justifyContent: "center",
    width: "60% !important",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
    "& .carousel-root": {
      display: "flex",
      justifyContent: "center",
    },
  },
  timlinePostCard: {
    border: "3px solid #135c8b",
    width: "100%",
    "& 	.MuiCardHeader-title": {
      color: Colors.primary,
    },
  },
  avatar: {
    width: "66px !important",
    height: "66px !important",
    objectFit: "cover",
  },

  carouselDiv: {
    display: "flex",
    flexDirection: "row",
    height: "440px",
  },
  media: {
    height: 400,
  },
  textMedia: {
    height: "10vh",
  },
  // skeleton
  mediaSkeleton: {
    height: 300,
  },
  cardGrid: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minWidth: "100% !important",
    marginTop: "-40px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  mapOverlay: {
    display: "flex",
    position: "absolute",
    width: "95%",
    margin: "2.5%",
    flexDirection: "row",
    padding: "2.5%",
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 4,
    justifyContent: "space-between",
  },
  // mapOverlayItem: {
  //   display: "flex",
  // },

  mapOverlayItem: {
    top: 0,
    left: 0,
     width: "auto", 
    position: "relative",
    backgroundImage: "none"
  },
  
  // Timeline
  timelineBackground: {
    backgroundImage: `url(${appImages.truckBgWhite})`,
    position: "absolute",
    height: "auto",
    width: "100%",
    display: "block",
    top: 0,
    left: 0,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  timelineAppbar: {
    alignItems: "center",
  },
  logo: {
    width: 75,
    height: 75,
    cursor: "pointer",
  },
  timelineLogo: {
    width: 104,
    height: 104,
  },
}));
