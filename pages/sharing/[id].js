import React, { useEffect, useState } from "react";
// styles
import { useStyles } from "../../styles/styles";
// Third party front-end libs
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import appConstants from "../../constants/appconstants";
import{getTerminalWaitingTime} from "../../constants/getTerminalWaitingTime"
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  handleClearStateAction,
  timelineDetailsAction,
} from "../../redux/action";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import Head from "next/head";

export default function TimelineScreen() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    timelineDetails,
    isLoading,
    timelineErrorState,
    isTimeLineSuccess,
  } = useSelector((state) => state.reducer);
  const [openAlert, setOpenAlert] = useState(isMobile);
  const [showCarousel, setShowCarousel] = useState(isMobile ? true : true);
  const [linker, setLinker] = useState("");
  const [timelineMediaArray, setTimelineMediaArray] = useState([]);
  const [timelineRouteArray, setTimelineRouteArray] = useState([]);
  const [timelineGlobalArray, setTimelineGlobalArray] = useState([]);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [avgHrs, setAvgHrs] = useState(0);
  const [avgMins, setAvgMins] = useState(0);
  const [avgSecs, setAvgSecs] = useState(0);

  const timelineId = router?.query?.id;
  const timelineType = router?.query?.type;
  const timelineVersion = router?.query?.version;

  // lifecycle hooks
  useEffect(() => {
    (function (b, r, a, n, c, h, _, s, d, k) {
      if (!b[n] || !b[n]._q) {
        for (; s < _.length;) c(h, _[s++]);

        d = r.createElement(a);

        d.async = 1;

        d.src = "https://cdn.branch.io/branch-latest.min.js";

        k = r.getElementsByTagName(a)[0];

        k.parentNode.insertBefore(d, k);

        b[n] = h;
      }
    })(
      window,

      document,

      "script",

      "branch",

      function (b, r) {
        b[r] = function () {
          b._q.push([r, arguments]);
        };
      },

      { _q: [], _v: 1 },

      "addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(
        " "
      ),

      0
    );
    branch.init("key_live_fg6nRbib2CwY4PuFnK45kjibtAmpj710", function (
      err,
      data
    ) { });
    branch.link(
      {
        tags: ["FR8", "fr8"],
        stage: "new user",
        data: {
          mydata: timelineId,
          user_id: timelineId,
          $ios_url: "https://apps.apple.com/in/app/the-fr8-app/id1562162277",
          $android_url:
          "https://play.google.com/store/apps/details?id=com.fr8",
          $og_app_id: "12345",
          $og_title: "FR8",
          $og_description: "Open in FR8 app",
          $always_deeplink: true,
          $random_id:Math.floor(Math.random() * 1000)
        },
      },
      function (err, link) {
        setLinker(link);
      }
    );
    document.title = appConstants.appConstants.headerTitle.timeline;
    dispatch(handleClearStateAction());
    if (timelineId) {
      dispatch(
        timelineDetailsAction(timelineId, timelineType, timelineVersion)
      );
    }
    return () => {
      null; // unmount the componnet
    };
  }, [router]);

  // make list to show in carouel after check if they are not protected
  useEffect(() => {
    if (timelineVersion === "v2" || timelineVersion === "v3" || timelineVersion === "v4" || timelineVersion === "v5" || timelineVersion === "v5.3") {
      timelineDetails?.images?.map((url, index) => {
        timelineGlobalArray.push(url);
      });
      if (timelineDetails?.video) {
        let videoUrl = {
          url: timelineDetails?.video,
          media: "video",
        };
        timelineGlobalArray.push(videoUrl);
      }
    }
    return () => {
      null; // unmount the componnet
    };
  }, [timelineDetails?.images]);

  const checkMediaRouteProtected = (media, index, array) =>
    timelineDetails?.route_id?.receipt_private === true
      ? media.type === "interchange_file"
        ? true
        : false
      : false;

  useEffect(() => {
    if (timelineVersion === "v2" || timelineVersion === "v3" || timelineVersion === "v4" || timelineVersion === "v5" || timelineVersion === "v5.3") {
      timelineDetails?.route_id?.route_medias?.map((url, index, array) => {
        let isMediaProtected = checkMediaRouteProtected(url, index, array)
        if (!isMediaProtected) {
          timelineRouteArray.push(url)
        }
      })
    }
    // if (timelineDetails?.video) {
    //   let videoUrl = {
    //     url: timelineDetails?.video,
    //     media: "video",
    //   };
    //   timelineGlobalArray.push(videoUrl);
    // }



    return () => {
      null; // unmount the componnet
    };
  }, [timelineDetails?.route_id]);

  useEffect(() => {
    timelineDetails?.routePostMedia?.map((media, index, array) => {
      let isMediaProtected = checkMediaProtected(media, index, array);
      if (!isMediaProtected) {
        timelineMediaArray.push(media);
      }
    });

    const getTime = () => {
      let hrs;
      let mins;
      let secs;

      hrs = Math.floor(timelineDetails?.minute / 3600);
      mins = Math.floor((timelineDetails?.minute - hrs * 3600) / 60);
      secs = Math.floor(timelineDetails?.minute % 60);
      var min = mins > 0 ? secs>29 ? mins+1 :mins  :mins;
      setHrs(hrs);
      setMins(min);
      setSecs(secs);
    };

    const getAvgTime = () => {
      let hrs;
      let mins;
      let secs;

      hrs = Math.floor(
        timelineDetails?.terminal?.avg_total_stopage_time_in_minutes / 60
      );
      mins = Math.floor(
        timelineDetails?.terminal?.avg_total_stopage_time_in_minutes - hrs * 60
      );
      secs = Math.floor(
        (timelineDetails?.terminal?.avg_total_stopage_time_in_minutes * 60) % 60
      );
      setAvgHrs(hrs);
      setAvgMins(mins);
      setAvgSecs(secs);
    };
    getAvgTime();
    getTime();
    return () => {
      null; // unmount the componnet
    };
  }, [timelineDetails?.routePostMedia]);

  useEffect(() => {
    timelineDetails?.routePostMedia?.map((media, index, array) => {
      let isMediaProtected = checkMediaProtected(media, index, array);
      if (!isMediaProtected) {
        timelineMediaArray.push(media);
      }
    });

    const getTime = () => {
      let h;
      let m;
      let s;

      h = Math.floor(timelineDetails?.route_id?.minute / 3600);
      m = Math.floor((timelineDetails?.route_id?.minute - h * 3600) / 60);
      s = Math.floor(timelineDetails?.route_id?.minute % 60);
      var min = m > 0 ? s>29 ? m+1 :m  :m;
      setHrs(h);
      setMins(min);
      setSecs(s);
    };

    const getAvgTime = () => {
      let hrs;
      let mins;
      let secs;
      hrs = Math.floor(
        timelineDetails?.route_id?.terminal?.avg_total_stopage_time_in_minutes / 60
      );
      mins = Math.floor(
        timelineDetails?.route_id?.terminal?.avg_total_stopage_time_in_minutes - hrs * 60
      );
      secs = Math.floor(
        (timelineDetails?.route_id?.terminal?.avg_total_stopage_time_in_minutes * 60) % 60
      );
      setAvgHrs(hrs);
      setAvgMins(mins);
      setAvgSecs(secs);
    };
    getAvgTime();
    getTime();
    return () => {
      null; // unmount the componnet
    };
  }, [timelineDetails?.route_id]);

  // handle close button click of modal
  const handleClose = () => {
    setShowCarousel(true);
    setOpenAlert(false);
  };

  //to check if the media is protected or not
  const checkMediaProtected = (media, index, array) =>
    timelineDetails?.receipt_private === true
      ? media.type === "interchange_file"
        ? true
        : false
      : false;

  // render dialoge box to ask if open in browser or app

  const renderDialog = () => {
    return (
      <Grid className={"new"} style={{ marginTop: "2vh" }} container justify="center" alignItems="center" >
        <Grid item xs={11} sm={11} md={11}>




          <Card className={"jss2 "} style={{ height: "30%", padding: 2 }}>
            <CardContent className={'new'}>
              <Typography
                variant="subtitle6"
                color="textSecondary"
                component="p"
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                Open post in App
                <a href={linker} style={{ textDecoration: "none" }}>

                  <button style={{ height: 33, backgroundColor: '#196EA1', width: 60, borderRadius: 2, color: '#fff' }} size="small" color="primary">
                    {appConstants.appConstants.openInApp}
                  </button>
                </a>
              </Typography>

            </CardContent>
          </Card>


        </Grid>
      </Grid>


      // <Dialog open={openAlert} aria-labelledby="draggable-dialog-title">
      //   <DialogTitle
      //     style={{ textAlign: "center", padding: "0 24px" }}
      //     id="draggable-dialog-title"
      //   >
      //     <img src="../images/logo.png" className="imgLog" width="66px" />
      //   </DialogTitle>
      //   <DialogContent>
      //     <DialogContentText>
      //       {appConstants.appConstants.timelineAlert}
      //     </DialogContentText>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button size="small" onClick={handleClose} color="primary">
      //       {appConstants.appConstants.cancel}
      //     </Button>
      //     <a href={linker} style={{ textDecoration: "none" }}>
      //       <Button size="small" color="primary">
      //         {appConstants.appConstants.openInApp}
      //       </Button>
      //     </a>
      //   </DialogActions>
      // </Dialog>
    );


  };

  // render dialoge box with error
  const renderErrorDialogBox = () => {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={8} md={8} lg={8} xs={6}>
          <Card
            className={classes.timlinePostCard}
            style={{ marginTop: "25vh", marginBottom: "60vh" }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
                style={{ textAlign: "center" }}
              >
                Timeline post not available.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  //render card header with empty data untill data fetched
  const renderEmptyCardHeader = () => {
    return (
      <CardHeader
        avatar={<Avatar alt="profile img" className={classes.avatar} />}
        titleTypographyProps={{
          variant: "h6",
        }}
        subheaderTypographyProps={{
          variant: "subtitle1",
        }}
      />
    );
  };

  // render card Header with avatar and title
  const renderCardHeader = () => {
    return (
      <CardHeader
        avatar={
          <Avatar
            src={
              timelineDetails?.media_type === null
                ? appConstants.baseUrlMedia + timelineDetails?.user_id?.profile
                : appConstants.baseUrlMedia + [timelineDetails?.shared_by ? timelineDetails?.shared_by?.profile : timelineDetails?.user?.profile]
            }
            className={classes.avatar}
          />
        }
        titleTypographyProps={{
          variant: "h6",
        }}
        subheaderTypographyProps={{
          variant: "body2",
        }}
        title={
          timelineDetails?.shared_by
            ? timelineDetails?.shared_by?.userName
            : timelineDetails?.media_type === null
              ? timelineDetails?.user_id?.userName
              : timelineDetails?.user?.userName
        }
        subheader={
          timelineDetails?.terminal?.terminal_name === undefined ? (
            moment(timelineDetails?.timeLineDetails?.created_at).format(
              "dddd, MMMM Do YYYY"
            )
          ) : (
            <p style={{ margin: 0 }}>
              {timelineDetails?.terminal?.terminal_name}
              <br />
              {moment(timelineDetails?.timeLineDetails?.created_at).format(
                "dddd, MMMM Do YYYY"
              )}
            </p>
          )
        }
      />
    );
  };

  // render Card Media with empty data containing loader untill data fetched
  const renderEmptyCardMedia = () => {
    return (
      <CardMedia
        style={{
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color={"primary"} />
      </CardMedia>
    );
  };

  let overlayMapData = [
    {
      background: "red",
      title: "Mi",
      data: timelineDetails?.distance
        ? ((timelineDetails?.distance / 1000) * 0.621371).toFixed(2)
        : "0",
        routeData: timelineDetails?.route_id?.distance
        ? ((timelineDetails?.route_id?.distance / 1000) * 0.621371).toFixed(2)
        : "0",
    },
    {
      background: "green",
      title: "Time",
      data: `${hrs > 0 ? `${hrs} Hrs` : ""} ${
        mins > 0 ? `${mins} mins` : "0 min"
           }`,
    routeData:  `${hrs > 0 ? `${hrs} Hrs` : ""} ${
      mins > 0 ? `${mins} mins` : "0 min"
    }`,
    },
    {
      background: "#196EA1",
      title: "Avg wait",
      data: `${avgHrs > 0 ? `${avgHrs} Hrs` : ""} ${
        avgMins > 0 ? `${avgMins} mins` :  getTerminalWaitingTime(timelineDetails?.route_id ?timelineDetails?.route_id?.terminal: timelineDetails?.terminal)+ " mins"
      }`,
      routeData: `${avgHrs > 0 ? `${avgHrs} Hrs` : ""} ${
        avgMins > 0 ? `${avgMins} mins` : getTerminalWaitingTime(timelineDetails?.route_id ?timelineDetails?.route_id?.terminal: timelineDetails?.terminal) + " mins"
      }`,
    },
  ];

  // render map overlay with data in map pic
  const renderDataOverlayOnMap = () => {
    return (
      <Grid spacing={2} className={classes.mapOverlay}>
        {overlayMapData.map((overlayData, index) => {
          return (
            <Grid
              key={index.toString()}
              item
              className={classes.mapOverlayItem}
              style={{display:'inline-table'}}
              spacing={1}
            >
               <Grid item style={{display:'inline-table'}}>
                <Box
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: overlayData.background,
                    borderRadius: 4,
                    marginTop: 4,
                  }}
                />
              </Grid>
              <Grid
                item
                direnction="column"
                style={{ marginLeft: 10, textAlign: "left",display:'inline-table' }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "700", color: "white" }}
                >
                  {overlayData.title}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "700", color: "white" }}
                >
                   {timelineDetails?.route_id? overlayData.routeData:overlayData.data}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // render card media included carousel after data fetched
  const renderCardMediaWithData = () => {
    console.log(timelineDetails)
    return (
      <CardMedia
        title={
          timelineDetails?.media_type === null
            ? timelineDetails?.timeLineDetails?.description
            : timelineDetails?.description
        }
        className={timelineDetails?.media_type == "text" ?classes.textMedia :classes.media}
      >

        {timelineDetails?.route_id ?

          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows
            autoPlay={false}
            infiniteLoop
            useKeyboardArrows
          >
            {
              <div className={classes.carouselDiv}>
                {renderDataOverlayOnMap()}
                <img
                  src={appConstants.baseUrlMedia + timelineDetails.route_id?.image}
                  className={classes.carouselImage}
                />
              </div>
            }
            {timelineRouteArray.map((media, index, arr) => {
              return (
                <div className={classes.carouselDiv}>
                  <img
                    src={appConstants.baseUrlMedia + media?.media}
                    className={classes.carouselImage}
                  />

                </div>
              );
            })}

          </Carousel>

          : timelineDetails?.media_type === null ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows
              autoPlay={false}
              infiniteLoop
              useKeyboardArrows
            >
              {
                <div className={classes.carouselDiv}>
                  {renderDataOverlayOnMap()}
                  <img
                    src={appConstants.baseUrlMedia + timelineDetails?.image}
                    className={classes.carouselImage}
                  />
                </div>
              }
              {timelineMediaArray.map((media, index, arr) => {
                return (
                  <div className={classes.carouselDiv}>
                    {media?.type == "video" ? (
                      <video
                        className={classes.carouselImage}
                        controls

                        style={{ width: "100%", objectFit: "contain" }}
                      >
                        <source
                          src={appConstants.baseUrlMedia + media?.media}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <img
                        src={appConstants.baseUrlMedia + media?.media}
                        className={classes.carouselImage}
                      />
                    )}
                  </div>
                );
              })}

            </Carousel>
          )
            //         :
            //         timelineDetails?.media_type == "text"?(

            //         <div>
            // "asdjalkdsjaklsd"
            //         </div>
            //         )
            : timelineVersion === "v2" || timelineVersion === "v3" || timelineVersion === "v4" || timelineVersion === "v5" || timelineVersion === "v5.3" ? (
              <Carousel
                showThumbs={false}
                showStatus={false}
                showArrows
                autoPlay={false}
                infiniteLoop
                useKeyboardArrows
              >
                {timelineGlobalArray.map((media, index, arr) => {
                  return (
                    <div className={classes.carouselDiv}>
                      {media?.media == "video" ? (
                        <video
                          className={classes.carouselImage}
                          controls
                          style={{ width: "100%", objectFit: "contain" }}
                        >
                          <source
                            src={appConstants.baseUrlMedia + media?.url}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          src={appConstants.baseUrlMedia + media?.url}
                          className={classes.carouselImage}
                        />
                      )}
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className={classes.carouselDiv}>
                {timelineDetails?.media_type === "video" ? (
                  <video
                    className={classes.carouselImage}
                    controls
                    style={{ width: "100%", objectFit: "contain" }}
                  >
                    <source
                      src={appConstants.baseUrlMedia + timelineDetails?.video}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    src={appConstants.baseUrlMedia + timelineDetails?.video}
                    className={classes.carouselImage}
                  />
                )}
              </div>
            )}

      </CardMedia>
    );
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={"Wait Times Can Be Costly."} />
        <meta property="og:title" content={"Fr8"} key="ogtitle" />
        <meta property="og:url" content={"https://www.fr8.ai/sharing/[id]" || "https://www.Fr8.ai/sharing/[id]" || "https://FR8.ai/sharing/[id]" || "https://Fr8.ai/sharing/[id]"} />
        +        <meta property="og:description" content={"Wait Times Can Be Costly."} key="ogdesc" />
        +        <meta property="og:image" content={"https://www.fr8.ai/images/logo.png"} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      </Head>
      <div className={"jss133"}>
        <AppBar position="relative">
          <Toolbar style={{ justifyContent: "center" }}>
            <img src="../images/logo.png" className="imgLog" width="66px" />
          </Toolbar>
        </AppBar>
        <main>
          {isMobile && linker
            ? isTimeLineSuccess
            && renderDialog()

            : true}
          {showCarousel && (
            <Container
              className={"jss7"}
              style={{ maxWidth: "100%", marginBottom: "auto", minHeight: "100vh", height: "100%" }}
            >
              {timelineErrorState.length > 0 ? (
                renderErrorDialogBox()
              ) : (
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} sm={6} md={6}>
                    <Card className={"jss2"}>
                      {isLoading ? renderEmptyCardHeader() : renderCardHeader()}
                      <CardContent style={{ overflowWrap: "break-word" }}>
                        {timelineDetails?.shared_by && (
                          <Typography
                            variant="caption"
                            color={"primary"}
                            component="p"
                          >
                            {timelineDetails?.media_type === null
                              ? timelineDetails?.shared_by?.userName
                              : timelineDetails?.shared_by?.userName}{" "}
                            has shared{" "}
                            {timelineDetails?.media_type === null
                              ? timelineDetails?.user_id?.userName
                              : timelineDetails?.user?.userName}
                            's post.
                          </Typography>
                        )}
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          component="p"
                          style={{ lineHeight: "25px" }}
                        >
                          {timelineDetails?.media_type === null
                            ? timelineDetails?.timeLineDetails?.description === ""
                              ? "N/A"
                              : timelineDetails?.timeLineDetails?.description
                            : timelineDetails?.description === ""
                              ? "N/A"
                              : timelineDetails?.description}
                        </Typography>
                      </CardContent>
                      {isLoading
                        ? renderEmptyCardMedia()
                        : renderCardMediaWithData()}
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          component="p"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Container>
          )}
        </main>
      </div>
    </>
  );
}
