import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./Profile.css";

const Profile = () => {
  let navigate = useNavigate();
  
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log("isAuthenticated", isAuthenticated);
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user && user?.name}'s Profile`} />

          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user?.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user && user?.name}</p>
              </div>

              <div>
                <h4>Email</h4>
                <p>{user && user?.email}</p>
              </div>

              <div>
                <h4>Joined On</h4>
                <p>{String(user && user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Profile;
