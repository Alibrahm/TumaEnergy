import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import OrderTable from "../../components/orders/ordersDatatable"
const Orders = () => {
 

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
       <OrderTable/>
      </div>
    </div>
  );
};

export default Orders;
