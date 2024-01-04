import React , { useState, useEffect} from 'react'
import AdminLayout from './Layout/AdminLayout'
import { Link } from 'react-router-dom'
import {getCards} from './apiAdmin'
import { forwardRef } from 'react';
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
import { Badge, Button } from 'react-bootstrap'
import {API} from '../config'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {updateCardStatus} from '../user/apiUser'
import { fetchConfig } from '../auth/fetchInterceptor';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const useStyles1 = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


const ManageCards1 = () => {

    const [ spinloading, setSpinLoading] = useState(true);

    const classes = useStyles();

    const classes1 = useStyles1();

    const [open, setOpen] = useState(false);

    const [bar, setBar] = useState(false);

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

    const [cards, setCards] = useState([]);

    var columns = [
        {title: "id", field: "_id", hidden:true},
        {title: "Name", field: "userId",render: rowData => <Link to={`/admin/user/details/${rowData.userId._id}`}>{rowData.userId.prefix}.{rowData.userId.cfirst} {rowData.userId.clast}</Link>},
        {title: "Card No", render: rowData => { return <span>{"xxxx xxxx xxxx "+rowData.card_no}</span>}},
        {title: "Exp month/year", render: rowData => {return <span>{rowData.exp_month+'/'+rowData.exp_year}</span>}},
        {title: "Card Type", field:"brand"},
        {title:"PM",field:"payment_method"},
        {title: "Status", render: rowData => {
            if(Number(rowData.status) === 1){
                return <Button pill variant="warning" onClick={() => destroy(rowData.payment_method, rowData._id, rowData.userId)}>Deactive</Button>
            }
            else if(Number(rowData.status) === 2){
                return <Badge pill variant="danger">Deactivated</Badge>
            }
        }}
    ]

    const loadCards = () => {
        getCards().then(data => {
            if(data.error){
                setSpinLoading(false);
                setOpen(false);
            } else {
                setCards(data);
                setSpinLoading(false);
                setOpen(false);
            }
        })
    }

    useEffect(() => {
        loadCards();
    },[])

    const destroy = async(paymentMethodId, cardId, userId) => {

        if(window.confirm("Do you want to delete this card?"))
        {
            setOpen(true);     
            const deleteCard = await fetch(`${API}/detach/payment/method`, {
                    method:'POST',
                    headers:fetchConfig,
                    body: JSON.stringify({ 
                        payment_method: paymentMethodId,
                        userid: userId
                      })
            });
                  
            const cardRes = await deleteCard.json();
                
            if(cardRes){
                let statusUpdate = await updateCardStatus({id:cardId, status:2})

                if(statusUpdate.status === 2){
                    loadCards()
                }
                
            }

        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setBar(false);
    };


    return (
        <AdminLayout topTitle="Manage Cards">

            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title" style={{textAlign:'center'}}>Manage Cards</h4>

                                    <MaterialTable
                                    title=""
                                    columns={columns}
                                    isLoading={spinloading}
                                    data={cards}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No cards to display</h6> } }}
                                    />
                            <Backdrop className={classes.backdrop} open={open} >
                                <CircularProgress color="inherit" />
                            </Backdrop>   
                        </div>

                        <div className={classes1.root}>
                                <Snackbar open={bar} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="error">
                                    Sorry, this card is the default subscription card!
                                    </Alert>
                                </Snackbar>
                            </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default ManageCards1;