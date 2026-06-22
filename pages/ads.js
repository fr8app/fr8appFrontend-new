import Navigation from "../components/navigation";
import Layout from "../components/layout";
import React, { useState } from "react";

export default function App() {
  const [pinAd, selectPin] = useState(false);
  const [searchAd, selectSearchAd] = useState(true);
  const [takeOverAd, selectTakeOver] = useState(false);

  const tabClicked = (key) => {
    if (key == "pinAd") {
      selectPin(true);
      selectSearchAd(false);
      selectTakeOver(false);
    }
    if (key == "searchAd") {
      selectPin(false);
      selectSearchAd(true);
      selectTakeOver(false);
    }
    if (key == "takeOverAd") {
      selectPin(false);
      selectSearchAd(false);
      selectTakeOver(true);
    }
  };

  return (
    <Layout title={"FR8 | Ads"}>
      <Navigation />
      <div style={{ backgroundColor: "#1c1c1c" }}>
        <section class="sliderNew">
          <div class="container-fluid adjust">
            <div class="row">
              <div class="col-sm-6 slideInRight  wow delay-1">
                <h2>Advertise your </h2>
                <h2> Business on</h2>
                <h2> the FR8 map</h2>
                <div class="mt_top">
                  <p class="check_line">
                    <span>
                      <img src="images/tick.png" alt="tick" />
                    </span>
                    Reach more than 1 Million monthly active users.
                  </p>
                  <p class="check_line">
                    <span>
                      <img src="images/tick.png" alt="tick" />
                    </span>
                    Track performance in real-time.
                  </p>
                  <p class="check_line">
                    <span>
                      <img src="images/tick.png" alt="tick" />
                    </span>
                    Only pay for ads that show.
                  </p>
                </div>
              </div>
              <div class="col-sm-6 text-center">
                <div class="Mobile_1 slidetilUp wow">
                  <img src="images/MOBILE AAP SCREEN 1.png" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="sliderNew how_work">
          <div class="container-fluid adjust">
            <div class="">
              <h2>How it works</h2>
              <p>Get started in three easy steps</p>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="dotted_bg">
                  <img src="images/location.png" alt="location" />
                  {/* <!-- <img src="images/dashed_border.png" alt="dashed_border"> --> */}
                </div>
                <div>
                  <div class="create_add">
                    <img src="images/trminalicon.png" alt="trminalicon" />
                    <h4>Create your ad </h4>
                    <p>Tell us about your business and preview your ad.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="dotted_bg">
                  <img src="images/location2.png" alt="location2" />
                  {/* <!-- <img src="images/dashed_border.png" alt="dashed_border"> --> */}
                </div>
                <div>
                  <div class="create_add">
                    <img src="images/budget.png" alt="budget" />
                    <h4>Set your budget </h4>
                    <p>You decide how much you want to spend each day.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="dotted_bg">
                  <img src="images/location3.png" alt="location3" />
                  {/* <!-- <img src="images/dashed_border.png" alt="dashed_border"> --> */}
                </div>
                <div>
                  <div class="create_add">
                    <img src="images/go-live.png" alt="go live" />
                    <h4>Go live</h4>
                    <p>Nearby customers will see your ads on the Waze map.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          class="sliderNew how_work three_ad_format"
          style={{
            marginBottom: 0,
            paddingBottom: 30,
            backgroundImage: "none",
          }}
        >
          <div class="container-fluid adjust">
            <div class="text-center">
              <h2 style={{ fontFamily: "arial", paddingTop: 46 }}>
                3 Ad Formats
              </h2>
            </div>
            {/* <nav> */}
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class={`nav-link border-radius ${pinAd && "active"}`}
                  onClick={() => tabClicked("pinAd")}
                  id="home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Pin Ad
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={`nav-link  ${searchAd && "active"}`}
                  id="profile-tab"
                  onClick={() => tabClicked("searchAd")}
                  data-toggle="tab"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Search Ad
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={`nav-link border-radius-right ${
                    takeOverAd && "active"
                  }`}
                  onClick={() => tabClicked("takeOverAd")}
                  id="contact-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style={{ paddingRight: 35 }}
                >
                  Takeover Ad
                </a>
              </li>
            </ul>
          </div>
        </section>
        <section
          class="sliderNew how_work three_ad_format"
          style={{ marginBottom: 0, paddingBottom: 30 }}
        >
          <div class="tab-content table_remove " id="myTabContent">
            {pinAd && (
              <div
                class={`tab-pane fade ${pinAd && "active show"}`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="row">
                  <div className="content_align">
                    <div class="col-md-6">
                      <div class="search_img">
                        <img src="images/pin (2).png" alt="PIN AD" />
                      </div>
                    </div>
                    <div class="col-md-6 remove">
                      <div className="imageViewText">
                        <p class="search_para">
                          Like a store sign, Pins inform and remind customers
                          that your business is on or near their route.
                        </p>
                        <div class="border-bottom"></div>
                        <div class="know_more">
                          <button type="button">Know More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {searchAd && (
              <div
                class={`tab-pane fade ${searchAd && "active show"}`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div class="row">
                  <div className="content_align">
                    <div class="col-md-6">
                      <div class="search_img">
                        <img
                          src="images/SEARCH TERMINAL.png"
                          alt="SEARCH TERMINAL"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 remove">
                      <div className="imageViewText">
                        <p class="search_para">
                          Search helps you be top of mind when customers browse
                          for businesses like yours on FR8.
                        </p>
                        <div class="border-bottom"></div>
                        <div class="know_more">
                          <button type="button">Know More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {takeOverAd && (
              <div
                class={`tab-pane fade ${takeOverAd && "active show"}`}
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div class="row">
                  <div className="content_align">
                    <div class="col-md-6">
                      <div class="search_img">
                        <img
                          src="images/pin (2).png"
                          alt="TAKEOVER AD TERMINAL"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 remove">
                      {/* //  style={{display:'table',height:'100vh'}} > */}
                      {/* <div  style={{display:'table-cell',verticalAlign:'middle'}}> */}
                      <div className="imageViewText">
                        <p class="search_para">
                          The Takeover ad is a digital billboard. It is shown
                          when vehicles are at a complete stop to prompt
                          awareness and action at key moments.
                        </p>
                        <div class="border-bottom"></div>
                        <div class="know_more">
                          <button type="button">Know More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* </div> */}
          </div>
        </section>
      </div>
    </Layout>
  );
}
