import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import http from "@/helpers/http";
import { useDispatch, useSelector } from "react-redux";
import { MdCheck, MdError } from "react-icons/md";
import { setProfile } from "@/redux/reducers/profile";
import { setTransactions } from "@/redux/reducers/transactions";
const validationSchema = Yup.object({
  amount: Yup.number().min(20000, "Min amount Rp. 20.000"),
});

const TopUp = (props) => {
  const { token, visibleModal } = props;
  console.log(token);
  const [closeModal, setCloseModal] = React.useState(visibleModal);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMassage] = React.useState("");

  const transactionList = React.useCallback(async () => {
    const { data } = await http(token).get("/transactions", {
      params: { limit: 10 },
    });
    dispatch(setTransactions(data.results));
  }, [token, dispatch]);

  const doTopup = async (values) => {
    const amount = values.amount;
    const formData = new URLSearchParams({ amount });
    const { data } = await http(token).post(
      "/transactions/topup",
      formData.toString()
    );

    if (data.results) {
      dispatch(setProfile(data.results));
      setSuccessMassage(`${data.message} Topup Success!`);
      setTimeout(() => {
        setSuccessMassage("");
        setCloseModal(false);
      }, 1500);
      transactionList();
    }
  };

  const close = () => {
    setCloseModal(false);
  };
  return (
    <div>
      <input
        type="checkbox"
        id="loading"
        className="modal-toggle"
        checked={closeModal}
        onChange={() => setCloseModal(!closeModal)}
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <div className="py-3 text-black text-lg font-semibold">Topup</div>

          {errorMessage && (
            <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
              <MdError size={30} />
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="flex flex-row justify-center alert alert-success shadow-lg text-white text-lg">
              <MdCheck size={30} />
              {successMessage}
            </div>
          )}
          <div className="py-3 text-black text-base font-semibold">
            Enter the amount of money, and click submit
          </div>

          <Formik
            initialValues={{
              amount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={doTopup}
            enableReinitialize={true}
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
                className="modal-action flex flex-col items-center justify-center gap-7 w-full"
              >
                <div className="w-full">
                  <input
                    type="text"
                    name="amount"
                    placeholder="Enter your amount min Rp. 20.000"
                    className={`border-b-2 outline-none h-12 ${
                      errors.amount && touched.amount && "border-error"
                    } w-full font-[500] text-secondary text-xl`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                  />
                  {errors.amount && touched.amount && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.amount}
                      </span>
                    </label>
                  )}
                </div>
                <div className="w-full flex items-center gap-4 justify-end">
                  <button
                    type="submit"
                    className="btn btn-success w-20 capitalize text-white self-end"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary w-20 capitalize text-white self-end"
                    onClick={() => {
                      close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
