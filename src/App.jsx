import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {AuthProvide} from './context/AuthContext'

const App = () => {
  return (
    <>
    <AuthProvide>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-8 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
      </AuthProvide>
    </>
  );
};

export default App;
