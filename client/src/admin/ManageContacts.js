import React, { useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {getContacts,deleteContacts} from './apiAdmin'
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
import { Badge } from 'react-bootstrap'
import Moment from 'react-moment';
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

const ManageContacts = () => {

    const classes = useStyles();

    const [ btnLoading, setBtnloading] = useState(true);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [contacts, setContacts] = useState([])

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
        {title: "Contact Name", field: "contactName"},
        {title: "Email", field: "email"},
        {title: "Message", field: "message"},
        {title: "Type",field:"type", render: rowData => {
            if(rowData.reg_type === 1){
                return <Badge pill variant="success">Homepage</Badge>
            }
            else if(rowData.reg_type === 2){
                return <Badge pill variant="info">Contact</Badge>
            }
        }},
        {title: "Created At", field: "createdAt", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        {title: "Actions",render: rowData => <span style={{color:"#106eea", cursor:'pointer'}} onClick={() => destroy(rowData._id)}><DeleteOutline /></span>},
        
    ]

    const loadContacts = () => {
        getContacts().then(data => {
            if (data.error) {
                setBtnloading(false);
                setError(data.error);
                setOpen(true);
            } else {
                setContacts(data);
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

    const destroy = contactId => {
        if(window.confirm("Do you want to delete this contact?"))
        {
            setBtnloading(true);
            deleteContacts(contactId).then(data => {
                if (data.error) {
                    setBtnloading(false);
                    setError(data.error);
                    setOpen(true);
                } else {
                    setOpen(false);
                    setError('');
                    loadContacts();
                }
            });
        }
    };

    useEffect(() => {
        loadContacts()
    }, [])

const clean=(columnDef,rowData)=>{
    if(columnDef.field ==='type'){
        if(rowData.reg_type ===1 ){
            return "Homepage"
        }else{
            return "Contact"
        }
    }

    return rowData[columnDef.field]
}

    return (
        <AdminLayout>

            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Contacts</h4>

                                    <MaterialTable
                                    title={""}
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={contacts}
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
                                                    })
                                                )
                                            })
                                         
                                            const builder = new CsvBuilder("manage contacts"+".csv")
                                            builder
                                            .setDelimeter(',')
                                            .setColumns(column.map(columnDef=>columnDef.title))
                                            .addRows(data)
                                            .exportFile();
                                        }
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No contacts to display</h6> } }}
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

export default ManageContacts
