import React from "react";
import SignIn from "./pages/SignIn/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customer/Customers";
import MainLayout from "./pages/MainLayout";
import Review from "./pages/Customer/Review";
import CustomerDetail from "./pages/Customer/CustomerDetail";
import AddOwner from "./pages/Onwer/AddOwner";
import Onwers from "./pages/Onwer/Onwers";
import AddMechanic from "./pages/Mechanic/AddMechanic";
import Mechanics from "./pages/Mechanic/Mechanics";
import Chat from "./pages/Mechanic/MechanicDetail";
import Employees from "./pages/Employee/Employees";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import Import from "./pages/Product/Import";
import AddService from "./pages/Service/AddService";
import Services from "./pages/Service/Services";
import Coupon from "./pages/Coupon/Coupon";
import Deal from "./pages/Coupon/Deal";
import All from "./pages/Order/All";
import Pending from "./pages/Order/Pending";
import Confirm from "./pages/Order/Confirm";
import Cancel from "./pages/Order/Cancel";
import AdminReport from "./pages/Report/AdminReport";
import TransactionReport from "./pages/Report/TransactionReport";
import OnwerReport from "./pages/Report/OnwerReport";
import OrderDetail from "./pages/Order/OrderDetail";
import ReviewDetail from "./pages/Customer/ReviewDetail";
import OwnerDetail from "./pages/Onwer/OwnerDetail";
import TableDemo from "./pages/TableDemo";
import authService from "./features/auth/authService";

function App() {
  const user = authService.getCurrentUser();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          
            <Route path="/admin" element={<MainLayout />}>
              <Route path="" element={<Dashboard />} />
              {/* CUSTOMER */}
              <Route path="list-customer" element={<Customers />} />
              <Route path="customer/view/:id" element={<CustomerDetail />} />
              <Route path="review-list-customer" element={<Review />} />
              <Route path="service/view/:id" element={<ReviewDetail />} />
              {/* ONWER */}
              <Route path="owner" element={<AddOwner />} />
              <Route path="owner-list" element={<Onwers />} />
              <Route path="owner/view/:id" element={<OwnerDetail />} />

              {/* MECHANIC */}
              <Route path="add-new-mechanics" element={<AddMechanic />} />
              <Route path="list-mechanics" element={<Mechanics />} />
              <Route path="mechanic/detail/:id" element={<Chat />} />

              {/* EMPLOYEE */}
              <Route path="list-employee" element={<Employees />} />
              {/* CATEGORY */}
              <Route path="view-category" element={<Categories />} />

              {/* PRODUCT */}
              <Route path="list-product" element={<Products />} />
              <Route path="import" element={<Import />} />
              {/* SERVICES */}
              <Route path="add-new-service" element={<AddService />} />
              <Route path="list-service" element={<Services />} />
              {/* COUPON */}
              <Route path="coupon" element={<Coupon />} />
              <Route path="deal" element={<Deal />} />
              {/* ORDER */}
              <Route path="all-orders" element={<All />} />
              <Route path="orders/details/:id" element={<OrderDetail />} />

              <Route path="pending-order" element={<Pending />} />
              <Route path="confirm-order" element={<Confirm />} />
              <Route path="cancel-order" element={<Cancel />} />
              {/* REPORT */}
              <Route path="admin-report" element={<AdminReport />} />

              <Route
                path="order-transaction-list"
                element={<TransactionReport />}
              />
              <Route path="owner-report" element={<OnwerReport />} />
              <Route path="test" element={<TableDemo />} />
            </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
