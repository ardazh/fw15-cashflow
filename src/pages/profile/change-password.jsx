import React from "react";
import Headers from "@/components/Header";
import Footers from "@/components/Footers";
import Aside from "@/components/Aside";

import { AiOutlineLock } from "react-icons/ai";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import cookieConfig from "@/helpers/cookieConfig";
import * as Yup from "yup";
import { MdCheck, MdError } from "react-icons/md";
import http from "@/helpers/http";
import { Formik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session.token;
    checkCredentials(token, res, "/auth/login");
    return {
      props: {
        token: req.session.token,
      },
    };
  },
  cookieConfig
);

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Password is invalid"),
  newPassword: Yup.string()
    .min(4, "must have input 4 characters")
    .required("Password is invalid"),
  confirmPassword: Yup.string()
    .required("Confirm password is empty !")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

function ChangePassword({ token }) {
  const [iconEye, setIconEye] = React.useState(false);
  const [iconEye1, setIconEye1] = React.useState(false);
  const [iconEye2, setIconEye2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [typeOldPassword, setTypeOldPassword] = React.useState(false);
  const [typeNewPassword, setTypeNewPassword] = React.useState(false);
  const [typeConfirmPassword, setTypeConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const doChangePassword = async (values, { resetForm }) => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const form = new URLSearchParams({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).toString();

      const { data } = await http(token).patch(
        "/profile/change-password",
        form
      );
      if (data.success === true) {
        setSuccessMessage("Change password success!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      const message = "failed, wrong old password!";
      setErrorMessage(message);
      setLoading(false);
    }
  };

  const handleOldPassword = () => {
    setIconEye(!typeOldPassword);
    setTypeOldPassword(!iconEye);
  };
  const handleNewPassword = () => {
    setIconEye1(!typeNewPassword);
    setTypeNewPassword(!iconEye1);
  };
  const handleConfirmPassword = () => {
    setIconEye2(!typeConfirmPassword);
    setTypeConfirmPassword(!iconEye2);
  };

  return (
    <main className="bg-[#E5E5E5]">
      <div>
        <Headers token={token} />
      </div>
      <div className="flex">
        <div>
          <Aside token={token} />
        </div>
        <div className="flex flex-col bg-[#FFFFFF] shadow-xl rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10">
          <div className="font-bold text-lg text-[#3A3D42] mb-[25px]">
            Change Password
          </div>
          <div className="text-[#7A7886] mb-[100px]">
            You must enter your current password and then
            <br />
            type your new password twice.
          </div>
          {errorMessage && (
            <div className="flex flex-row justify-center text-primary text-lg gap-3">
              <MdError size={30} />
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="flex flex-row justify-center text-green-500 text-lg gap-3">
              <MdCheck size={30} />
              {successMessage}
            </div>
          )}
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={doChangePassword}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="flex flex-col justify-center items-center gap-5"
              >
                <div className="flex flex-col gap-12 py-2 w-[431px]">
                  <div
                    className={`border-b-2 ${
                      errors.oldPassword && touched.oldPassword
                        ? "border-primary"
                        : "border-[#eaeaea]"
                    } w-full h-12 flex items-center gap-5`}
                  >
                    <div>
                      <AiOutlineLock size={24} />
                    </div>
                    <div className="h-full w-full relative">
                      <input
                        className="h-full w-full outline-none text-neutral"
                        type={typeOldPassword ? "text" : "password"}
                        placeholder="Enter your old password"
                        name="oldPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.oldPassword}
                      />
                      <button
                        type="button"
                        onClick={handleOldPassword}
                        className="absolute top-3 right-2"
                      >
                        {iconEye ? (
                          <i>
                            <FiEye size={20} />
                          </i>
                        ) : (
                          <i>
                            <FiEyeOff size={20} />
                          </i>
                        )}
                      </button>
                      {errors.oldPassword && touched.oldPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.oldPassword}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div
                    className={`border-b-2 ${
                      errors.newPassword && touched.newPassword
                        ? "border-primary"
                        : "border-[#eaeaea]"
                    } w-full h-12 flex items-center gap-5`}
                  >
                    <div>
                      <AiOutlineLock size={24} />
                    </div>
                    <div className="h-full w-full relative">
                      <input
                        className="h-full w-full outline-none text-neutral"
                        type={typeNewPassword ? "text" : "password"}
                        placeholder="New password"
                        name="newPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPassword}
                      />
                      <button
                        type="button"
                        onClick={handleNewPassword}
                        className="absolute top-3 right-2"
                      >
                        {iconEye1 ? (
                          <i>
                            <FiEye size={20} />
                          </i>
                        ) : (
                          <i>
                            <FiEyeOff size={20} />
                          </i>
                        )}
                      </button>
                      {errors.newPassword && touched.newPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.newPassword}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div
                    className={`border-b-2 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-primary"
                        : "border-[#eaeaea]"
                    } w-full h-12 flex items-center gap-5`}
                  >
                    <div>
                      <AiOutlineLock size={24} />
                    </div>
                    <div className="h-full w-full relative">
                      <input
                        className="h-full w-full outline-none text-neutral"
                        type={typeConfirmPassword ? "text" : "password"}
                        placeholder="New password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={handleConfirmPassword}
                        className="absolute top-3 right-2"
                      >
                        {iconEye2 ? (
                          <i>
                            <FiEye size={20} />
                          </i>
                        ) : (
                          <i>
                            <FiEyeOff size={20} />
                          </i>
                        )}
                      </button>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.confirmPassword}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[431px]">
                  {loading ? (
                    <button className="btn btn-info w-full normal-case text-[#88888F] hover:text-black">
                      <span className="loading loading-spinner loading-sm"></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-info w-full normal-case text-[#88888F] hover:text-black"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div>
        <Footers />
      </div>
    </main>
  );
}

export default ChangePassword;
