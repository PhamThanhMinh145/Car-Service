import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import Garage from "../../components/Garage&Owner/Garage";
import Order from "../../components/Garage&Owner/Order";

import ReviewGarage from "../../components/Garage&Owner/ReviewGarage";
import { useSelector } from "react-redux";
import EmployeeByGarage from "../../components/Garage&Owner/EmployeeGarage";
import Service from "../../components/Garage&Owner/Service";
import CarParking from "../../components/Garage&Owner/CarParking";
import CouponGarage from './../../components/Garage&Owner/CouponGarage';

const tabs = ["garage", "đơn hàng", "đánh giá", "nhân viên", "dịch vụ" , "khu vực sửa xe","khuyến mãi"];
const OwnerDetail = () => {
  const [type, setType] = useState("garage");
  const navigate = useNavigate();
  const garageDetail = useSelector((state) => state.garage.garage);
  useEffect(() => {
    document.title = `${garageDetail.garageName}`;
  }, []);

  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8 mb-5">
      <Header
        icon={
          "https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
        }
        alt={"owner detail"}
        title={"Chi tiết garage"}
      />

      {/* Button back  */}
      <div className="flex-between d-sm-flex row align-items-center justify-content-between mb-2 mx-1">
        <div>
          <Link
            className="btn btn--primary mt-3 mb-3 text-base"
            onClick={() => {
              navigate(-1);
            }}
          >
            Trở về danh sách garage
          </Link>
        </div>
      </div>
      {/* Navbar page */}
      <div className="page-header">
        {/* name of garage */}
        <div className="flex-between row mx-1">
          <h1 className="page-header-title text-xl font-semibold">
            {garageDetail.garageName}
          </h1>
        </div>
        <div className="js-nav-scroller hs-nav-scroller-horizontal">
          <ul className="nav nav-tabs flex-wrap page-header-tabs">
            {tabs.map((tap) => (
              <li
                style={{ backgroundColor: "#f9f9fb", zIndex: 10 }}
                className="nav-item"
                key={tap}
              >
                <Link
                  className={
                    tap === type ? "nav-link active" : "nav-link capitalize"
                  }
                  onClick={() => setType(tap)}
                >
                  {tap}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Garage */}
      {type === "garage" && <Garage key="garage" />}
      {/* Order */}
      {type === "đơn hàng" && <Order  key="order" />}

      {/* Review */}
      {type === "đánh giá" && <ReviewGarage   key="review" />}
      {/* Employee */}
      {type === "nhân viên" && <EmployeeByGarage  key="employee" />}
      {/* Service */}
      {type === "dịch vụ" && <Service key="service" />}
      {/* Car parking */}
      {type === "khu vực sửa xe" && <CarParking  key="carParking"/>}
      {type === "khuyến mãi" && <CouponGarage  key="couponGarage"/>}
    </div>
  );
};

export default OwnerDetail;
