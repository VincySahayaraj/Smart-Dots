import React, { useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {Link} from 'react-router-dom'
import {getUsers,deleteUser} from './apiAdmin'
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

const ManageUsers = () => {
    const classes = useStyles();
    const [ btnLoading, setBtnloading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([])
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
        {title: "Title", field:"prefix", render: rowData => {return <span>{rowData.prefix ? rowData.prefix : "-"}</span>}},
        {title: "First Name", field: "cfirst",render: rowData =>  <Link to={`/admin/user/details/${rowData._id}`}>{rowData.cfirst}</Link>},
        {title: "Last name", field: "clast",render: rowData => <Link to={`/admin/user/details/${rowData._id}`}>{rowData.clast}</Link>},
        {title: "Email", field: "cemail"},
        {title: "Phone No", field: "cphone"},  
        {title: "Role", field: "role", render: rowData => {
            // return rowData.role === 0 ? <Badge pill variant="primary">Customer</Badge> :
            // <Badge pill variant="warning">Admin</Badge>

            return rowData.role === 0 ? (
                <Badge pill variant="primary">Customer</Badge>
              ) : rowData.role === 1 ? (
                <Badge pill variant="warning">Admin</Badge>
              ) :  (
                <Badge pill variant="success">Technician</Badge>
              );



        }},
        {title: "Status", field: "status", render: rowData => {
            return rowData.status === 1 ? <Badge pill variant="success">Active</Badge> :
            <Badge pill variant="danger">Deleted</Badge>
        }},
        {title: "Created At", field: "createdAt", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        /* {title: "Updated At", field: "updatedAt", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.updatedAt}</Moment>}}, */
        {title: "Actions",render: rowData => <Link to={`/admin/update/user/${rowData._id}`}><Edit /></Link>},
        {title: "",render: rowData => {return(<>{rowData.status==1?<><span style={{color:"red", cursor:'pointer'}} onClick={() => destroy(rowData._id,0)}><DeleteOutline /></span></>:<><span style={{color:"#106eea", cursor:'pointer'}} onClick={() => destroy(rowData._id,1)} >Activate</span></>}</>)}},
    ]

    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                setBtnloading(false);
                setError(data.error);
                setOpen(true);
            } else {
                setUsers(data);
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

    const destroy =( userId,status) => {
        let query=""
        if(status==1)
        {
            query="activate"
        }
        else
        {
            query="delete";
        }
        if(window.confirm(`Do you want to ${query} this user?`))
        {
            setBtnloading(true);
            deleteUser({userid:userId,status:status}).then(data => {
                if (data.error) {
                    setBtnloading(false);
                    setError(data.error);
                    setOpen(true);
                } else {
                    setOpen(false);
                    setError('');
                    loadUsers();
                }
            });
        }
    };

    useEffect(() => {
        loadUsers()
    }, [])

    const clean = (rowData,field)=>{
            if(field === "role"){
                if(rowData[field] === 0){
                    return "Customer"
                }else if(rowData[field] === 1){
                    return "Admin"
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
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Users</h4>

                                    <MaterialTable
                                    title={<Link to='/admin/add/user'>Add new user</Link>}
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={users}
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
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No users to display</h6> } }}
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

export default ManageUsers
