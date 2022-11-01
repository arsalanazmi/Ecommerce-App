import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webfont from "webfontloader";
import {
  Header,
  Footer,
  Home,
  ProductDetails,
  Products,
  Search,
  LoginSignUp,
  UserOptions,
  Profile,
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  ResetPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  OrderSuccess,
  MyOrders,
  OrderDetails,
} from "./Routes";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeAPiKey] = useState("");

  async function getStripeAPiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeAPiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeAPiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />

        <Route exact path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route>

        <Route exact path="/me/update" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route exact path="/password/update" element={<ProtectedRoute />}>
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/Cart" element={<Cart />} />

        <Route exact path="/shipping" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />} />
        </Route>

        <Route exact path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        <Route element={<ProtectedRoute />} />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}

        <Route exact path="/success" element={<ProtectedRoute />}>
          <Route exact path="/success" element={<OrderSuccess />} />
        </Route>

        <Route exact path="/orders" element={<ProtectedRoute />}>
          <Route exact path="/orders" element={<MyOrders />} />
        </Route>

        <Route exact path="/order/:id" element={<ProtectedRoute />}>
          <Route exact path="/order/:id" element={<OrderDetails />} />
        </Route>
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
