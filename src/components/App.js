import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage/LandingPage";
import Signin from "./pages/login/Signin";
import Signup from "./pages/signup/Signup";
import { AuthProvider } from "./provider/AuthProvider";
import { StayPage } from "./pages/stayPage/StayPage";
import StayHotel from "./pages/stayPage/stayHotel/StayHotel";
import AuthNavigator from "./navigator/AuthNavigator";
import StayDetailsPage from "./pages/stayPage/paymentPage/StayDetailsPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import FlightLandingPage from "./flightLandingPage/FlightLandingPage";
import { FlightPage } from "./pages/flightPage/FlightPage";
import FlightCustomerDetails from "./pages/flightPage/flightCustomerDetails/FlightCustomerDetails";
import FlightPaymentPage from "./pages/flightPage/flightPaymentPage/FlightPaymentPage";

function App() {
  return (
    <div className="app-conatiner">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/staypage"
            element={
              <AuthNavigator>
                <StayPage />
              </AuthNavigator>
            }
          />
          <Route
            path="/hotel/:stayHotelId"
            element={
              <AuthNavigator>
                <StayHotel />
              </AuthNavigator>
            }
          />
          <Route
            path="/hotel/customerDetails/:stayHotelId"
            element={
              <AuthNavigator>
                <StayDetailsPage />
              </AuthNavigator>
            }
          />
          <Route
            path="/hotel/payment"
            element={
              <AuthNavigator>
                <PaymentPage />
              </AuthNavigator>
            }
          />
          <Route
            path="/flightlandingpage"
            element={<FlightLandingPage />}
          ></Route>
          <Route
            path="/flightpage"
            element={
              <AuthNavigator>
                <FlightPage />
              </AuthNavigator>
            }
          />
          <Route
            path="/flightpage/userdetails"
            element={
              <AuthNavigator>
                <FlightCustomerDetails />
              </AuthNavigator>
            }
          />
          <Route
            path="/flight/payment"
            element={
              <AuthNavigator>
                <FlightPaymentPage />
              </AuthNavigator>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
