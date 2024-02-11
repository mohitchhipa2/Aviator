import React, { useEffect, useState } from 'react';
import { useAuth } from '../ContextAndHooks/AuthContext';
import "./Depositeaccount.css"
import useSWR from 'swr';
import { RiMessage2Line } from "react-icons/ri";
import { fetchData } from '../api/ClientFunction';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";


const DepositeAmount = () => {
  const [adminBank, setAdminBank] = useState({});
  const { data } = useSWR("/admin/getadminbank", fetchData);
  // const [file, setFile] = useState(null);
  useEffect(() => {
    if (data && data.data) {
      setAdminBank(data.data)
    }
  }, [data])
console.log(adminBank)
console.log(`${process.env.REACT_APP_API_URL}${adminBank?.barCode}`)
  const [mwl, setMwl] = useState(250);
  const { data: newData } = useSWR("/user/minwl", fetchData);
  useEffect(() => {
    if (newData && newData.data) {
      setMwl(newData.data);
    }
  }, [newData]);
  const queryClient = useQueryClient();
  const { user, bank } = useAuth();
  const {
    register,
    handleSubmit,
    setValue, // Add setValue from react-hook-form
    formState: { errors },
  } = useForm({
    defaultValues: {
      withdrawamount: "", // Set default values here
      bankName: bank?.name_bank || "",
      accountNumber: bank?.account || "",
      upi: bank?.stk || "",
      accountHolderName: bank?.name_user || "",
      ifsc: bank?.ifsc || "",
    },
  });
  const [money, setMoney] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    if (user && user.money && user.phone) {
      setMoney(user.money);
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    // Set default values when bank changes
    setValue("bankName", bank?.name_bank || "");
    setValue("accountNumber", bank?.account || "");
    setValue("upi", bank?.stk || "");
    setValue("accountHolderName", bank?.name_user || "");
    setValue("ifsc", bank?.ifsc || "");
  }, [bank, setValue]);

  const onSubmit = async (data) => {
    // Trim all data values
    const trimmedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim()])
    );
    // Check if money is available
    if (!money) {
      Swal.fire("Error", "Please login to withdraw money", "error");
      return;
    }

    // Check withdrawal conditions
    console.log(trimmedData.withdrawamount);
    if (
      trimmedData.withdrawamount <= money &&
      Number(trimmedData.withdrawamount) >= mwl
    ) {
      // Make API call for withdrawal
      const res = await postData("/user/withdraw", { ...trimmedData, phone });

      // Show success or error message based on the API response
      Swal.fire(
        res.status ? "Success" : "Error",
        res.status
          ? "Withdraw request submitted successfully!"
          : "Failed to submit withdraw request",
        res.status ? "success" : "error"
      );
      if (res.status) {
        queryClient.invalidateQueries("userData");
      }
    } else {
      // Show error message for withdrawal conditions not met
      Swal.fire(
        "Error",
        `Minimum withdrawal limit is ${mwl} or Your Wallet has not enough amount`,
        "error"
      );
    }
  };


  // const [rrnNumber, setRrnNumber] = useState('');
  // const [error, setError] = useState('');

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  // const handleRrnNumberChange = (e) => {
  //   const inputRrnNumber = e.target.value;
  //   setRrnNumber(inputRrnNumber);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!file) {
  //     setError('Please choose a file!');
  //     return;
  //   }

  //   if (!rrnNumber) {
  //     setError('Please enter RRN number!');
  //     return;
  //   }

  //   // Clear the error if RRN number is provided
  //   setError('');

  //   console.log("submited",file)
  //   console.log('Submitted with RRN Number:', rrnNumber);
  // };





  return (
    <div>
      <div className="deposite-container mb-4">

        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-md-3 d-flex">
              <div className="w-100 bg-white">
                <div className="custom-accordian ">
                  <div className="accordian-header">
                    <h3>PAY BY NEFT / IMPS OR NETBANKING</h3>
                    <button className="btn btn-transparent p-0 accrodian-btn">
                      <span className="material-symbols-outlined bold-icon text-white">
                        expand_circle_down
                      </span>
                    </button>
                  </div>
                  <div className="accordian-body">
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">
                          Bank Name
                        </div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.bankName}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                lock
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">
                          Account Holder Name
                        </div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.accountNumber}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                lock
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">
                          Account number
                        </div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.accountHolderName}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                lock
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">
                          IFSC Code
                        </div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.ifscCode}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                lock
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">
                          UPI
                        </div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.upiId}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                lock
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-md-3 d-flex">
              <div className="w-100 bg-white">
                <div className="custom-accordian">
                  <div className="accordian-header">
                    <h3>PAY BY QR</h3>
                    <button className="btn btn-transparent p-0 accrodian-btn">
                      <span className="material-symbols-outlined bold-icon text-white">
                        expand_circle_down
                      </span>
                    </button>
                  </div>

                  <div style={{ display: "flex", margin: "auto", justifyContent: "center" }}>
                    <img style={{ width: "250px", height: "250px", marginTop: "20px" }}
                      src={`${process.env.REACT_APP_API_URL}${adminBank?.barCode}`}

                    // src="https://i.pinimg.com/736x/41/b3/9a/41b39a9463caa1d7e137dbabe149c2ac.jpg" alt="" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='two-inputs'>
          <div className="mb-3 col-md-4 mt-2">
        <div className="input-group">
          <input
            required
            type="file"
            style={{background:"#012348", color: "white",width:"max-contant",border:" 2px solid #113B70"}}
            className="form-control"
            placeholder="ScreenShot"   
            onChange={handleFileChange}
          />   
      </div>
       <button
       style={{marginTop:"10px"}}
        type="submit"
        disabled={!file===true}
        className="btn orange-btn custm-btn-2 mb-0 registerSubmit"
        id="deposit"
      >
        SUMBIT
        </button>
