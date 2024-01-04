import React, { useState, useEffect, useContext, forwardRef } from 'react'
import { AuthContext } from '../globalStates';
import UserLayout from './Layout/UserLayout'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getMowerDetailsById, getMowersByUserId,getMowers, updateCardStatus } from './apiUser';
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
import Moment from 'react-moment';
import MaterialTable from "material-table";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { API } from '../config'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { fetchConfig } from '../auth/fetchInterceptor';
import styles from './managemower.css'
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

   
}));

const ManageMovers = () => {

    const [authState] = useContext(AuthContext);
    const classes = useStyles();
    const [btnLoading, setBtnloading] = useState(true);
    const [open, setOpen] = useState(true);
    const [error, setError] = useState("");
    const [mowers, setMowers] = useState([]);
    const [user,setUser]=useState()
   
    function sortDataByUpdatedAt(data) {
        return data.slice().sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA; // Sort in descending order, adjust as needed
        });
      }

    const loadMowers = (id) => {
        getMowersByUserId(id).then(data => {

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

    useEffect(() => {
      
        //get mowers
        loadMowers(authState._id)
    }, [])

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
    // const isValidDate = moment(thirdYearwarranty).isValid();
    var columns = [

        { title: "id", field: "_id", hidden: true },
        { title: "Mower Name", field: 'mowerName', render: rowData => { return <span>{rowData.mowerName}</span> } },
        { title: "Model", render: rowData => { return <span>{rowData.mowerModel.Device_Name}</span> } },
        { title: "Product No", render: rowData => { return <span>{rowData.mowerModelNo}</span> } },
        { title: "S.No", field: "sNo", render: rowData => { return <span>{rowData.mowerSerialNo}</span> } },
        { title: "Mower Address", field: "mowerAddress", render: rowData => { return <span>{rowData.address}</span> } },
        { title: "Date of Purchase", field: "dateOfPurchase", render: rowData => { return <Moment format='DD/MM/YYYY'>{rowData.dateOfPurchase}</Moment> } },
        { title: "Purchased From Smart Dots", field: "purchase", render: rowData => { return <span>{rowData.purchaseFromSmartdots == true ? 'yes' : 'No'}</span> } },
        { title: "Manufacturer Warranty End Date", field: "warrantyEndDate", render: rowData => { return <Moment format='DD/MM/YYYY'>{rowData.warrantyEndDate}</Moment> } },
        
        { title: "SmartDots 3rd Year Warranty End Date", field: "thirdyearEnddate", render: rowData => { 
            const isValidDate = moment(rowData.thirdYearwarranty).isValid();
            return (<>{ isValidDate?(<Moment format='DD/MM/YYYY'>{rowData.thirdYearwarranty}</Moment>):(<>Not Applicable</>)} </>)  }},
        { title: "Updated At", field: "updatedAt", hidden: true }, 
        { title: "Actions", render: rowData => <Link to={`/user/update/mower/${rowData._id}`}><Edit /></Link> },
        {
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

    const destroy = async (cardId, paymentID) => {
        if (window.confirm("Do you want to delete this Mower?")) {
            setOpen(true);
            const deleteCard = await fetch(`${API}/detach/payment/method`, {
                method: 'POST',
                headers: fetchConfig,
                body: JSON.stringify({
                    payment_method: paymentID,
                    userid: authState._id
                })
            });

            const cardRes = await deleteCard.json();
            if (cardRes) {

                let statusUpdate = await updateCardStatus({ id: cardId, status: 2 })

                if (statusUpdate.status === 2) {
                    loadMowers();
                }
            }
        }
    }

    const showNotfound = () => {
        return (

            <div className="col-md-12 px-0">
                <div className="col-md-12" style={{ backgroundColor: '#f5f5f5', border: 'solid 1px #e7e7e7', borderTop: '0px' }}>
                    <br />
                    <h4 style={{ textAlign: 'center', color: 'red' }}>Mower Not found!!</h4>
                </div>
            </div>
        )
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{error}</h3>
        }
    };

    return (
        <UserLayout>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ color: '#19a6dd', textAlign: 'center' }}>Manage Mowers</h2>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5><Link className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" style={{ borderRadius: '20px' }} to={`/user/add/mower`}>Add New Mower</Link></h5>
                    </div>
                    <div className="col-md-12">
                        <br />
                        {showError()}
                        <MaterialTable
                       className="MuiTableCell-root"
                            title=""
                            columns={columns}
                            isLoading={btnLoading}
                            data={mowers}
                            icons={tableIcons}
                            options={{
                                pageSize: 10,
                                sorting:true,
                                
                            }}
                            localization={{ body: { emptyDataSourceMessage: <h6>No Mowers to display</h6> } }}
                        />
                        {/* {!open && (mowers.length >= 1 ? loadMowers() : showNotfound())} */}
                    </div>
                </div>
            </div>

            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </UserLayout>
    )
}

export default ManageMovers
