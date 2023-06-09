import React from "react";
import AccountInfo from "../card-info/AccountInfo";

const Garage = () => {
  const infoAcc = [
    {
      name: "Status",
      content: "Active",
    },
    {
      name: "Name",
      content: "Min Min",
    },
    {
      name: "Email",
      content: "thanhminh145@gmail.con",
    },
    {
      name: "phone",
      content: "08123404985",
    },
  ];

  const infoGarage = [
    {
      name: "Garage",
      content: "Auto Garage",
    },
    {
      name: "Onwer",
      content: "Min Min",
    },
    {
      name: "Address",
      content: "Chi Nhanh 9",
    },
    {
      name: "Phone",
      content: "028123213143",
    },
  ];
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row justify-content-between align-items-center g-2 mb-3">
            {/* Title */}
            <div className="col-sm-6">
              <h4 className="d-flex align-items-center text-capitalize gap-2 mb-0 font-semibold text-lg">
                <img
                  width={"20"}
                  src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png"
                  alt=""
                  className="mb-1"
                />
                Garage Wallet
              </h4>
            </div>
          </div>
          {/* Detail */}

          <div className="row g-2">
            <div className="col-lg-4">
              <div className="card h-100 d-flex justify-content-center align-items-center">
                <div className="card-body d-flex flex-column gap-2 align-items-center justify-content-center">
                  <img
                    width={"48"}
                    className="mb-2"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw.png"
                    alt=""
                  />
                  <h3 className="mb-0 fz-24 font-semibold">1.000.000 VND</h3>
                  <div className="font-weight-bold text-capitalize mb-30">
                    amount earned
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-2">
                {/* Collected Cash */}
                <div className="col-md-6">
                  <div className="card card-body h-100 justify-content-center py-4">
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        <h3 className="mb-1 fz-24 font-semibold">
                          600.000 VND
                        </h3>
                        <div className="text-capitalize mb-0">
                          Collected Cash
                        </div>
                      </div>
                      {/* icon */}
                      <div>
                        <img
                          width={40}
                          src="https://6valley.6amtech.com/public/assets/back-end/img/cc.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total mechanic charge earned */}
                <div className="col-md-6">
                  <div className="card card-body h-100 justify-content-center py-4">
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        <h3 className="mb-1 fz-24 font-semibold">
                          400.000 VND
                        </h3>
                        <div className="text-capitalize mb-0">
                          total mechanic charge earned
                        </div>
                      </div>
                      {/* icon */}
                      <div>
                        <img
                          width={50}
                          src="https://static.vecteezy.com/system/resources/previews/004/621/033/original/income-raising-rgb-color-icon-fundraising-financial-growth-money-earning-mechanics-investment-profit-symbol-with-abstract-meaning-isolated-illustration-simple-filled-line-drawing-vector.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* total amount of service sold */}
                <div className="col-md-6">
                  <div className="card card-body h-100 justify-content-center py-4">
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        <h3 className="mb-1 fz-24 font-semibold">
                          400.000 VND
                        </h3>
                        <div className="text-capitalize mb-0">
                          total amount of service sold
                        </div>
                      </div>
                      {/* icon */}
                      <div>
                        <img
                          width={40}
                          src="https://media.istockphoto.com/id/1036660952/vector/auto-service-sign-car-repair-logo-eps.jpg?s=170667a&w=0&k=20&c=FbBig4JPZmNFJnWZXafuLb1q5dSffklykyeoYdkL6h8="
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*total amount of products in service sold */}
                <div className="col-md-6">
                  <div className="card card-body h-100 justify-content-center py-4">
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        <h3 className="mb-1 fz-24 font-semibold">
                          400.000 VND
                        </h3>
                        <div className="text-capitalize mb-0">
                          total amount of products in service sold
                        </div>
                      </div>
                      {/* icon */}
                      <div>
                        <img
                          width={40}
                          src="https://6valley.6amtech.com/public/assets/back-end/img/ttg.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Owner Account */}
        <AccountInfo title={"Owner Account"} items={infoAcc} />
        {/* Garage Info */}
        <AccountInfo title={"Shop Info"} items={infoGarage} />
      </div>
    </>
  );
};

export default Garage;