</div>


          <div className="mb-3 col-md-4 mt-2">
        <div className="input-group">
          <input
            type="number"
            style={{background:"#012348", color: "white",width:"max-contant",border:" 2px solid #113B70" }}
            className="form-control"
            placeholder="RRN Number"   
            required
            onChange={handleRrnNumberChange}
            value={rrnNumber}
            title="Please enter a 12-digit / 14-digit RRN Number"
          />   
      </div>
       <button style={{marginTop:"10px"}}
        type="submit"
        onClick={handleSubmit}
        className="btn orange-btn custm-btn-2 mb-0 registerSubmit"
        id="deposit"
        disabled={!(rrnNumber.length === 12 || rrnNumber.length === 14)}
      >
        SUMBIT
        </button>
</div>
 
</div> */}



          <div
            className="active d-flex justify-content-center  "
            id="via-email"
            style={{ marginTop: "48px  " }}
          >
            <form
              className="register-form row w-75"
              onSubmit={handleSubmit(onSubmit)}
              style={{ color: "white", marginBottom: "20px" }}
            >
             

              {/* Withdraw Amount Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">badge</span>
                  </span>
                  <input
                    required
                    type="text"
                    className={`form-control ps-0 ${errors.withdrawamount ? "is-invalid" : ""
                      }`}
                    id="withdrawamount"
                    placeholder="Name"
                    name="withdrawamount"
                    pattern= "^[a-zA-Z]+$"
                    {...register("withdrawamount", {
                      required: "Withdraw amount is required",
                    })}
                  
                  />
                  {errors.withdrawamount && (
                    <div className="invalid-feedback">
                      {errors.withdrawamount.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Name Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">badge</span>
                  </span>
                  <input
                    required
                    type="text"
                    title="Only alphabetic characters and spaces are allowed"
                    className={`form-control ps-0 ${errors.bankName ? "is-invalid" : ""
                      }`}
                    id="bankName"
                    placeholder="Email"
                    pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
                    name="bankName"
                    {...register("bankName", {
                      required: "Bank name is required"
                    })}

                  />
                  {errors.bankName && (
                    <div className="invalid-feedback">{errors.bankName.message}</div>
                  )}
                </div>
              </div>

              {/* Account Number Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">badge</span>
                  </span>
                  <input
                    required
                    type="text"
                    minLength="1"
                    className={`form-control ps-0 ${errors.accountNumber ? "is-invalid" : ""
                      }`}
                    id="accountNumber"
                    placeholder="Phone Number"
                    name="accountNumber"
                    {...register("accountNumber", {
                      required: "Account number is required",
                    })}
                  />
                  {errors.accountNumber && (
                    <div className="invalid-feedback">
                      {errors.accountNumber.message}
                    </div>
                  )}
                </div>
              </div>

              {/* UPI Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <RiMessage2Line className="material-symbols-outlined bold-icon" />
                  </span>
                  <input
                    required
                    type="text"
                    className={`form-control ps-0 ${errors.upi ? "is-invalid" : ""}`}
                    id="upi"
                    placeholder="Amount"
                    name="upi"
                    {...register("upi", { required: "UPI is required" })}
                  />
                  {errors.upi && (
                    <div className="invalid-feedback">{errors.upi.message}</div>
                  )}
                </div>
              </div>

              {/* Account Holder Name Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <RiMessage2Line className="material-symbols-outlined bold-icon" />
                  </span>
                  <input
                    required
                    type="text"
                    className={`form-control ps-0 ${errors.accountHolderName ? "is-invalid" : ""
                      }`}
                    id="accountHolderName"
                    placeholder="Transaction Number"
                    name="accountHolderName"
                    {...register("accountHolderName", {
                      required: "Account holder name is required",
                    })}
                  />
                  {errors.accountHolderName && (
                    <div className="invalid-feedback">
                      {errors.accountHolderName.message}
                    </div>
                  )}
                </div>
              </div>

              {/* IFSC Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <RiMessage2Line className="material-symbols-outlined bold-icon" />
                  </span>
                  <input
                    required
                    type="file"
                    className={`form-control ps-0 ${errors.ifsc ? "is-invalid" : ""}`}
                    id="ifsc"
                    placeholder="ScreenShot"
                    name="ifsc"
                    {...register("ifsc", { required: "IFSC is required" })}
                  />
                  {errors.ifsc && (
                    <div className="invalid-feedback">{errors.ifsc.message}</div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn orange-btn md-btn custm-btn-2 mx-auto mt-3 mb-0 registerSubmit"
                id="withdraw"
              >
                WITHDRAW
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositeAmount
