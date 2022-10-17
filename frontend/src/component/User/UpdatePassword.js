import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("oldPassword", oldPassword);
    myForm.append("newPassword", newPassword);
    myForm.append("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigate("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div>
                  <VpnKeyIcon />
                  <input
                    type={oldPasswordShow ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span
                    className="icon"
                    onClick={() => {
                      setOldPasswordShow(!oldPasswordShow);
                    }}
                  >
                    {oldPasswordShow ? <Visibility /> : <VisibilityOff />}
                  </span>
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type={!newPasswordShow ? "password" : "text"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="icon"
                    onClick={() => {
                      setNewPasswordShow(!newPasswordShow);
                    }}
                  >
                    {newPasswordShow ? <Visibility /> : <VisibilityOff />}
                  </span>
                </div>
                <div>
                  <LockIcon />
                  <input
                    type={!confirmPasswordShow ? "password" : "text"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="icon"
                    onClick={() => {
                      setConfirmPasswordShow(!confirmPasswordShow);
                    }}
                  >
                    {confirmPasswordShow ? <Visibility /> : <VisibilityOff />}
                  </span>
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
