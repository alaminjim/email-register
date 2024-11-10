import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();

  const handelLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    setErr("");
    setSuccess(false);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex) {
      setErr("one upperCase,One LowerCase, One Special Character, One number");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        if (!result.user.emailVerified) {
          console.log("please verify your email");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setErr(error.message);
        setSuccess(false);
      });
  };

  const handelChangePass = () => {
    const email = emailRef.current.value;
    console.log(email);

    if (!email) {
      console.log("valid email address");
    } else {
      sendPasswordResetEmail(auth, email).then((result) => {
        alert("check your mail;");
      });
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-center font-bold">Login now!</h1>
            <p className="py-6 text-center">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.<br></br>In deleniti eaque aut
              repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handelLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label onClick={handelChangePass} className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
            </form>
            <p className="ml-8 mb-5">
              Don't have any account{" "}
              <Link className="underline" to="/register">
                Register
              </Link>
            </p>

            {err && <p className="text-center text-red-500 p-6">{err}</p>}
            {success && (
              <p className="text-center text-green-500 p-6">
                Successfully Log In!!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
