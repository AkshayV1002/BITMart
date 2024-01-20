import React from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../components/styles/CartStyles.css"
import {Link} from "react-router-dom"
import toast from "react-hot-toast";


const AdminDashboard = () => {
  const [auth,setAuth] = useAuth();
  const handleLogout = () =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("LogOut Successful");
    window.location.reload()
  }
  return (
    <Layout>
    <div className="menu-layout">
        <div className="menu">
          <h1>
            Admin Panel
          </h1>
          <div className="menu-tabs">
          <a href="/dashboard/admin/profile">
              Update Profile
            </a>
            <a href="/dashboard/admin/create-product">
              Create Product
            </a>
            <a href="/dashboard/admin/products">
              Products
            </a>
            <a href="/dashboard/admin/users">
              Users
            </a>
            <Link onClick={handleLogout} to="/" className="nav_link">
          LogOut
        </Link>
          </div>
        </div>
        <div className="form ">
          <form className="form-container-2">
            <h1> Admin Details </h1>
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.contact}</h3>
              <h3 style={{display:auth?.user?.address?"block":"none"}}>Admin Address : {auth?.user?.address}</h3>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;