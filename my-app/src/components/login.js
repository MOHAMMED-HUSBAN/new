import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import SignInwithGoogle from "./signInWIthGoogle";
import { getRandomCoupon } from "./coupons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const coupon = getRandomCoupon();
      await updateDoc(doc(db, "Users", user.uid), { coupon });

      console.log("User logged in Successfully");
      window.location.href = "/profile";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
      <SignInwithGoogle />
    </form>
  );
}

export default Login;
