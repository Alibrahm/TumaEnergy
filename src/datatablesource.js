import {React, useEffect, useState} from "react";
import axios from "axios";

const DatatableSource = () => {

  const [orders,setOrders] = useState([]);
  console.log("console....",orders)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://skiza-app-dy3qp.ondigitalocean.app/api/v1/skiza/subscribed/list', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTa2l6YSB0dW5lcyIsInN1YiI6IlZBUyBQYWFTIiwiZXhwIjoxNjc4MjE3MTY0LCJuYmYiOjE2NzgyMTM1NjQsImlhdCI6MTY3ODIxMzU2NCwianRpIjoiMiJ9.gnd3TtsXwpB1VYipniWH0B8KuzOKic9B1ehHR_CkyoU'
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>{}</div>
  )
}

export default DatatableSource



export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  // {
  //   field: "user",
  //   headerName: "User",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //         {params.row.username}
  //       </div>
  //     );
  //   },
  // },
  {
    field: "email",
    headerName: "Tune_code",
    width: 230,
  },

  {
    field: "age",
    headerName: "Status",
    width: 100,
  },
  {
    field: "age",
    headerName: "Date Created",
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data

export const userRows = orders


// export const userRows = [
  
//   // {
//   //   id: 1,
//   //   username: "Snow",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   status: "active",
//   //   email: "1snow@gmail.com",
//   //   age: 35,
//   // },
//   // {
//   //   id: 2,
//   //   username: "Jamie Lannister",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "2snow@gmail.com",
//   //   status: "passive",
//   //   age: 42,
//   // },
//   // {
//   //   id: 3,
//   //   username: "Lannister",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "3snow@gmail.com",
//   //   status: "pending",
//   //   age: 45,
//   // },
//   // {
//   //   id: 4,
//   //   username: "Stark",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "4snow@gmail.com",
//   //   status: "active",
//   //   age: 16,
//   // },
//   // {
//   //   id: 5,
//   //   username: "Targaryen",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "5snow@gmail.com",
//   //   status: "passive",
//   //   age: 22,
//   // },
//   // {
//   //   id: 6,
//   //   username: "Melisandre",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "6snow@gmail.com",
//   //   status: "active",
//   //   age: 15,
//   // },
//   // {
//   //   id: 7,
//   //   username: "Clifford",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "7snow@gmail.com",
//   //   status: "passive",
//   //   age: 44,
//   // },
//   // {
//   //   id: 8,
//   //   username: "Frances",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "8snow@gmail.com",
//   //   status: "active",
//   //   age: 36,
//   // },
//   // {
//   //   id: 9,
//   //   username: "Roxie",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "snow@gmail.com",
//   //   status: "pending",
//   //   age: 65,
//   // },
//   // {
//   //   id: 10,
//   //   username: "Roxie",
//   //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   //   email: "snow@gmail.com",
//   //   status: "active",
//   //   age: 65,
//   // },
// ];
