import { useState } from "react";
import Navigation from "../components/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import appconstants from "../constants/appconstants";
import { useRouter } from "next/router";
import routes from "../constants/routes";
import { Spin } from "antd";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z0-9 ]*$/, "Special characters not allowed.")
    .required("Please enter name.")
    .min(2, "Name should be at least 2 characters long."),
  email: Yup.string()
    .email("Please enter valid email address.")
    .required("Please enter email address."),
  title: Yup.string()
    .required("Please enter Title.")
    .min(2, "Title should be at least 2 characters long."),
  message: Yup.string()
    .required("Please enter Message.")
    .min(2, "Message should be at least 2 characters long."),
});

export default function SupportOld() {
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

    fetch(`${appconstants.baseUrl}support/createSupport`, requestOptions)
      .then(function (response) {
        setLoader(false);
        return response.json();
      })
      .then(function (data) {
        if (data?.error) {
          setApiError("Oops..! Something Went Wrong! Try After Sometime!");
        } else {
          setSuccess(true);
        }
        setLoader(false);
      })
      .catch((error) => {});
  };
  return (
    <div>
      <Navigation hideButton={true} />
      <section
        className="slider"
        style={{ height: success ? "100vh" : "100%" }}
      >
        <section className="contact-us bottom-animate wow">
          <div className="container">
            <div className="col-md-12">
              {success && (
                <>
                  <div className="heading_text">
                    Thank you for your inquiry!
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
                <div className="text-data">
                  <>
                    {!success && <div className="heading_text">Support Us</div>}
                    <div className="form-group">
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
                                <div className="form-group">
                                  <>
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
                                    <p
                                      className="error-text"
                                      style={{
                                        color: "#EF0000",
                                        textAlign: "left",
                                        marginLeft: 2,
                                        fontSize: 14,
                                        fontWeight: 300,
                                      }}
                                    >
                                      {touched.name && errors?.name}
                                    </p>
                                  </>
                                  <>
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
                                    <p
                                      className="error-text"
                                      style={{
                                        color: "#EF0000",
                                        textAlign: "left",
                                        marginLeft: 2,
                                        fontSize: 14,
                                        fontWeight: 300,
                                      }}
                                    >
                                      {touched.email && errors?.email}
                                    </p>
                                  </>
                                  <>
                                    <input
                                      type="text"
                                      id="title"
                                      name="title"
                                      className="form-control"
                                      placeholder="Title"
                                      maxLength={50}
                                      onChange={(e) =>
                                        setFieldValue(
                                          "title",
                                          e.target.value.trimLeft()
                                        )
                                      }
                                      onBlur={handleBlur("title")}
                                    />
                                    <p
                                      className="error-text"
                                      style={{
                                        color: "#EF0000",
                                        textAlign: "left",
                                        marginLeft: 2,
                                        fontSize: 14,
                                        fontWeight: 300,
                                      }}
                                    >
                                      {touched.title && errors?.title}
                                    </p>
                                  </>
                                  <>
                                    <textarea
                                      type="text"
                                      id="message"
                                      name="message"
                                      className="form-control"
                                      placeholder="Message"
                                      maxLength={500}
                                      onChange={(e) =>
                                        setFieldValue(
                                          "message",
                                          e.target.value.trimLeft()
                                        )
                                      }
                                      onBlur={handleBlur("message")}
                                    />
                                    <p
                                      className="error-text"
                                      style={{
                                        color: "#EF0000",
                                        textAlign: "left",
                                        marginLeft: 2,
                                        fontSize: 14,
                                        fontWeight: 300,
                                      }}
                                    >
                                      {touched.message && errors?.message}
                                    </p>
                                  </>
                                  <div className="social-icons-new">
                                    <button
                                      className="button-lite"
                                      type="submit"
                                      style={{
                                        width: loader ? "auto" : "auto",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
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
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
