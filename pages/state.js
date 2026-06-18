import { useRef, useState, useEffect } from "react";
import Navigation from "../components/navigation";
import routes from "../constants/routes";
import appImages from "../constants/appImages";
import appconstants from "../constants/appconstants";
import { useDispatch, useSelector } from "react-redux";
import { stateAction, passId } from "../redux/action";
import Layout from "../components/layout";
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import { NavigateBefore } from "@material-ui/icons";
// import { isInternetConnected } from "../InternetConnection/InternetConnection";
import { useWindowSize } from "../components/getdimensions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const State = () => {



    const ref = useRef(null);
    const [selectedArtice, setSelectedArtice] = useState(0);
    const [showSearchBox, setshowSearchBox] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [region, setRegion] = useState()
  
    const [search, setSearch] = useState(null)
    const [userId, setUserId] = useState()

    var reducerDetails = useSelector(state => state.reducer.stateDetails)
    var newReducer = useSelector(state => state.reducer.arrayDetails)

    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        // isInternetConnected(router) &&
            dispatch(stateAction(search))
        // localStorage.removeItem("stateId")
        // localStorage.removeItem("regionId")
    }, [search])

    const checkSearch = (value) => {
        if (value.length > 2) {
            setshowSearchBox(true);
            var foundValue = searchQuestion.filter((obj) =>
                obj?.question?.toLowerCase()?.includes(value.toLowerCase())
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

    const stateNavigation = (item, index) => {
        setRegion(index)
        localStorage.setItem("stateId", item.state_id)
        localStorage.setItem("regionId", item.reg_id)
        localStorage.setItem("regionName", item.reg)
        // isInternetConnected(router) &&
            router.push({
                pathname: "/state/terminalboard",
                query: {
                    id: item.reg_id,
                },
            })
    }

    const searchFunction = (e) => {
        var tempText = e.target.value
        if (e.target.value.charAt(0) === " ") {
            tempText = e.target.value.replace(/^ +/gm, '');
        }
        setSearch(tempText)
        // setSearch(e.target.value)
    }
    const h = useWindowSize().height;
    const w = useWindowSize().width;
    // console.log(h, w, "we")

    return (
        <Layout title={"FR8 | State/Region"}>
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
            <Navigation />

            <div className="state_text">
                <div className="container">
                    <div className="row">
                        <div className="state_support">
                            <div ref={ref}>
                                <div className="text_line_new">
                                    <input
                                        id="search_input"
                                        type="form-control"
                                        autoComplete="off"
                                        placeholder="Search region"
                                        style={{ borderRadius: "5px" }}
                                        value={search}
                                        onChange={searchFunction}
                                    />
                                    <img src={appImages.search} alt="" className="icons-new search" style={{ left: "83%", width: "20px" }} />
                                </div>
                                <div
                                    className="search_box_container"
                                    style={{ display: showSearchBox ? "flex" : "none" }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="below_text">
                <div class="flex-container" style={{justifyContent:'space-between'}}>
                    {newReducer.length > 0 ?
                        newReducer.map((item, index) => {
                            let isStyle = index % 4 == 0 ? true : false;
                                    if(item.state_id != "61603a1e318268302c99993e") {
                            return (
                                <div style={{ marginTop: "2%" }} className="flex-item" onClick={() => stateNavigation(item, index)} key={Math.random().toString()}>

                                    <div className="text-box1" style={{
                                        color: newReducer[region]?.reg_id === item.reg_id ? "black" : "darkslategray",
                                        boxShadow: newReducer[region]?.reg_id === item.reg_id ? "2px 2px 2px 2px rgba(0,0,0,0.8)" : null,
                                        textShadow: newReducer[region]?.reg_id === item.reg_id ? "0px 0.5px, 0.5px 0px black" : null
                                    }}>
                                        {item?.state_reg}
                                    </div>
                                </div>
                                // </div>
                            )
                                }
                        })
                        :
                        <div className="no-data">
                            <h4 style={{ color: "white" }}>No region available</h4>
                        </div>
                    }
                </div>
                {/* <div className="flex-container">
                    <div className="row row1">
                        {newReducer.length > 0 ?
                            newReducer.map((item, index) => {
                                let isStyle = index % 4 == 0 ? true : false;
                                return (
                                    <div style={{ marginTop: "2%" }} onClick={() => stateNavigation(item, index)} key={Math.random().toString()}>
                                      
                                        <div className="text-box1" style={{
                                            color: newReducer[region]?.reg_id === item.reg_id ? "black" : "darkslategray",
                                            boxShadow: newReducer[region]?.reg_id === item.reg_id ? "2px 2px 2px 2px rgba(0,0,0,0.8)" : null,
                                            textShadow: newReducer[region]?.reg_id === item.reg_id ? "0px 0.5px, 0.5px 0px black" : null
                                        }}>
                                            {item?.state_reg}
                                        </div>
                                    </div>
                                    // </div>
                                )
                            })
                            :
                            <div className="no-data">
                                <h4 style={{ color: "white" }}>No region available</h4>
                            </div>
                        }
                    </div>
               
                </div>
             */}
            </div>
        </Layout >
    )
}

export default State;