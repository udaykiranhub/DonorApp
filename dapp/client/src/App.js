import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("./components/Home"));
const NavBar=lazy(()=> import("./components/NavBar"));
const Register=lazy(()=>import("./components/DonarRegistration"))
const Donors=lazy(()=>import("./components/GetAllDonors"))


const Profile=lazy(()=>import ("./components/profile"))

function App() {
  return (
    <Router>
      <Helmet>
        <title>HomoChain</title>
        <meta name="description" content="Welcome To my Dapp" />
      </Helmet>


      <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
        
            <Route path="/profile" element={<Profile/>} />
            <Route path="/RegisterDonar" element={<Register/>} />
            <Route path="/allDonors" element={<Donors/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
