import React, { useLayoutEffect, useRef } from "react";
import blogicon from "../../assets/cloud.svg";
import { useNavigate } from "react-router-dom";
import {
  login,
  getCookie,
  accessCookie,
  getUserData,
} from "../services";
import axios from "axios";
import { RiWindowLine } from "react-icons/ri";

const index = () => {
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };
  const spanRef = useRef<HTMLSpanElement>(null);

  const onSubmitHandler = (event: any) => {
    // HTMLElement is superset of HTMLELement
    event.preventDefault();

    // METHOD : 1
    // const target = event.target as typeof event.target & {
    //   email: { value: string };
    //   password: { value: string };
    // }
    // const email  = target.email.value
    // const password = target.password.value;

    // METHOD 2
    const formData = new FormData(event.target);

    const values = [...formData.entries()];

    const formDataObj = Object.fromEntries(formData.entries());

    // login(formDataObj)
    // .then((response)=>{
    //   //console.log(response.data)
    //     // window.localStorage.setItem('user',)
    //   window.sessionStorage.setItem('user', response.data.user.name)
    //   window.sessionStorage.setItem('authToken', response.data.token)
    //   //console.log(window.sessionStorage.getItem('user'))
    //   navigate('/app/home')
    // })
    // .catch(err=>{
    //   // //console.log(err)
    //   alert(`ERROR-${err.response.status} : ${err.response.data.message}`)
    // })

    // STORING JWT IN HTTPONLY COOKIE
    getCookie(formDataObj)
      .then((response) => {
        //console.log(response);
        // window.localStorage.setItem('user',)
        // window.sessionStorage.setItem('user', response.data.user.name)
        // window.sessionStorage.setItem('authToken', response.data.token)
        // //console.log(window.sessionStorage.getItem('user'))
        // navigate('/app/home')

        // LINE 57 TO 64 IS FOR TESTING ONLY
        // accessCookie()
        // .then((response)=>{
        //     //console.log(response.data)
        // })
        // .catch(err=>{
        //   //console.log(err.message)
        // })

        // AFTER USER LOGS IN AND GETS TOKEN , retreive user data -> store in localstorage -> REDIRECT TO HOME PAGE

        getUserData().then((response) => {
          // console.log("RESPONSE DATA : "+ response.data);
          // console.log(response.data.user);
          window.localStorage.setItem("user", response.data.user.name);
          window.localStorage.setItem("isAdmin", response.data.user.isAdmin);
          window.localStorage.setItem("firstlogin", JSON.stringify(response.data.user.firstTimeLogin));
          window.localStorage.setItem('skipTagSet',"false");
          window.sessionStorage.setItem('loggedIn',response.data.user._id)
          window.sessionStorage.setItem('email',response.data.user.email)
          window.sessionStorage.setItem('profileurl',response.data.user.profileurl);

          navigate("/home");
        });
      })
      .catch((err) => {
        //console.log(err);
        if (!err.response) //console.log("no response");
        // //console.log(err.response.data.message)
        // alert(`Invalid`);
        //console.log("span ref");
        
        //console.log(currentElem);
        if (spanRef.current != null) {
          spanRef.current.classList.remove("hidden");
        }
      });

    // alert(JSON.stringify(formDataObj))
  };
  return (
    <section className="h-full w-full shadow-2xl shadow-teal-300 md:h-screen">
      <div className="mx-auto container py-12 px-6 h-full w-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="flex flex-wrap justify-center flex-row g-0">
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);",
                  }}
                >
                  <div className="w-full text-white px-4 py-6 md:p-12 md:mx-6">
                    <div className="text-center my-5">
                      <img className="mx-auto w-48" src={blogicon} alt="logo" />
                    </div>
                    <h4 className="text-xl text-center font-semibold mb-6 text-red-300">
                      WEATHEROO
                    </h4>
                    <p className="text-center text-sm text-slate-700">
                      A Site where you get your weather information
                    </p>
                  </div>
                </div>
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Email"
                          name="email"
                          onChange={() => {
                            if (null !== spanRef.current) {
                              spanRef.current.classList.add("hidden");
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={() => {
                            if (null !== spanRef.current) {
                              spanRef.current.classList.add("hidden");
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-col text-center pt-1 mb-12 pb-1">
                        <button
                          className=" hover:opacity-80 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg  focus:outline-none  active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)",
                          }}
                        >
                          Log in
                        </button>
                        <span
                          className="hidden text-red-500 font-bold text-sm"
                          ref={spanRef}
                        >
                          Invalid credentials
                        </span>

                        <a className="text-gray-500" href="#!">
                          Forgot password?
                        </a>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none  transition duration-150 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={navigateRegister}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
