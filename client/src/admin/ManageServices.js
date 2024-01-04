import React, { useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {Link} from 'react-router-dom'

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
import { Badge } from 'react-bootstrap'
import { CsvBuilder } from 'filefy';
import { getServices,deleteService } from './apiAdmin';
import moment from "moment";
import { useContext } from 'react'
import { AuthContext } from '../globalStates';

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

const ManageServices = () => {
    const classes = useStyles();
    const [authState, setauthState] = useContext(AuthContext);
    const [ btnLoading, setBtnloading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [mowers, setMowers] = useState([]);
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

        { title: "id", field: "_id", hidden: true },
        { title: "Service Name", field: 'serviceName', render: rowData => { return <span>{rowData.serviceName}</span> } },
        { title: "Updated At", field: "updatedAt", hidden: true }, 
        { title: "Actions", render: rowData => <Link to={`/admin/update/service/${rowData._id}`}><Edit /></Link> },
        {title: "",
            render: rowData => {
                if (rowData.status === 0) {
                    return <span style={{ color: "red", cursor: 'pointer' }} onClick={() => destroy(rowData._id, 1)}><DeleteOutline /></span>
                }
                else if (rowData.status === 1) {
                    return <span style={{ backgroundColor: '#5cb85c', color: 'white', cursor: 'pointer', borderRadius: '20px' }} className="btn" onClick={() => destroy(rowData._id, 0)}>Activate</span>
                }
            }
        },
    ]

    function sortDataByUpdatedAt(data) {
        return data.slice().sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA; // Sort in descending order, adjust as needed
        });
      }

    const loadServices= () => {
        getServices().then(data => {
            if (data.error) {
                setBtnloading(false);
                setError(data.error);
                setOpen(true);
            } else {
                const datas = data;
                const sortedData = sortDataByUpdatedAt(datas);
                // const sortedData = [...datas].sort((a, b) => a.mowerName - b.mowerName);
                setMowers(sortedData);
                setError('');
                setOpen(false);
                setBtnloading(false);
            }
        });
    }


  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    }

    const destroy =( serviceId,status) => {
        let query=""
        if(status==1)
        {
            query="activate"
        }
        else
        {
            query="delete";
        }
        if(window.confirm(`Do you want to ${query} this service?`))
        {
            setBtnloading(true);

            console.log("delete service",{id:serviceId,status:status,updated_by:authState._id});
            deleteService({id:serviceId,status:status,updated_by:authState._id}).then(data => {
                console.log("data after deleting",data);
                if (data.error) {
                    setBtnloading(false);
                    setError(data.error);
                    setOpen(true);
                } else {
                    setOpen(false);
                    setError('');
                    loadServices();
                }
            });
        }
    };

    useEffect(() => {
        loadServices()
        
    }, [])

    const clean = (rowData,field)=>{
            if(field === "role"){
                if(rowData[field] === 0){
                    return "Customer"
                }else if(rowData[field] === 1){
                    return "Admin"
                }
                else{
                    return "Technician"
                }
                
            }else if(field === "status"){
                if(rowData[field] === 0){
                    return "Deleted"
                }else if(rowData[field] === 1){
                    return "Active"
                }
            }else{
                return rowData[field]
            }
    }
    return (
        <AdminLayout>
            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Services</h4>
                                    <MaterialTable
                                    title={<Link to='/admin/add/service'>Add new service</Link>}
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={mowers}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10,
                                        exportButton:{
                                            csv:true,
                                            pdf:false
                                        },
                                        exportCsv : (columnList, initialData) => {
                                            // cleaning up the titles
                                            const columns = columnList.filter(columnDef => {
                                              return !columnDef.hidden && columnDef.field && columnDef.export !== false;
                                            });
                                            const data = initialData.map(rowData =>
                                              columns.map(columnDef => {
                                                return columnDef.render ? clean(rowData,columnDef.field) : rowData[columnDef.field];
                                              })
                                            );
                                            const builder = new CsvBuilder('user_data' + '.csv');
                                            builder
                                              .setDelimeter(',')
                                              .setColumns(columns.map(columnDef => columnDef.title))
                                              .addRows(data)
                                              .exportFile();
                                          }
                                            
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No services to display</h6> } }}
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

export default ManageServices
