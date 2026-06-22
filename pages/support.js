import { useState } from "react";
import Navigation from "../components/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import appconstants from "../constants/appconstants";
import { useRouter } from "next/router";
import routes from "../constants/routes";
import { Spin } from "antd";
import Layout from "../components/layout";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z0-9 ]*$/, "Special characters not allowed.")
    .required("Please enter name.")
    .min(2, "Name should be at least 2 characters long."),
  email: Yup.string()
    .email("Please enter valid email address.")
    .required("Please enter email address."),
  title: Yup.string()
    .required("Please enter subject.")
    .min(2, "Subject should be at least 2 characters long."),
  message: Yup.string()
    .required("Please enter description.")
    .min(2, "Description should be at least 2 characters long."),
});

export default function Support() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const initialObject = {
    name: "",
    email: "",
    title: "",
    message: "",
  };
  const submitForm = (vales) => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      name: vales?.name ? vales?.name : "",
      email: vales?.email ? vales?.email : "",
      title: vales?.title ? vales?.title : "",
      message: vales?.message ? vales?.message : "",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${appconstants.baseUrl}v3/support/createSupport`, requestOptions)
      .then(function (response) {
        setLoader(false);
        return response.json();
      })
      .then(function (data) {
        setSuccess(true);

        setLoader(false);
        window.scrollTo({ top: 0 });
      })
      .catch((error) => {});
  };
  return (
    <Layout title={"FR8 | Support"}>
      <Navigation />
      <div className="wrapper_form">
        <div className="container">
          {success && (
            <>
              <div className="heading_text ">
                Thank you for your enquiry!
                <br />A member of our support staff will respond as soon as
                possible.
              </div>
              <div className="social-icons-new">
                <button
                  className="button-lite"
                  onClick={() => router.push(routes.home)}
                  style={{}}
                >
                  Home
                </button>
              </div>
            </>
          )}
          {!success && (
            <>
              <nav className="sub-nav">
                <ol className="breadcrumbs">
                  <li title="Citizen Help Center">
                    <a href={routes.helpCenter}>FR8 Help Center</a>
                  </li>
                  <li title="Submit a request">Submit a request</li>
                </ol>
              </nav>
              <div className="from_line">
                <Formik
                  initialValues={initialObject}
                  enableReinitialize={true}
                  validationSchema={formSchema}
                  onSubmit={(values) => {
                    submitForm(values);
                  }}
                >
                  {({ handleBlur, setFieldValue, touched, errors }) => {
                    return (
                      <>
                        <Form>
                          <div className="from_line">
                            <h2>Submit a request</h2>
                            <div className="form-group">
                              <label>Your Name</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                maxLength={30}
                                onChange={(e) =>
                                  setFieldValue(
                                    "name",
                                    e.target.value.trimLeft()
                                  )
                                }
                                onBlur={handleBlur("name")}
                              />
                              {touched.name && errors?.name && (
                                <p className="error-text">
                                  {touched.name && errors?.name}
                                </p>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Your Email Address</label>
                              <input
                                type="text"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Email Address"
                                maxLength={100}
                                onChange={(e) =>
                                  setFieldValue(
                                    "email",
                                    e.target.value.trimLeft()
                                  )
                                }
                                onBlur={handleBlur("email")}
                              />
                              {touched.email && errors?.email && (
                                <p className="error-text">
                                  {touched.email && errors?.email}
                                </p>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Subject</label>
                              <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder="Subject"
                                maxLength={50}
                                onChange={(e) =>
                                  setFieldValue(
                                    "title",
                                    e.target.value.trimLeft()
                                  )
                                }
                                onBlur={handleBlur("title")}
                              />
                              {touched.title && errors?.title && (
                                <p className="error-text">
                                  {touched.title && errors?.title}
                                </p>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Description</label>
                              <textarea
                                type="text"
                                id="message"
                                name="message"
                                className="form-control"
                                placeholder="Description"
                                maxLength={500}
                                onChange={(e) =>
                                  setFieldValue(
                                    "message",
                                    e.target.value.trimLeft()
                                  )
                                }
                                onBlur={handleBlur("message")}
                                style={{
                                  height: "107px",
                                  resize: "none",
                                  fontSize: 15,
                                  color: "#000",
                                  fontWeight: 300,
                                }}
                              ></textarea>
                              {touched.message && errors?.message && (
                                <p className="error-text">
                                  {touched.message && errors?.message}
                                </p>
                              )}
                            </div>
                            <p id="request_description_hint">
                              Please enter the details of your request. A member
                              of our support staff will respond as soon as
                              possible.
                            </p>
                            <div
                              className="form-group"
                              style={{ marginTop: "80px" }}
                            >
                              <button
                                type="submit"
                                className="button-lite "
                                style={{ outline: "none" }}
                              >
                                {loader ? (
                                  <div class="spinning">
                                    <Spin
                                      spinning={true}
                                      size="small"
                                      style={{ marginTop: "3px" }}
                                    />
                                  </div>
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </div>
                          </div>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </div>
            </>
          )}
        </div>
      </div>
      {success && (
        <footer className="footer successFooter ">
          <div className="footer-inner">
            <span className="logo"></span>
            <span>
              <a onClick={() => setSuccess(false)} href={routes.support}>
                Still have questions? Send us an email!
              </a>
            </span>
            <div className="footer-language-selector"></div>
          </div>
        </footer>
      )}
    </Layout>
  );
}
