import { useState } from "react";
import Navigation from "../../components/navigation";
import appImages from "../../constants/appImages";
import Slider from "react-slick";
import Layout from "../../components/layout";
import { useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { useWindowSize } from "../../components/getdimensions";
import appconstants from "../../constants/appconstants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { terminalBoardAction, stateAction } from "../../redux/action";
import ContentLoaderCustom from "../../components/ContentLoader";
import CarouselArrow from '../../components/CarouselArrow'
import CarouselImage from "../../components/CarouselImage"
import { Modal } from "@material-ui/core";
import { useRouter, withRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip, Button, Spin } from 'antd';
import 'antd/dist/antd.css'
import { getTerminalWaitingTime, getClosingSoonCheck, getCurrentUser } from '../../constants/getTerminalWaitingTime'

const se = [
  {
    text: `Single Move: 4:00 PM
    Double Move : 3:30 PM
    Any Reefer Moves: 3:00 PM`,
  },
  {
    text: "Empties/Dry Loads/Reefer Loads/Out of Gauge (OOG) Loads - 4:00 PM",
  },
  {
    text:
      "Double moves/Reefer receiving to delivery : until 3:30 PM Single moves",
  },
  {
    text:
      "Hazardous Cargo Receiving: 4:00 PM Reefer Processing Single Move Empty Delivery",
  },
  {
    text: "Double Moves/ Reefer Processing/ Hazardous Cargo Receiving",
  },
  {
    text: "Double Moves/ Reefer Processing/ Hazardous Cargo Receiving",
  },
];

const TerminalBoard = (props) => {
  const h = useWindowSize().height;
  const w = useWindowSize().width;
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(!false);
  const [setState_id, set_State] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);
  const [height, setHeight] = useState("auto");
  const [seltectedRegion_Name, setRegionName] = useState("")
  const [animateHeight, setAnimateHeight] = useState(0);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadImg, setLoadImg] = useState(true)
  const [loadTerminalImg, setLoadTerminalImg] = useState(true)
  const [error, setError] = useState(false);
  const [newsCheck, setNewsCheck] = useState(false);
  const [idState, setIdState] = useState()
  const [idRegion, setIdRegion] = useState()
  const [showIndex, setShowIndex] = useState()
  const [iconVisible, setIconVisible] = useState(true)
  const router = useRouter()
  const { query } = useRouter();

  const { terminalBoard, isLoading, onErorr, resultWeather } = useSelector(
    (state) => state.reducer
  );
  

  var reducerDetails = useSelector(state => state.reducer.stateDetails)
  var newReducer = useSelector(state => state.reducer.arrayDetails)
  const value = reducerDetails[showIndex]?.regions.findIndex(x => x._id.toString() === localStorage.regionId)
  var tooltipValue = reducerDetails[showIndex]?.regions[value]?.region_name ? reducerDetails[showIndex]?.regions[value]?.region_name : "POrt"

  useEffect(() => {
    if (reducerDetails.length > 0) {
      var new_state_id = localStorage.getItem("stateId")
      let newIndex = reducerDetails.findIndex(x => x._id == new_state_id)
      set_State(newIndex)
      setShowIndex(newIndex)
      setIdState(localStorage.getItem("stateId"))
      setIdRegion(localStorage.getItem("regionId"))
      setRegionName(localStorage.getItem("regionName"))
    }
  }, [reducerDetails])


  useEffect(() => {
    let regionId = localStorage?.getItem("regionId");
    if (!regionId) {
      let splitId = "60424bb52e2e837bd720e10d"
      const lat = "40.7128";
      const lng = "-74.006";
      dispatch(terminalBoardAction(splitId, lat, lng));
      dispatch(stateAction())
      localStorage.setItem("regionId", "60424bb52e2e837bd720e10d")
      localStorage.setItem("stateId", "6163d8f5e52a1549856dcc04")
      localStorage.setItem("regionName", "Port of NJ | NY")
      setRegionName("Port of NJ | NY")
      setIdState("6163d8f5e52a1549856dcc04")
      setIdRegion("60424bb52e2e837bd720e10d")
    }
    else {
      let urlLink = window.location.href
      let splitId = urlLink.split("=")[1] || regionId
      const lat = "40.7128";
      const lng = "-74.006";
      var id_details = query.id
      setIdRegion(splitId)
      // isInternetConnected(router) &&
      dispatch(terminalBoardAction(splitId, lat, lng));
      // isInternetConnected(router) &&
      dispatch(stateAction())
    }
    return () => {
      null;
    };
  }, []);

  var settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    swipeToSlide: true,
    autoplay: true,
    nextArrow: <CarouselArrow direction="right" isIconVisible={iconVisible} />,
    prevArrow: <CarouselArrow direction="left" isIconVisible={iconVisible} />,
    autoplaySpeed: 5000,
    cssEase: "ease-out",
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 3000,
          autoplay: true,
          autoplaySpeed: 5000,
          swipeToSlide: true,
          cssEase: "ease-out",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 3000,
          autoplay: true,
          autoplaySpeed: 5000,
          swipeToSlide: true,
          cssEase: "ease-out",
        },
      },
    ],
  };

  const showValue = (item, index) => {
    setIdState(item?._id)
    set_State(index)
  }

  const getRegionName = () => {
    const matchIndex = reducerDetails[showIndex]?.regions.findIndex(x => x._id.toString() === localStorage.regionId)
    return (reducerDetails[showIndex]?.regions[matchIndex]?.region_name ? reducerDetails[showIndex]?.regions[matchIndex]?.region_name : "Port of NJ | NY")
  }

  const showValue1 = (x) => {
    router.replace({
      pathname: "/state/terminalboard",
      query: {
        id: x?._id,
      }
    })
    setIdRegion(x?._id)
    setRegionName(x?.region_name)
    localStorage.setItem("regionId", x?._id)
    localStorage.setItem("stateId", reducerDetails[setState_id]?._id)
    localStorage.setItem("regionName", x?.region_name)
    setShowIndex(setState_id)
    setTimeout(() => {
      window.location.reload()
    }, 100);
    setIdState(localStorage.getItem("stateId"))
    setIdRegion(localStorage.getItem("regionId"))
  }

  const openModal = () => {
    setModalOpen(!modalOpen)
    // setIdState(localStorage.stateId)
    // setIdRegion(localStorage.regionId)
    // setRegion(newIndex2)
  }

  useEffect(() => {
    setHeight(h);
  }, [h]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(true);
      setCounter(0);
      setError(false);
      setNewsCheck(false);
      if (onErorr) {
        setError(true);
        const errorTimer = setTimeout(() => {
          const regionId = "60424bb52e2e837bd720e10d";
          const lat = "40.7128";
          const lng = "-74.006";
          dispatch(terminalBoardAction(idRegion, lat, lng));
          // dispatch(terminalBoardAction(regionId));
          setCounter(0);
          setLoading(false);
          setError(false);
        }, appconstants.appConstants.errorTimer);
        return () => {
          clearTimeout(errorTimer);
        };
      } else {
        const successTimer = setTimeout(() => {
          const regionId = "60424bb52e2e837bd720e10d";
          const lat = "40.7128";
          const lng = "-74.006";
          console.log(idRegion,'idRegion');
          dispatch(terminalBoardAction(idRegion, lat, lng));
          setCounter(0);
          setLoading(false);
          setError(false);
        }, appconstants.appConstants.successTimer);
        return () => {
          clearTimeout(successTimer);
        };
      }
    }, appconstants.appConstants.contentLoaderTimer);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, [isLoading]);
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        if (counter >= terminalBoard?.all_news?.length - 1  && animateHeight == 0) {
          handleToggle();
        }
        else {
          setCounter(counter + 1);
          // setExpand(true);
      }
      }, appconstants.appConstants.newsTimer);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      null; // unmount the component
    };
  }, [loading, newsCheck,counter,terminalBoard]);


  useEffect(() => {
    if (loading) {
      if (!expand) {
        const exp = setTimeout(() => {
          handleToggle();
        }, appconstants.appConstants.terminalExpandTimer);
        return () => {
          clearTimeout(exp);
        };
      }
    }
    return () => {
      null; // unmount the componnet
    };
  }, [expand, loading, newsCheck]);

  const handleToggle = () => {
    // alert(h+"m"+w)
    setAnimateHeight(
      animateHeight === 0
        ? w < 800
          ? (h * 0.27) - (w * 0.028)
          : w < 860
            ? (h * 0.31) - (w * 0.028)
            : w < 950
              ? (h * 0.33) - (w * 0.028)
              : w < 1100
                ? (h * 0.36) - (w * 0.028)
                : w === 1280
                  ? (h * 0.453) - (w * 0.028)
                  : w === 1360
                    ? (h * 0.40) - (w * 0.015)
                    : w === 1366
                      ? ((h < 660) ? (h * 0.395) : ((h * 0.47) - (w * 0.028)))
                      : w < 1366
                        ? (h * 0.39) - (w * 0.028)
                        : w < 1400
                          ? (h * 0.39) - (w * 0.025)
                          : w < 1450
                            ? (h * 0.47) - (w * 0.025)

                            // Maninder Sir's code
                            : w < 1600
                              ? (h * 0.42) - (w * 0.025)
                              : w <= 1600
                                ? (h * 0.45)
                                : w < 1650
                                  ? (h * 0.47) - (w * 0.02)
                                  : w < 1750
                                    ? (h * 0.46) - (w * 0.02)
                                    : w < 1800
                                      ? (h * 0.47) - (w * 0.02)
                                      : w < 2000
                                        ? (h * 0.48) - (w * 0.02)
                                        : w < 2700
                                          ? (h * 0.51) - (w * 0.02)
                                          : w < 4000
                                            ? (h * 0.55) - (w * 0.02)
                                            : w < 5400
                                              ? (h * 0.60) - (w * 0.02)
                                              : (h * 0.63) - (w * 0.02)
        : 0
    );
  };

  const getHeight = () => {
    return w < 800
      ? h * 0.27
      : w < 860
        ? h * 0.31
        : w < 950
          ? h * 0.33
          : w < 1100
            ? h * 0.36
            : w < 1400
              ? h * 0.39
              : w < 1450
                ? h * 0.50
                : w < 1600
                  ? h * 0.43
                  : w < 1650
                    ? h * 0.44
                    : w < 1750
                      ? h * 0.46
                      : w < 1800
                        ? h * 0.47
                        : w < 2000
                          ? h * 0.48
                          : w < 2700
                            ? h * 0.51
                            : w < 4000
                              ? h * 0.55
                              : w < 5400
                                ? h * 0.60
                                : h * 0.63
  }

  const handleExpandEnd = (props) => {
    if (props?.newHeight === 0) {
      setCounter(0);
      setExpand(true);
      if (
        terminalBoard?.all_news?.length == 1 ||
        terminalBoard?.all_news?.length == 0
      ) {
        setNewsCheck(!newsCheck);
      }
    }
  };

  const handleExpandStart = (props) => {
    if (props?.newHeight > 0) {
      setExpand(false);
      setCounter(0);
      if (
        terminalBoard?.all_news?.length == 1 ||
        terminalBoard?.all_news?.length == 0
      ) {
        setNewsCheck(!newsCheck);
      }
    }
  };

  const changetheView = () => {
    setIconVisible(true)
    setTimeout(() => {
      setIconVisible(false)
    }, 9000);
  }

  const convertTemp = (temp) => {
    return temp
  };

  var settings1 = {
    //   dots: true,
    // infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4500,
    draggable: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    easing: "bounce",
    // nextArrow: <carouselArrow direction="right" />,
    // prevArrow: <carouselArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 3000,
          easing: "bounce",
          autoplay: true,
          autoplaySpeed: 4500,
          draggable: false,
          pauseOnHover: false,
          pauseOnFocus: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 3000,
          easing: "bounce",
          autoplay: true,
          autoplaySpeed: 4500,
          draggable: false,
          pauseOnHover: false,
          pauseOnFocus: false,
        },
      },
    ],
  };

  
  return (
    <Layout title={"FR8 | Terminal Board"}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal
        className={'screenActive'}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
      >
        <>
          <div className="modalState">
            <img style={{ position: 'absolute', right: '2.3vh', top: '-1.5vh' }} src={appImages.topBar} />
            <div className='modalHeader'>
              STATE
            </div>
            <div className="modalStateInner">
              <div className="modal-state" style={{ padding: "4%" }}>
                {reducerDetails.map((item, index) => {
                  if (item._id != "61603a1e318268302c99993e") {
                    return (
                      <div className="state" style={{ color: idState === item._id ? "#ffffff" : "#000000" }}
                        onClick={() => showValue(item, index)}
                      >
                        {item?.short_name}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
          <div className="modalRegion">
            <img alt="" style={{ position: 'absolute', top: '1.5vh', left: '-1.4vh' }} src={appImages.leftBar} />
            <div className='modalHeader'>
              REGION
            </div>
            <div className="modalStateInner">
              <div className="modal-state" style={{ padding: "4%" }}>
                {reducerDetails[setState_id]?.regions.length > 0 ?
                  reducerDetails[setState_id]?.regions?.map((x, index) => {
                    return (
                      <div className="state" style={{ color: idRegion === x._id ? "#ffffff" : "#000000" }}
                        onClick={() => showValue1(x)}>
                        {x.region_name}
                      </div>
                    )
                  })
                  :
                  <div className="state">
                    {"N/A"}
                  </div>
                }
              </div>
            </div>
          </div>
        </>
      </Modal>
      <Navigation />
      <section
        onMouseMove={() => changetheView()}
        onClick={() => changetheView()}
        className={`slider pb-3 sectionTopTerminalBoardArea
       `}
      >
        <div
          className="container-fluid adjust screenActive"
        >
          {
            <div className="terminalAreaHeader">
              <span
                onClick={openModal}
                className="terminalAreaName"
                style={{
                  flexDirection: "row",
                  display: "inline-block",
                  zIndex: 1000,
                  fontSize: "20px",
                  cursor: "pointer",
                  width: "15%",
                  textOverflow: "ellipsis",
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {
                  modalOpen ? seltectedRegion_Name : <Tooltip placement="topLeft" color={"#3387ed"} title={seltectedRegion_Name}>
                    {seltectedRegion_Name}
                  </Tooltip>
                }
              </span>
              {seltectedRegion_Name.length > 0 &&
                <div className="arrow-down"
                  style={{ marginTop: "-2px", marginLeft: "-0.95%", zIndex: 1000, marginLeft: "-1.8%", width: "40%", }}>
                  <img  onClick={openModal} className="down-arrow" src={appImages.downarrow} style={{ width: "4%", cursor: "pointer" }} ></img>
                </div>
              }
              <div className="terminalAreaHeaderSub">
                <p className="terminalAreaTime">
                  {moment()
                    .utcOffset(appconstants.appConstants.timeZoneUsa)
                    .format(" HH:mm A ")}
                </p>
                <div className="terminalAreaHeaderTempToday">
                  <div>
                    <p
                      className="terminalAreaTimeToday"
                      style={{ minWidth: "50px" }}
                    >
                      Today
                    </p>
                  </div>
                  <div className="tempDiv">
                    <img
                      src={appImages.sun}
                      // src={
                      //   !resultWeather[0]?.isDaytime
                      //     ? resultWeather[1]?.icon
                      //     : resultWeather[0]?.icon
                      // }
                      style={{
                        width: "40px",
                        height: "40px",

                        marginRight: "10px",
                      }}
                      className="sun"
                    />
                    <pre className="terminalAreaTimeToday">
                      {!resultWeather[0]?.isDaytime
                        ? convertTemp(resultWeather[1]?.temperature)
                        : convertTemp(resultWeather[0]?.temperature)}
                      <sup>°</sup>
                    </pre>
                  </div>
                </div>
                <div className="terminalAreaHeaderTempToday">
                  <div>
                    <p className="terminalAreaTimeToday">Tonight</p>
                  </div>
                  <div className="tempDiv" style={{ marginLeft: "-1vw" }}>
                    <div>
                      <img
                        src={appImages.moon}
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                        className="moon"
                      />
                    </div>
                    <div>
                      <pre className="terminalAreaTimeToday">
                        {!resultWeather[0]?.isDaytime
                          ? convertTemp(resultWeather[2]?.temperature)
                          : convertTemp(resultWeather[1]?.temperature)}
                        <sup>°</sup>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="container-fluid adjust screenActive">
          {!error && (
            <div
              className="row news"
              style={{
                marginTop: "0.5vw",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {loading ? (
                terminalBoard?.all_news?.length > 0 && (
                  <>
                    <div className="col-sm-3">
                      { terminalBoard?.all_news[counter]?.media && (
                      <img
                        src={
                          appconstants.baseUrlMedia +
                          terminalBoard?.all_news[counter]?.media
                        }
                        style={{
                          display: !expand ? "none" : "flex",
                          borderRadius: "1vw",
                          height: "16vw",
                          width: "16vw",
                        }}
                        className="animate-flicker terminalAreaImage"
                      />
                      )
}
                    </div>
                    <div className="col-sm-9">
                      <div className="text-img">
                        {expand && (
                          <>
                            <div
                              className="newsTextHeading animate-flicker"
                              dangerouslySetInnerHTML={{
                                __html: terminalBoard?.all_news[counter]?.title,
                              }}
                              style={{ overflow: "hidden" }}
                            />
                            <div
                              className="newsText animate-flicker"
                              dangerouslySetInnerHTML={{
                                __html:
                                  terminalBoard?.all_news[counter]?.description,
                              }}
                              style={{ overflow: "hidden" }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )
              ) : (
                <>
                  <ContentLoaderCustom />
                  <ContentLoaderCustom terminal={1} />
                </>
              )}
            </div>
          )}
          {error && (
            <div>
              <span></span>
            </div>
          )}
        </div>
        {loading && !error && (
          <div
            className="screenActive"
            style={{
              // background:'red',
              position: "absolute",
              alignItems: "flex-end",
              display: "flex",
              left: 0,
              margin: "0 auto",
              height: "100vh",
              bottom: "2.5vw",
              width: "100%",
            }}
          >
            {terminalBoard?.terminals?.length > 5 ? (
              <Slider {...settings} className="terminalBoard">
                {terminalBoard?.terminals.map((img, index) => (
                  <div key={index}>
                    {height ? (
                      <div
                        style={{
                          marginLeft: 7,
                          marginRight: 7,
                          borderRadius: w * 0.015,
                        }}
                        className="animateHeight"
                      >
                        <div
                          style={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "1vh",
                              marginTop: "1vh",
                            }}
                          >
                            <img
                              src={
                                img?.terminal_board_logo
                                  ? appconstants.baseUrlMedia +
                                  img?.terminal_board_logo
                                  : appImages.pin
                              }
                              className="terminalImageLogo"
                              style={{
                                height: "12vh",
                                width: "12vw",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </div>
                        <AnimateHeight
                          id="example-panel"
                          height={animateHeight}
                          duration={2000}
                          style={{
                            // alignItems: "center",
                            // justifyContent: "center",
                            // display: "flex",
                          }}
                          animateOpacity={true}
                          easing="ease-in-out"
                          onAnimationEnd={(props) => {
                            handleExpandEnd(props);
                          }}
                          onAnimationStart={(props) => {
                            handleExpandStart(props);
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              // alignItems: "center",
                              flexDirection: "column",
                              display: "flex",
                            }}
                          >
                            {img.terminal_image_type && img.terminal_image_type == "url"?
                                <Slider {...settings1} >
                                  {
                                    img?.terminal_url?.map((img, urlIndex) => {

                                      return (
                                        <div key={urlIndex}
                                        >
                                          <CarouselImage
                                            img={`${img}`}
                                          />
                                        </div>
                                      )
                                    })}
                                </Slider>
                                :<img
                                // key={Date.now()}
                                onLoad={() => setLoadTerminalImg(false)}
                                src={
                                  appconstants.baseUrlMedia + img.terminal_logo
                                }
                                className="terminalImage"
                              />
                            }

                            <div
                              style={{
                                marginTop: "0.8vw",
                                marginBottom: "0.5vw",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: 'center',
                                // background:"red",
                                // height: "70%",
                                // margin: "auto",
                                alignItems: "center",
                              }}
                            >
                              <p
                                className="terminalName"
                                style={{
                                  fontSize: img.is24Available ? "2.7vh" : "2.7vh",
                                  // lineHeight: "4vw",
                                  paddingLeft: height * 0.005,
                                  paddingRight: height * 0.005,
                                }}
                              >
                                {img.is24Available
                                  ? "Open 24/7"
                                  : `${moment(img.open_time)
                                    .utcOffset(
                                      appconstants.appConstants.timeZoneUsa
                                    )
                                    .format("hh:mm A")} - ${moment(
                                      img.close_time
                                    )
                                      .utcOffset(
                                        appconstants.appConstants.timeZoneUsa
                                      )
                                      .format("hh:mm A")}`}
                              </p>
                            </div>
                            {getClosingSoonCheck(img) ?
                              <div
                                style={{
                                  marginTop: "0.1vw",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: 'center',
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  className="terminalName"
                                  style={{
                                    fontSize: "1.8vh",
                                    paddingLeft: height * 0.005,
                                    paddingRight: height * 0.005,
                                  }}
                                >
                                  {"(Closing Soon)"}
                                </p>
                              </div>
                              :
                              <div
                                style={{
                                  marginTop: "1.3vw",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: 'center',
                                  alignItems: "center",
                                  // backgroundColor:'red'
                                }}
                              />
                            }
                            <>
                              <div
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: 'center',
                                  alignItems: "center",
                                  // backgroundColor:'red'
                                }}
                              >
                                <img alt="arrowLeft" src={"../images/user.png"} style={{
                                  height: "1.3vw", width: "1.3vw",
                                  marginTop: w === 1280 ? '0.17vw' : "0.67vw"
                                }} />
                                <p
                                  className="terminalName"
                                  style={{
                                    fontSize: w === 1280 ? "2vw" : "3vw",
                                    paddingLeft: height * 0.005,
                                    paddingRight: height * 0.005,
                                  }}
                                >
                                  {getCurrentUser(img, img.total_users)}
                                </p>
                              </div>
                            </>
                          </div>
                        </AnimateHeight>
                        <div
                          style={{
                            marginTop: "0.02vw",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            height: "100%",
                            flexDirection: "column",
                          }}
                        >
                          <p
                            className="terminalName"
                            style={{
                              fontSize: "3vh",
                              // lineHeight: "2.3vw",
                              paddingLeft: height * 0.005,
                              paddingRight: height * 0.005,
                            }}
                          >
                            Avg. Wait Time
                          </p>
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "1vw",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                            }}
                          >
                            <span
                              className="terminalName"
                              style={{
                                fontSize: w === 1280 ? "2vw" : "3vw",
                                paddingLeft: height * 0.005,
                                paddingRight: height * 0.005,
                                marginBottom: w === 1280 ? "-0.3vw" : "-0.6vw",
                              }}
                            >
                              {getTerminalWaitingTime(img)}
                              {/* {parseInt(img?.avg_total_stopage_time_in_minutes)} */}
                            </span>
                            <span
                              className="terminalName"
                              style={{
                                fontSize: "1.5vw",
                                paddingLeft: height * 0.005,
                                paddingRight: height * 0.005,
                              }}
                            >
                              Min
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span>132135</span>
                    )}
                  </div>
                ))}
              </Slider>
            ) : (
              terminalBoard?.terminals?.length > 0 ?
                <div className="terminalBoard"
                  style={{ display: "flex", width: "100%", alignItems: 'center', justifyContent: "center" }}>
                  {terminalBoard?.terminals.map((img, index) => {

                    return (
                      <div key={index}>
                        {height ? (
                          <div
                            style={{
                              marginLeft: 7,
                              marginRight: 7,
                              borderRadius: w * 0.015,
                              width: "18vw"
                            }}
                            className="animateHeight"
                          >
                            <div
                              style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "1vh",
                                  marginTop: "1vh",
                                }}
                              >
                                <img
                                  src={
                                    img?.terminal_board_logo
                                      ? appconstants.baseUrlMedia +
                                      img?.terminal_board_logo
                                      : appImages.pin
                                  }
                                  className="terminalImageLogo"
                                  style={{
                                    height: "12vh",
                                    width: "12vw",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            </div>
                            <AnimateHeight
                              id="example-panel"
                              height={animateHeight}
                              // height={getHeight()}
                              duration={2000}
                              style={{
                                // alignItems: "center",
                                // justifyContent: "center",
                                // display: "flex",
                              }}
                              animateOpacity={true}
                              easing="ease-in-out"
                              onAnimationEnd={(props) => {
                                handleExpandEnd(props);
                              }}
                              onAnimationStart={(props) => {
                                handleExpandStart(props);
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  // alignItems: "center",
                                  flexDirection: "column",
                                  display: "flex",
                                }}
                              >
                                {
                                  img.terminal_image_type == "url" ?
                                    <Slider {...settings1} >
                                      {img?.terminal_url.map((imgData, urlIndex1) => {
                                        return (
                                          <div key={urlIndex1}
                                          >
                                            <CarouselImage
                                              img={`${imgData}`}
                                            />
                                          </div>
                                        )
                                      })}
                                    </Slider>
                                    :
                                    <div>
                                      <img
                                          src={
                                          `${appconstants.baseUrlMedia + img.terminal_logo}`
                                        }
                                        className="terminalImage"
                                      />
                                    </div>
                                }
                                <div
                                  style={{
                                    marginTop: "0.8vw",
                                    marginBottom: w === 1280 ? "0.1vw" : "0.8vw",
                                    display: "flex",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // backgroundColor:'red'
                                  }}
                                >
                                  <p
                                    className="terminalName"
                                    style={{
                                      fontSize: "3vh",
                                      // fontSize: "2.7vh",
                                      // lineHeight: "4vw",
                                      paddingLeft: height * 0.005,
                                      paddingRight: height * 0.005,
                                    }}
                                  >
                                    {img.is24Available
                                      ? "Open 24/7"
                                      : `${moment(img.open_time)
                                        .utcOffset(
                                          appconstants.appConstants.timeZoneUsa
                                        )
                                        .format("hh:mm A")} - ${moment(
                                          img.close_time
                                        )
                                          .utcOffset(
                                            appconstants.appConstants.timeZoneUsa
                                          )
                                          .format("hh:mm A")}`}
                                  </p>
                                </div>
                                {getClosingSoonCheck(img) ?
                                  <div
                                    style={{
                                      marginTop: "0.1vw",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: 'center',
                                      alignItems: "center",
                                    }}
                                  >
                                    <p
                                      className="terminalName"
                                      style={{
                                        fontSize: "1.8vh",
                                        paddingLeft: height * 0.005,
                                        paddingRight: height * 0.005,
                                      }}
                                    >
                                      {"(Closing Soon)"}
                                    </p>
                                  </div>
                                  :
                                  <div
                                    style={{
                                      marginTop: "1.3vw",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: 'center',
                                      alignItems: "center",
                                    }}
                                  />
                                }
                                <>
                                  <div
                                    style={{
                                      height: "100%",
                                      display: "flex",
                                      justifyContent: 'center',
                                      alignItems: "center",
                                      marginTop:w < 1367 ? "-1.5vh":0
                                    }}
                                  >
                                    <img alt="arrowLeft" src={"../images/user.png"} style={{ height: "1.3vw", width: "1.3vw", marginTop: "0.70vw" }} />
                                    <p
                                      className="terminalName"
                                      style={{
                                        fontSize: "3vw",
                                        paddingLeft: height * 0.005,
                                        paddingRight: height * 0.005,
                                      }}
                                    >
                                      {getCurrentUser(img, img.total_users)}
                                    </p>
                                  </div>
                                </>
                              </div>
                            </AnimateHeight>
                            <div
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                height: "100%",
                                flexDirection: "column",
                              }}
                            >
                              <p
                                className="terminalName"
                                style={{
                                  fontSize: "3vh",
                                  // lineHeight: "2.3vw",
                                  paddingLeft: height * 0.005,
                                  paddingRight: height * 0.005,
                                }}
                              >
                                Avg. Wait Time
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "0.25vw",
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <span
                                  className="terminalName"
                                  style={{
                                    fontSize: "3vw",
                                    paddingLeft: height * 0.005,
                                    paddingRight: height * 0.005,
                                    marginBottom: "-0.6vw",
                                  }}
                                >
                                  {getTerminalWaitingTime(img)}
                                  {/* {parseInt(img?.avg_total_stopage_time_in_minutes)} */}
                                </span>
                                <span
                                  className="terminalName"
                                  style={{
                                    fontSize: "1.5vw",
                                    paddingLeft: height * 0.005,
                                    paddingRight: height * 0.005,
                                  }}
                                >
                                  Min
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span>132135</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                :
                <div>
                </div>
            )
            }
          </div>
        )}
        <div className="disclaimerStyle " style={{ color: "#fff", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div className="col-sm-10 d-flex justify-content-end" style={{ fontSize: "1.5vw" }} >
            Estimated wait times are continually updated to ensure you have the latest information.
          </div>
          <div className="col-sm d-flex justify-content-end" style={{ fontSize: "1.5vw" }} >
            FR8®
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withRouter(TerminalBoard);
