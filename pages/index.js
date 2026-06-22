import routes from "../constants/routes";
import Navigation from "../components/navigation";
import Slider from "react-slick";
import appImages from "../constants/appImages";
import Layout from "../components/layout";

const images = [
  {
    image: appImages.carosoul1,
  },
  {
    image: appImages.carosoul2,
  },
  {
    image: appImages.carosoul3,
  },
];
var settings = {
  infinite: true,
  speed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  autoplay: true,
  fade: true,
  autoplaySpeed: 4000,
  nextArrow: <></>,
  prevArrow: <></>,
  responsive: [
    {
      breakpoint: 1420,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
        speed: 4000,
        autoplay: true,
        fade: true,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
        speed: 4000,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
      },
    },
  ],
};
export default function App() {
  return (
    <Layout title={"FR8 | Home"}>
      <Navigation />

      <section className="slider" style={{ height: "100%", width: "100" }}>
        <video
          aria-expanded
          height="100%"
          width="100%"
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            left: 0,
            bottom: 0,
            objectFit: "cover",
            width: "100%",
          }}
          autoPlay
          loop={true}
          muted
        >
          <source src="/images/Video-RL.mov" type="video/mp4" />
        </video>
        <div className="container-fluid adjust">
          <div className="row">
            <div className="col-sm-6 slideInRight  wow delay-1">
              <div className="transparent">
                <h2>Wait Times Can Be Costly. </h2>
                <p>
                  Know What to expect, collect and share your in and out times
                  at any terminal in real-time. You can time stamp your wait
                  times at any terminal so that you can plan your visits to any
                  port or rail terminal by looking at the current wait times and
                  planning a more efficient trip. You can also share your
                  thoughts with the Freighting Community.
                </p>
              </div>
              <div className="buttonRow">
                <div
                  style={{
                    marginTop: "1.75vw",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 18,
                      color: "#fff",
                      marginTop: "1.75vw",
                      marginBottom: "1.75vw",
                      fontWeight: 600,
                    }}
                    className="frtext"
                  >
                    DOWNLOAD{" "}
                    <img
                      src="images/logo.png"
                      alt=""
                      className="imageLogo fr8logo"
                    />
                  </h3>
                  <div
                    className="social-icons responsive-icons hide-store"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a href={routes.appStore} target="blank">
                      <img src="images/app-store.png" alt="" />
                    </a>
                    <a href={routes.playStore} target="blank">
                      <img src="images/google-store.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 text-center iphone-responsive bottom-animate wow mobile-margin ">
              <div className="wows">
                <div className="iphone-frame">
                  <img
                    src="images/mobile211.png"
                    alt=""
                    className="imageLogo"
                  />
                </div>
                <div className="phoneCarosal" id="slider1">
                  <Slider {...settings}>
                    {images.map((img, index) => (
                      <div key={index.toString()} className="carousel-item">
                        <img
                          id="myImg"
                          src={img.image}
                          height="458px"
                          className="carouselImage"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className="socials mobile-icons">
            <h3
              className="frtext"
              style={{
                fontSize: 18,
                color: "#fff",
                marginTop: "12px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              DOWNLOAD{" "}
              <img
                src="images/logo.png"
                alt=""
                className="imageLogo fr8logo"
                style={{ width: "unset" }}
              />
            </h3>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a href={routes.appStore} target="blank">
                <img
                  src="images/app-store.png"
                  alt=""
                  className="imageDownload smallbtn"
                />
              </a>
              <a href={routes.playStore} target="blank">
                <img
                  src="images/google-store.png"
                  alt=""
                  className="imageDownload smallbtn"
                />
              </a>
            </div>
          </div>
        </div>
       
      </section>
      <footer className="footer" style={{backgroundColor:'black'}} >
        <span>
          <div className="home-footer">
            <div className="new-footer"> <a target="_blank" href="/cookies">Cookies Policy</a></div>
            <div className="new-footer"> <div className="footer-line"></div></div>
            <div className="new-footer"> <a target="_blank" href="/privacy">Privacy Policy</a></div>
            <div className="new-footer"> <div className="footer-line"></div></div>
            <div className="new-footer"> <a target="_blank" href="/conditions">Terms & Conditions</a></div>
            <div className="new-footer"> <div className="footer-line"></div></div>
            <div className="new-footer"> <a href="/helpCenter">Help Center</a></div>
          </div>
        </span>
        <div className="footer-language-selector"></div>
      </footer>
    </Layout>
  );
}
