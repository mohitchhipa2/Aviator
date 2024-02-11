import React, { useEffect, useState } from 'react';
import { useAuth } from '../ContextAndHooks/AuthContext';
const Profile = () => {
  // State for managing user data
  const { bank, user } = useAuth();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (bank || user) {
      setUserData({
        bankName: bank?.name_bank || "Not Found!..",
        accountNumber: bank?.account || "Not Found!..",
        accountHolderName: bank?.name || "Not Found!..",
        ifscCode: bank?.ifsc || "Not Found!..",
        phoneNumber: bank?.phone || "Not Found!..",
        upi: bank?.stk || "Not Found!..",
        email: user?.email || "Not Found!..",
        fullName: user?.name || "Not Found!..",
        gender: user?.gender || "Not Found!..",
        code: user?.code || "Not Found!..",
        phone: user?.phone || "Not Found!.."
      })
    }
  }, [bank, user])

  return (
    <div className="deposite-container mb-4">
      <div className="sub-header option-2">
        <span style={{ color: 'white' }} className="material-symbols-outlined bold-icon f-30">
          person
        </span>
        <h2 className="f-24 fw-bold mt-3">Personal details</h2>
        <p style={{ color: 'white' }}>
          Use functions of this section and fill in the missing information fields.
          Expand your capabilities on the site!
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-md-3 d-flex">
            <div className="w-100 bg-white">
              <div className="custom-accordian ">
                <div className="accordian-header">
                  <h3>ACCOUNT DETAILS</h3>
                  <button className="btn btn-transparent p-0 accrodian-btn">
                    <span className="material-symbols-outlined bold-icon text-white">
                      expand_circle_down
                    </span>
                  </button>
                </div>
                <div className="accordian-body">
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Bank Name
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div>{userData.bankName}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Account Holder Name
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div>{userData.accountNumber}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Account number
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div>{userData.accountNumber}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        IFSC Code
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div>{userData.ifscCode}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        UPI
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div>{userData.upi}</div>
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
                  <h3>PERSONAL DETAILS</h3>
                  <button className="btn btn-transparent p-0 accrodian-btn">
                    <span className="material-symbols-outlined bold-icon text-white">
                      expand_circle_down
                    </span>
                  </button>
                </div>
                <div className="accordian-body">
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Full name<em>*</em>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>{userData.fullName}</div>
                        <button className="btn btn-transparent p-0 lh-18 ms-1" id="firstlock">
                          <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                            lock
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Phone Number
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div>{userData.phoneNumber}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1" data-bs-toggle="modal" data-bs-target="#link-phone-modal">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Gender<em>*</em>
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center" id="gender_txt">
                          <div>{userData.gender}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1" id="genderlock">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                        <label id="gender-error" className="error" htmlFor="gender"></label>
                      </div>
                    </div>
                  </div>

                  <div className="acc-row">
                    <div className="row-controls verify-control">
                      <div className="left">
                        E-mail
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center">
                          <div id="user_email">{userData.email}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1" data-bs-toggle="modal" data-bs-target="#link-email-modal" id="emailModal">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc-row">
                    <div className="row-controls">
                      <div className="left">
                        Refferal Code
                      </div>
                      <div className="right">
                        <div className="d-flex align-items-center" id="gender_txt">
                          <div>{userData.code}</div>
                          <button className="btn btn-transparent p-0 lh-18 ms-1" id="genderlock">
                            <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                              lock
                            </span>
                          </button>
                        </div>
                        <label id="gender-error" className="error" htmlFor="gender"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
