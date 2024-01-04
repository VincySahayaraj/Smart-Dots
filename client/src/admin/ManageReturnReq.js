import React, { useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {Link} from 'react-router-dom'
import {getReturnRequests,updateReturnReq} from './apiAdmin'
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
import { Modal,Badge } from 'react-bootstrap'
import { CsvBuilder} from 'filefy';


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

const ManageReturnReq = () => {

    const classes = useStyles();

    const [ btnLoading, setBtnloading] = useState(true);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [returnRequests, setreturnRequests] = useState([])

    const [showRejected, setShowRejected] = useState(false);

    let [reject_reason, setRejectReason] = useState("");

    let [returnID1,setReturnID] = useState("");

    let [retType,setRetType] = useState("");

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
        {title: "id", field: "_id", hidden: true},
        {title: "Order ID", field: "orderid",render: rowData => <Link to={`/admin/order/details/${rowData?.orderid?._id}/${rowData?.orderid?.userid}`}>{rowData?.orderid?.orderid}</Link>},
        {title: "Return Reason", field: "return_reason"},
        {title: "Return Message", field: "return_message"},
        {title: "Type", field: "return_type",render:rowData => { return (rowData.return_type === 1 ? "Replacement" : "Refund")}},
        {title: "Status", field: "return_status",render: rowData => {return ((rowData.return_status === 1 || rowData.return_status === 2) ? (rowData.return_status === 1 ? <Badge pill variant="success">Accepted</Badge> : <Badge pill variant="danger">Rejected</Badge>) : (showStatus(rowData._id, rowData.return_status,rowData.return_type)) ) }},
        {title: "Request Date",field: "createdAt",render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}}
    ]

    const loadReturnRequests = () => {
        getReturnRequests().then(data => {
            if (data.error) {
                setBtnloading(false);
                setError(data.error);
                setOpen(true);
            } else {
                setreturnRequests(data);
                setBtnloading(false);
                setError('');
                setOpen(false);
            }
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    }

    useEffect(() => {
        loadReturnRequests()
    }, [])

    const handleStatusChange = (e,returnId,return_type) => {
      
        if(window.confirm("Do you want to change this status?"))
        {
            if(Number(e.target.value) === 1){ //Return Accepted
                setBtnloading(true);
                updateReturnReq(returnId,{returnId:returnId, return_status:e.target.value,return_type}).then(data => {
                    if (data.error) {
                        setBtnloading(false);
                        //console.log("Status update failed");
                        setError(data.error);
                        setOpen(true);
                    } else {
                        loadReturnRequests();
                    }
                });

            }
            else { // Return Rejected
                setRetType(return_type);
                setReturnID(returnId)
                setShowRejected(true);
                return 0;
            }
            
        }
    }

    const [statusList] = useState([
        {label:"Accepted",value:"1"},
        {label:"Rejected",value:"2"}
    ])

    const showStatus = (Id, status1,return_type) => (
        <div className="form-group">
            <select  className="form-control" id="sel1" onChange={e => handleStatusChange(e,Id,return_type)}>
                <option value="">Choose Status</option>
                {
                    statusList.map(s => (
                    (Number(status1) === Number(s.value) ? <option key={s.value} value={s.value} selected>{s.label}</option> : <option key={s.value} value={s.value}>{s.label}</option>)
                    ))
                }
            </select>
        </div>
    )

    const handleChangeReason = (e) => {
        setRejectReason(e.target.value);
    }

    const clickSubmitReason = (e) => {
        //setBtnloading(true);
        updateReturnReq(returnID1, {returnId:returnID1, return_status:2,return_type:Number(retType),cancelled_reason:reject_reason}).then(data => {
            if (data.error) {
                setBtnloading(false);
                setError(data.error);
                setOpen(true);
            } else {
                setRejectReason("");
                setRetType("");
                setReturnID("");
                setShowRejected(false);
                loadReturnRequests();
            }
        });
    }

    const showRejectReasonModal = () => {
        return (
            <Modal show={showRejected} onHide={() => setShowRejected(false)}
            size="lg"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={clickSubmitReason}>
                    <div className="form-group">
                        <label className="text-muted">Reason<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeReason} type="text" className="form-control" value={reject_reason} required/>
                    </div>
                    <center>
                        <br/>
                        <button className="btn btn-outline-primary">Continue</button>
                    </center>
                    
                </form>
                </Modal.Body>

            </Modal>
        )
    }

const clean = (columnDef,rowData)=>{

    if(typeof(rowData[columnDef.field] === 'object')){
        if(columnDef.field ==='orderid'){
            return rowData[columnDef.field].orderid;
        }
    }

    if(columnDef.field ==='return_type'){
        if(rowData[columnDef.field] ===1){
            return "Replacement";
        }
        else{
            return "Refund";
        }
    }
    if((rowData.return_status === 1 || rowData.return_status === 2)){
        if(columnDef.field ==='return_status'){
            if(rowData[columnDef.field] ===1){
                return "Accepted";
            }
            else{
                return "Rejected";
            }
        }
    }
   
    return rowData[columnDef.field];
    
}


    return (
        <AdminLayout>

            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}><b>Manage Return Requests</b></h4>
                                    {showRejectReasonModal()}
                                    <MaterialTable
                                    title={""}
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={returnRequests}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10,
                                        exportButton:{
                                            csv:true,
                                            pdf:false
                                        },
                                        exportCsv:(columnList,initialData)=>{
                                            const column = columnList.filter(columnDef=>{
                                                return !columnDef.hidden && columnDef.field && columnDef.export !==false;
                                            })
                                            const data = initialData.map(rowData=>{
                                                return(
                                                    column.map(columnDef=>{
                                                        return clean(columnDef,rowData);
                                                        // return rowData[columnDef.field]
                                                    })
                                                )
                                            })
                                            const builder = new CsvBuilder("manage return requests"+".csv")
                                            builder
                                            .setDelimeter(',')
                                            .setColumns(column.map(columnDef=>columnDef.title))
                                            .addRows(data)
                                            .exportFile();
                                        }
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No Return Requests to display</h6> } }}
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

export default ManageReturnReq
