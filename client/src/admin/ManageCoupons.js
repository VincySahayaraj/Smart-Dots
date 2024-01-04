import React, { useState, useEffect } from "react";
import AdminLayout from "./Layout/AdminLayout";
import { Link } from "react-router-dom";
import {
  getCoupons,
  getCouponlogsByCouponId,
  getCouponLogs,
  updateCouponStatus,
} from "./apiAdmin";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Moment from "react-moment";
import { Modal, Badge } from "react-bootstrap";
import CreateIcon from "@material-ui/icons/Create";
import { CsvBuilder } from "filefy";
import { axiosInstance } from "../auth/axiosInterceptor";

const ManageCoupons = () => {
  const [values, setValues] = useState({
    btnloading: true,
  });

  const { btnloading } = values;
  const [showModal, setShowModal] = useState(false);

  let [couponLogs1, setCouponLogs1] = useState([]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  var columns = [
    { title: "id", field: "_id", hidden: true },
    {
      title: "Coupon Code",
      field: "coupon_code",
      render: (rowData) => {
        return (
          <span
            style={{ cursor: "pointer", color: "#00a6e6" }}
            onClick={() =>
              clickCoupon(rowData._id, rowData.coupon_code, rowData.description)
            }
          >
            {rowData.coupon_code}
          </span>
        );
      },
    },
    {
      title: "Start Date",
      field: "start_date",
      render: (rowData) => {
        return <Moment format="DD/MM/YYYY">{rowData.start_date}</Moment>;
      },
    },
    {
      title: "End Date",
      field: "end_date",
      render: (rowData) => {
        return <Moment format="DD/MM/YYYY">{rowData.end_date}</Moment>;
      },
    },
    {
      title: "No of times used",
      field: "times",
      render: (rowData) => {
        var tempCount = 0;
        for (var i = 0; i < couponLogs1.length; i++) {
          if (rowData._id === couponLogs1[i].couponid) {
            tempCount++;
          }
        }
        return tempCount;
      },
    },
    {
      title: "Coupon Value",
      field: "coupon_value",
      render: (rowData) => {
        return rowData.value_type === 1 ? (
          <span>$ {rowData.coupon_value}</span>
        ) : (
          <span>{rowData.coupon_value} %</span>
        );
      },
    },
    {
      title: "Coupon Type",
      field: "value_type",
      render: (rowData) => {
        return rowData.value_type === 1 ? "By amount" : "By Percentage";
      },
    },
    {
      title: "Customer Type",
      field: "customer_type",
      render: (rowData) => {
        if (rowData.customer_type === 1) {
          return (
            <Badge pill variant="primary">
              Prospective Customer
            </Badge>
          );
        } else if (rowData.customer_type === 2) {
          return (
            <Badge pill variant="danger">
              Unpaid Customer
            </Badge>
          );
        } else if (rowData.customer_type === 3) {
          return (
            <Badge pill variant="success">
              All Paid Customers
            </Badge>
          );
        } else if (rowData.customer_type === 4) {
          return (
            <Badge pill variant="success">
              By Product
            </Badge>
          );
        } else if (rowData.customer_type === 5) {
          return (
            <Badge pill variant="success">
              By Category
            </Badge>
          );
        } else if (rowData.customer_type === 6) {
          return (
            <Badge pill variant="success">
              Shipping
            </Badge>
          );
        } else {
          /*  else if(rowData.customer_type === 4){
                return <Badge pill variant="warning">Gold Subscribers</Badge>
            }
            else if(rowData.customer_type === 5){
                return <Badge pill variant="secondary">Silver Subscribers</Badge>
            } */
          return rowData.customer_type;
        }
      },
    },
    { title: "Coupon Limit", field: "coupon_limit" },
    {
      title: "Actions",
      sorting: false,
      render: (rowData) => (
        <Link to={`/admin/coupon/update/${rowData._id}`}>
          <CreateIcon />
        </Link>
      ),
    },
    {
      title: "Status",
      sorting: false,
      render: (rowData) => (
        <>{rowData?.status == 1 ? <>Active</> : <>Deactivated</>}</>
      ),
    },
    {
      render: (rowData) => {
        return (
          <>
            {" "}
            {rowData?.status == 1 ? (
              <>
                {" "}
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDeleteOpen(rowData._id, 2)}
                >
                  <DeleteOutline />
                </span>
              </>
            ) : (
              <>
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => handleDeleteOpen(rowData._id, 1)}
                >
                  <button className="btn-success">Activate</button>
                </span>
              </>
            )}
          </>
        );
      },
    },
  ];

  const handleDeleteOpen = async (id, status) => {
    let query = "";
    if (status == 1) {
      query = "activate";
    } else {
      query = "deactivate";
    }
    let concent = window.confirm(`Are you sure to ${query} this coupon?`);

    if (!concent) {
      return;
    }
    try {
      let data = await updateCouponStatus(id, status);

      if (!data.err) {
        loadCoupons();
      }
    } catch (err) {
      console.log("this is err", err);
    }
  };

  const [coupons, setCoupons] = useState([]);

  const loadCoupons = () => {
    getCoupons().then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, btnloading: false });
      } else {
        setCoupons(data);
        setValues({ ...values, btnloading: false });
      }
    });
  };

  const loadCouponLogList = () => {
    getCouponLogs().then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, btnloading: false });
      } else {
        setCouponLogs1(data);
        //setValues({...values, btnloading:false});
      }
    });
  };

  let [couponLogs, setCouponLogs] = useState([]);

  let [couponCode, setCouponCode] = useState("");

  let [couponDesc, setCouponDesc] = useState("");

  let [spinloading, setspinloading] = useState(false);

  const loadCouponLogs = (couponid) => {
    getCouponlogsByCouponId({ couponId: couponid }).then((data) => {
      if (data.error) {
        setspinloading(false);
        console.log(data.error);
      } else {
        setCouponLogs(data);
        setspinloading(false);
      }
    });
  };

  useEffect(() => {
    loadCouponLogList();
    loadCoupons();
  }, []);

  const clickCoupon = (couponid, couponName, description) => {
    setspinloading(true);
    setCouponLogs([]);
    setCouponCode("");
    loadCouponLogs(couponid);
    setCouponCode(couponName);
    setCouponDesc(description);
    setShowModal(true);
    return 0;
  };

  const couponLogList = couponLogs.map((p, i) => (
    <tr key={i}>
      <td>
        <Link
          style={{ color: "black" }}
          to={`/admin/user/details/${p.userid._id}`}
        >
          {p.userid.prefix + ". " + p.userid.cfirst + " " + p.userid.clast}
        </Link>
      </td>
      <td>
        <Link
          style={{ color: "black" }}
          to={`/admin/order/details/${p.orderid._id}`}
        >
          {p.orderid.orderid}
        </Link>
      </td>
      <td>
        <Moment format="DD/MM/YYYY">{p.createdAt}</Moment>
      </td>
    </tr>
  ));

  const showCouponModal = () => {
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{couponCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4><b>Coupon Code</b>:&nbsp;&nbsp;{couponCode}</h4> */}
          <h4>
            <b>Description</b>:&nbsp;&nbsp;{couponDesc}
          </h4>
          <h4>
            <b>Coupons used</b>:&nbsp;&nbsp;{couponLogs.length} times
          </h4>
          <br />
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Order Id</th>
                  <th>Used Date</th>
                </tr>
              </thead>
              <tbody>{!spinloading && couponLogList}</tbody>
            </table>
            {spinloading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              ""
            )}

            {!spinloading && couponLogs.length === 0 && (
              <>
                <br />
                <h4 style={{ textAlign: "center" }}>Sorry! No Logs found</h4>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const clean = (columnDef, rowData) => {
    if (columnDef.field === "times") {
      return columnDef.render(rowData);
    } else if (columnDef.field === "coupon_value") {
      return "$" + rowData[columnDef.field];
    } else if (columnDef.field === "value_type") {
      if (rowData[columnDef.field] === 1) {
        return "By Amount";
      } else {
        return "By percentage";
      }
    } else if (columnDef.field === "customer_type") {
      if (rowData[columnDef.field] === 1) {
        return "Prospective Customer";
      } else if (rowData[columnDef.field] === 2) {
        return "Unpaid customer";
      } else if (rowData[columnDef.field] === 3) {
        return "All Paid customer";
      }
    }

    return rowData[columnDef.field];
  };

  return (
    <AdminLayout topTitle="Manage Coupons">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title" style={{ textAlign: "center" }}>
                Manage Coupons
              </h4>
              {showCouponModal()}
              <MaterialTable
                title={<Link to="/create/coupon">Add new coupon</Link>}
                columns={columns}
                isLoading={btnloading}
                data={coupons}
                icons={tableIcons}
                options={{
                  pageSize: 10,
                  exportButton: {
                    csv: true,
                    pdf: false,
                  },
                  exportCsv: (columnList, initialData) => {
                    const column = columnList.filter((columnDef) => {
                      return (
                        !columnDef.hidden &&
                        columnDef.field &&
                        columnDef.export !== false
                      );
                    });
                    const data = initialData.map((rowData) => {
                      return column.map((columnDef) => {
                        return clean(columnDef, rowData);
                      });
                    });
                    const builder = new CsvBuilder("manage coupon" + ".csv");
                    builder
                      .setDelimeter(",")
                      .setColumns(column.map((columnDef) => columnDef.title))
                      .addRows(data)
                      .exportFile();
                  },
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: <h6>No coupons to display</h6>,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCoupons;
