import Navigation from "../components/navigation";
import routes from "../constants/routes";
import appImages from "../constants/appImages";
import Slider from "react-slick";
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
export default function AboutUs() {
  return (
    <Layout title={"FR8 | About Us"}>
      <Navigation />
      <section className="slider pb-3" style={{ height: "100%" }}>
        <div className="container-fluid adjust">
          <div className="row">
            <div
              className="col-sm-6 slideInRight  wow delay-1"
              style={{ marginTop: -10 }}
            >
              <p>
                The Fr8 App Helps Owner Operators, Truck Drivers, Dispatchers,
                Terminals, Warehouses And Many More In The Supply Chain Industry
                Become More Efficient While Working Together To Build A Better
                Connection.
                <br />
                <br />
                Wait Times Starts With Owner Operators And Truck Drivers, But It
                Can End With Everyone Working Together, Too.
                <br />
                <br />
                The Fr8 Team Developed Practical Solutions That Empower People
                To Make Better Choices, From Making The Proper Decisions To
                Better Routing Practices, To Dispatching At The Right Time, To
                Sharing Real Time Wait Times So Everyone Knows What To Expect.
                <br />
                <br />
                We’re a growing community of people trying to get more done and
                growing with technology.
                <br />
                <br />
                Fr8 App users include — truck drivers, port terminals, Rail
                Terminals, warehouses, shippers, map editors, beta testers —
                contribute to our real-time, live updates, and depend on each
                other to becoming efficient with fewer bottlenecking.
                <br />
                <br />
                We’re committed to the greater good of the supply chain industry
                and a greener Earth.
                <br />
                <br />
                We look to partner with port and rail terminals, transportation
                authorities, trucking companies, and many in the supply chain
                business to put our community-driven data to work for anyone
                making cargo transportation better for everyone.
                <br />
                <br />
                We Provide Telecommunication And Social Networking Services To
                Our Customers By Allowing Them To Engage In Messaging,
                Photo-Sharing, Video-Sharing, Broadcasting, And To Otherwise
                Transmitting Data And Information Among Themselves Through Fr8
                App. In Addition, We Provide Platforms For Our Customers To
                Advertise And Market Their Own Business Through The App.
              </p>
            </div>

            <div className="col-sm-6 text-center iphone-responsive bottom-animate wow">
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

                <div className=" rightAlign hide-store" style={{}}>
                  <h3
                    style={{
                      fontSize: 18,
                      color: "#fff",
                      marginBottom: "26px",
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
                    className=""
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
            </div>
          </div>
          <div
            className=" socials"
            style={{
              display: "none",
            }}
          >
            <h3
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
    </Layout>
  );
}
