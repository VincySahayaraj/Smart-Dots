import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "./Layout/AdminLayout";
import { AuthContext } from "../globalStates";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { API } from "../config";
import { axiosInstance } from "../auth/axiosInterceptor";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const AdminDashboard = () => {
  const [authState] = useContext(AuthContext);

  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashBoardData = async () => {
    try {
      let { data } = await axiosInstance.get(
        `${API}/get/fetchDashboardDetails`
      );

      console.log("dataa", data);
      setDashboardData(data?.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return (
    <AdminLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">
              Welcome to SmartDots Admin Panel, {authState.lastName}
            </h3>
          </div>
        </div>
      </div>

      {dashboardData != null && (
        <>
          <h3 style={{ paddingTop: "8%" }}>Smart-Dots Overview:</h3>
          <Box display="flex" alignItems="center" justifyContent="center">
            <React.Fragment>
              <CardContent style={{ backgroundColor: "#3f51b5" ,color:"white" }}>
                <Typography
                  sx={{ fontSize: 19 }}
                  color="white"

                  gutterBottom
                  style={{ fontWeight: "900px" }}
                >
                  Total Users
                </Typography>
                <Typography variant="h5" component="div">
                  {dashboardData?.totalUsers}
                </Typography>
                <Typography sx={{ mb: 1.5 }}                   color="white"
>
                  Totally registered to smartdots
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </React.Fragment>

            <React.Fragment>
              <CardContent style={{ backgroundColor: "#3f51b5",color:"white"  }}>
                <Typography
                  sx={{ fontSize: 17 }}
                  color="white"

                  gutterBottom
                >
                  Total Orders
                </Typography>
                <Typography variant="h5" component="div">
                  {dashboardData?.totalOrders}
                </Typography>
                <Typography sx={{ mb: 1.5 }}                   color="white"
>
                  Total Orders created
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </React.Fragment>

            <React.Fragment>
              <CardContent style={{ backgroundColor: "#3f51b5",color:"white"  }}>
                <Typography
                  sx={{ fontSize: 17 }}
                  color="white"

                  gutterBottom
                >
                  Total Products
                </Typography>
                <Typography variant="h5" component="div">
                  {dashboardData?.totalProducts}
                </Typography>
                <Typography sx={{ mb: 1.5 }}                   color="white"
>
                  Total Products in SmartDots
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </React.Fragment>

            <React.Fragment>
              <CardContent style={{ backgroundColor: "#3f51b5",color:"white" }}>
                <Typography
                  sx={{ fontSize: 17 }}
                  color="white"
                  
                  gutterBottom
                >
                  Total Categories
                </Typography>
                <Typography variant="h5" component="div">
                  {dashboardData?.totalCategories}
                </Typography>
                <Typography sx={{ mb: 1.5 }}  color="white"
>
                  Total Categories for products
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </React.Fragment>
          </Box>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
