import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handelRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    console.log(email, password, terms, name, photo);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex) {
      setErr("one upperCase,One LowerCase, One Special Character, One number");
    }

    if (password.length < 8) {
      setErr("Please enter 8 character password");
      return;
    }

    if (!terms) {
      setErr("accept our terms and condition");
      return;
    }

    setErr("");
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("please code");
        });
      })
      .catch((error) => {
        console.log(error.message);
        setErr(error.message);
        setSuccess(false);
      });

    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log("user profile update");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 my-10 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photoUrl"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 mt-12"
              >
                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label justify-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  defaultChecked
                  className="checkbox"
                />
                <span className="label-text">
                  Accept Out trams and condition!
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Register</button>
            </div>
          </form>

          <p className="ml-8 mb-5">
            Already have any account{" "}
            <Link className="underline" to="/login">
              LogIn
            </Link>
          </p>

          {err && <p className="text-center text-red-500 py-6">{err}</p>}
          {success && (
            <p className="text-center text-green-500 py-6">
              Register Successfully!!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
