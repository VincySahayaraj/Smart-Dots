import React, { useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {Link} from 'react-router-dom'
import {getOrders} from './apiAdmin'
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { Badge } from 'react-bootstrap';
import { CsvBuilder } from 'filefy';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const ManageOrders = () => {

    const classes = useStyles();

    const [loading, setloading] = useState(true);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [orders, setOrders] = useState([]);

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

    var columns = [
        {title: "id", field:"_id", hidden: true},
        {title: "Order ID", field: "orderid",render: rowData => {
            if(rowData.source){
                return <span><Link to={`/admin/order/details/${rowData._id}/${rowData.userid._id}`}>{rowData.orderid}</Link><br/><b>Source:&nbsp;{rowData.source}</b></span>
            }
            else {
                return <Link to={`/admin/order/details/${rowData?._id}/${rowData?.userid?._id}`}>{rowData?.orderid}</Link>
            }
        }},
        {title: "Name", field: "userid.prefix",render: rowData => <Link to={`/admin/user/details/${rowData?.userid?._id}`}>{rowData?.userid?.prefix}.{rowData?.userid?.cfirst} {rowData?.userid?.clast}</Link>}, 
        {title: "Date of Order", field: "createdAt", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        {title: "Products Purchased", field: "title"},
        {title: "Price($)", field: "price",render: rowData => {return (<><span><b>Purchase:</b> {(rowData.price+rowData.shipping_charge).toFixed(2)}</span><br/><span><b>Discount:</b> {rowData.discount.toFixed(2)}</span></>)}},
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

    const loadOrders = () => {
        getOrders().then(data => {
            if(data.error){
                setloading(false);
                setError(data.error);
                setOpen(true);
            }
            else {
                setOrders(data);
                setloading(false);
                setError('');
                setOpen(false);           
            }
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    }

    useEffect(() => {
        loadOrders()
    }, [])

const clean =(columnDef,rowData)=>{

    if(typeof(rowData[columnDef.field]) ==='object'){
        if(columnDef.field ==='userid'){
            return rowData[columnDef.field].prefix+" "+rowData[columnDef.field].cfirst+" "+rowData[columnDef.field].clast
        }
    }

    if(columnDef.field ==='paymentId'){
        if((rowData.status === "Awaiting Payment") || (rowData.paymentId === "undefined") || (rowData.paymentId === "null") || (rowData.paymentId === undefined)){
            return "Unpaid";
        }
        else{
            return "Paid," +" "+ "Date:"+" "+rowData.payment_date;
        }
    }
    if(columnDef.field === 'price'){
        return "Purchase:"+" "+rowData.price.toFixed(2)+","+"Discount:"+rowData.discount.toFixed(2)
    }
    else{
        return(rowData[columnDef.field])
    }
    
}

    return (
        <AdminLayout>

            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Orders</h4>

                                    <MaterialTable
                                    title={""}
                                    columns={columns}
                                    isLoading={loading}
                                    data={orders}
                                    icons={tableIcons}
                                    
                                    options={{
                                        search: true,
                                        pageSize:10,
                                        exportButton:{
                                            csv:true,
                                            pdf:false,
                                           
                                        },
                                        exportCsv:(columnList,initialData)=>{
                                            const column = columnList.filter(columnDef=>{
                                                return !columnDef.hidden && columnDef.field && columnDef.export !==false;
                                            })
                                            const data = initialData.map(rowData=>{
                                                return(
                                                    column.map(columnDef=>{
                                                        return clean(columnDef,rowData);
                                                    })
                                                )
                                            })
                                            const builder = new CsvBuilder("manage orders"+".csv")
                                            builder
                                            .setDelimeter(',')
                                            .setColumns(column.map(columnDef=>columnDef.title))
                                            .addRows(data)
                                            .exportFile();
                                        }
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No orders to display</h6> } }}
                                    />

                                    <div className={classes.root}>
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

export default ManageOrders
