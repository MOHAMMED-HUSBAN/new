// Profile.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import transferData from "./transferData"; 

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails(data);
          setCoupon(data.coupon); 
          transferData();
        } else {
          console.log("User document does not exist");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"30%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3>Welcome {userDetails.firstName} </h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.firstName}</p>
            {coupon && (
              <div>
                <h4>Your Coupon:</h4>
                <p>Code: {coupon.code}</p>
                <p>Discount: {coupon.discount}</p>
           
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
