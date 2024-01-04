import React, {useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import Moment from 'react-moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {getOrderByUserId, getUser} from './apiAdmin'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStylesErr = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const UserDetails = ({match}) => {

    const classes = useStyles();

    const Errorclasses = useStylesErr();

    const [ error, setError ] = useState("");

    const [open, setOpen] = useState(false);

    const [user, setUser] = useState([]);

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const loadUser = (userId) => {
        getUser(userId).then(data => {
            if(data.error){
                setLoading(false);
                setError(data.error);
                setOpen(true);
            }
            else {
                setUser(data);
                loadOrders(match.params.userId);
            }
        })
    }

    useEffect(() => {
        loadUser(match.params.userId);
    }, []);

    const loadOrders = (userId) => {
        getOrderByUserId({userId}).then(data => {
            if(data.error){
                setLoading(false);
                setError(data.error);
                setOpen(true);
            }
            else {
                setOrders(data);
                setLoading(false);
            }
        })
    }

    const showUserDetails = () => (
        <div className="card mb-4 bord-line">
            <div className="card-body">
                <div className="row">
                    
                        <div className={user.csadd ? "col-md-6" : "col-md-12"}>
                            <p className="card-text"><b>Prefix : </b>{user.prefix}</p>
                            <p className="card-text"><b>First Name : </b>{user.cfirst}</p>
                            <p className="card-text"><b>Last Name : </b>{user.clast}</p>
                            <p className="card-text"><b>Email : </b>{user.cemail}</p>
                            <p className="card-text"><b>Phone : </b>{user.cphone}</p>
                            {user.cdob && <p className="card-text"><b>DOB : </b>{user.cdob}</p>}
                            <p className="card-text"><b>Role : </b>{user.role === 0 ? <Badge pill variant="primary">Customer</Badge> : <Badge pill variant="warning">Admin</Badge>}</p>
                            <p className="card-text"><b>Status : </b>{user.status === 1 ? <Badge pill variant="success">Active</Badge> : <Badge pill variant="danger">Deleted</Badge>}</p>
                        </div>

                        {user.csadd && <div className="col-md-6">
                            <p className="card-text"><b>Address 1 : </b>{user.csadd}</p>
                            <p className="card-text"><b>Address 2 : </b>{user.csadd2 ? user.csadd : '-'}</p>
                            <p className="card-text"><b>City : </b>{user.ccity}</p>
                            <p className="card-text"><b>State : </b>{user.cstate}</p>
                            <p className="card-text"><b>Zip : </b>{user.czip}</p>
                        </div>}
                   
                </div>
            </div>
        </div>
    )

    var columns = [
        {title: "id", field:"_id", hidden: true},
        {title: "Order ID", field: "orderid",render: rowData => {
            if(rowData.source){
                return <span><Link to={`/admin/order/details/${rowData._id}/${rowData.userid._id}`}>{rowData.orderid}</Link><br/><b>Source:&nbsp;{rowData.source}</b></span>
            }
            else {
                return <Link to={`/admin/order/details/${rowData._id}/${rowData.userid._id}`}>{rowData.orderid}</Link>
            }
        }},
        {title: "Name", field: "userid",render: rowData => <Link to={`/admin/user/details/${rowData.userid._id}`}>{rowData.userid.prefix}.{rowData.userid.cfirst} {rowData.userid.clast}</Link>}, 
        {title: "Date of Order", field: "createdAt", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        {title: "Products Purchased", field: "title"},
        {title: "Price($)", field: "price",render: rowData => {return (<><span><b>Purchase:</b> {rowData.price.toFixed(2)}</span><br/><span><b>Discount:</b> {rowData.discount.toFixed(2)}</span></>)}},
        {title: "Payment Status", field:"paymentId", render: rowData => { return ((rowData.status === "Awaiting Payment") || ((rowData.paymentId === "undefined") || (rowData.paymentId === "null") || (rowData.paymentId === undefined)) ? <span>UnPaid</span>
            : <><span>Paid</span><br/><span><b>Date:</b> <Moment format='DD/MM/YYYY'>{rowData.payment_date}</Moment></span></>)}},
        {title: "Order Status", field: "status", render:rowData => { 
                if(rowData.status === "Awaiting Payment"){
                    return <Badge pill variant="danger">{rowData.status}</Badge>
                }
                else if(rowData.status === "Awaiting Customer Pre-configuration"){
                    return <Badge pill variant="warning">{rowData.status}</Badge>
                }
                else if(rowData.status === "Customer Pre-configuration Complete"){
                    return <Badge pill variant="primary">{rowData.status}</Badge>
                }
                else if(rowData.status === "SmartDots Pre-configuration Complete"){
                    return <Badge pill variant="primary">{rowData.status}</Badge>
                }
                else if(rowData.status === "Shipped"){
                    return <Badge pill variant="info">{rowData.status}</Badge>
                }
                else if(rowData.status === "Delivered"){
                    return <Badge pill variant="success">{rowData.status}</Badge>
                }
                else if(rowData.status === "Order Cancelled"){
                    return <Badge pill variant="danger">{rowData.status}</Badge>
                }
                else if(rowData.status === "Delayed"){
                    return <Badge pill variant="warning">{rowData.status}</Badge>
                }
                else if(rowData.status === "Return Completed"){
                    return <Badge pill variant="success">{rowData.status}</Badge>
                }
                else {
                    return <Badge pill variant="primary">{rowData.status}</Badge>
                }
        }}
    ]

    const showOrder = () => (
        <div className="bord-line">
            <div className="row">
                <div className="col-md-12">
                    {/* <h4 style={{color:"#106eea"}}>Orders : </h4><br/> */}
                    <MaterialTable
                        title="Order History"
                        columns={columns}
                        isLoading={loading}
                        data={orders}
                        icons={tableIcons}
                        localization={{ body:{ emptyDataSourceMessage:<h6>No orders to display</h6> } }}
                    />

                </div>
            </div>
        </div>
    )

    return (
        <AdminLayout>

            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h2 style={{textAlign:'center', color:"#106eea"}}>User Details</h2>
                            
                            {(!loading && user._id) && showUserDetails()}

                            {(!loading && user._id) && showOrder()}
                    

                            <Backdrop className={classes.backdrop} open={loading} >
                                <CircularProgress color="inherit" />
                            </Backdrop>

                            <div className={Errorclasses.root}>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>                                             
                                    <Alert onClose={handleClose} severity="error">{error}</Alert>                                                                                  
                                </Snackbar>
                            </div> 

                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default UserDetails
