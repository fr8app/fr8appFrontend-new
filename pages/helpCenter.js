import { useRef, useState } from "react";
import Navigation from "../components/navigation";
import routes from "../constants/routes";
import appImages from "../constants/appImages";
import appconstants from "../constants/appconstants";
import Layout from "../components/layout";
// import { isInternetConnected } from "../../InternetConnection/InternetConnection";

const artcileQuestion = [
  {
    question: "What is the FR8 App?",
    answer: "The FR8 App was created to help bring the Freight Industry to Life, starting with crowd sourcing highly neglected but respected people, truck drivers. It collects data to improve supply chain by making information available in a way that is easy to understand and automatically assist with helpful solutions.The FR8 App is a trucking crowd-sourced wait time app that helps the Supply Chain with circumventing opportunities. The magic of the FR8 app is activated by each truck driver and in turn, helps the entire freight community understand what is going on in real time and empowers the cargo industry to plan ahead."
  },
  {
    question: "Where is FR8 App available?",
    answer: `The FR8 App is currently available in Port of New York and Port of New Jersey. We are working to expand our coverage rapidly to more Authorities. Please check the App for the latest Port, Rail and Airport Terminals we are available in.`,
  },
  {
    question: "What is FR8 App mission?",
    answer:
      "The FR8 App is on a mission to organize the Drayage and Trucking industry. We believe in public information for the good of supply chain. In being able to act on terminal information alerts in real time. In transparency that bonds and that empowers everyone in the supply chain community, from port authorities to truckers.\n\nWe believe in giving people a way to use their phones to plan shipments better, to prevent further delays, and to count on one another.\n\nAnd to create a cleaner world for each other, with each other.",
  },
  {
    question: "What is FR8 App privacy policy?",
    answer:
      "The FR8 App takes a number of steps to protect the data and privacy of its users. For more information, please read our current",
  },
  {
    question: "How does FR8 App work?",
    answer:
      "We knew there was a way to make it easier for truck drivers to plan ahead for delays – The FR8 App. It’s an absolute game changer! It’s a network built to evolve and assist with key KPI’s that optimizes supply chain.",
  },
];

const searchQuestion = [
  {
    question: "What is the FR8 App?",
  },
  {
    question: "Where is FR8 App available?",
  },
  {
    question: "What is FR8 App mission?",
  },
  {
    question: "What is FR8 App privacy policy?",
  },
  {
    question: "How does FR8 App work?",
  },
];

export default function Helpcenter() {
  const ref = useRef(null);
  const [selectedArtice, setSelectedArtice] = useState(0);
  const [showSearchBox, setshowSearchBox] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchQuestionArray, setSearchQuestionArray] = useState(
    searchQuestion
  );
  const checkSearch = (value) => {
    if (value.length > 2) {
      setshowSearchBox(true);
      var foundValue = searchQuestion.filter((obj) =>
        obj.question.toLowerCase().includes(value.toLowerCase())
      );
      setSearchQuestionArray(foundValue);
    } else {
      setshowSearchBox(false);
    }
  };
  const handleSearch = (ques) => {
    const index = searchQuestion.findIndex((obj) => obj.question == ques);
    setSelectedArtice(index);
    setshowSearchBox(false);
    document.getElementById("search_input").value = "";
  };

  return (
    <Layout title={"FR8 | Help Center"}>
      <Navigation />

      <div className="support_text">
        <div className="container">
          <div className="row">
            <div className="text_support">
              <h2>Help Center</h2>
              <p>Search for your question or pick a topic below</p>
              <div ref={ref}>
                <div className="text_line_new">
                  <input
                    id="search_input"
                    type="form-control"
                    autoComplete="off"
                    onChange={(e) => checkSearch(e?.target?.value)}
                  />
                  <img src={appImages.loupe} alt="" className="icons-new" />
                </div>
                <div
                  className="search_box_container"
                  style={{ display: showSearchBox ? "flex" : "none" }}
                >
                  <div className="search_box">
                    {searchQuestionArray.length > 0 ? (
                      <>
                        <span className="top_Article_suggestion">
                          Top article suggestions
                        </span>
                        {searchQuestionArray.map((item, index) => {
                          return (
                            <div key={index}>
                              <span
                                className="search_items"
                                key={index}
                                onClick={() => handleSearch(item?.question)}
                              >
                                {item?.question}
                              </span>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <span className="top_Article_suggestion">
                          No article found
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="support Text_next">
        <div className="container" style={{ backgroundColor: '#fff' }}>
          <div className="topic_next"></div>
        </div>
      </div>
      <div className="text_line pt-2" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div
                className={`responsive_toggle ${toggleMenu ? "current" : ""}`}
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <h3 className="collapsible-sidebar-title sidenav-title">
                  About FR8
                </h3>
                <ul className="nav nav-tabs tabs-left sideways">
                  {artcileQuestion.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={selectedArtice == index ? "active" : ""}
                      >
                        <a
                          data-toggle="tab"
                          onClick={() => setSelectedArtice(index)}
                        >
                          {item.question}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                {artcileQuestion.map((item, index) => {
                  return (
                    <div
                      className={`${selectedArtice == index ? "active" : ""
                        } tab-pane`}
                      id="home-v"
                      key={index}
                    >
                      <h2>{item?.question}</h2>
                      <p>
                        {item?.answer}{" "}
                        {index == 3 && (
                          <a
                            href={appconstants.privacyPolicy}
                            target="blank"
                            style={{ fontSize: "14px" }}
                          >
                            Privacy Policy (Attached).
                          </a>
                        )}
                      </p>
                      <p>
                        {
                          index == 4 && (
                            <div>
                              <h6>The smart way to know terminal wait times</h6>
                              <p>The Fr8 App gives you real-time information about current circumstances or disruptions affecting a terminal. It’s an easy tool that allows you to monitor terminals 24/7 and sends you and other drivers instant alerts when something is causing delays. </p>
                              <h6>Planning for delays is easier when you belong to a community</h6>
                              <p>Accidents? Port authority updates? Blocked roads? Closures due to weather conditions? When you use the FR8 app, you can share all this and more, to the community in real time. We’re all in this together.
                                You can also upload time stamps of all of your terminal and warehouse visits and upload pictures of your T.I.R.’s to your timeline and share with your company or customer.</p>
                              <h6>Be the first to know</h6>
                              <p>The FR8 App collects information and immediately analyzes it in order to provide all users with the most up to date terminal conditions, 24 hours a day. If the wait time is bad at the terminal you are heading to, the FR8 App will notify you so you can plan any delays with your dispatcher or customer.
                              </p>
                            </div>
                          )
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer" style={{ backgroundColor: '#fff' }}>
        <div className="footer-inner">
          <span className="logo"></span>
          <span>
            <a href={routes.support}>Still have questions? Send us an email!</a>
          </span>
          <div className="footer-language-selector"></div>
        </div>
      </footer>
    </Layout>
  );
}
