import React, { useState, useEffect, forwardRef} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {Link} from 'react-router-dom'
import {getMasterProducts,deleteProduct} from './apiAdmin'
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
import { CsvBuilder} from 'filefy';
import { Badge } from 'react-bootstrap'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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

const ManageMaterProducts = () => {

    const classes = useStyles();

    const [ btnLoading, setBtnloading] = useState(true);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [products, setProducts] = useState([])

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [itemId, setItemId] = useState('');
    const [webstore, setWebstore] = useState(false);
    const [deleteOption, setDeleteOption] = useState(1);
    const [deleteLoading, setDeleteLoading] = useState(false);

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

    const checkStatus = (inventory, threshold, status) => {

        if(status === 1){
            return <span style={{backgroundColor:'red',color:'white'}} className="btn">Deactivated</span>
        }
        else if(inventory === threshold){
            return <span style={{backgroundColor:'#f0ad4e',color:'white'}} className="btn">Average</span>
        }
        else if(inventory > threshold){
            return <span style={{backgroundColor:'#5cb85c',color:'white'}} className="btn">Good</span>
        }
        else if(inventory < threshold){
            return <span style={{backgroundColor:'#FFBF00',color:'white'}} className="btn">Poor</span>
        }

        //((rowData.inventory === rowData.threshold) ? <span style={{backgroundColor:'#f0ad4e',color:'white'}} className="btn">Average</span> : ((rowData.inventory > rowData.threshold) ? <span style={{backgroundColor:'#5cb85c',color:'white'}} className="btn">Good</span> : <span style={{backgroundColor:'#FFBF00',color:'white'}} className="btn">Poor</span>))}},

    }

    var columns = [
       
        {title: "id", field: "_id", hidden: true},
        {title: "Product ID", field: "Part_No",render: rowData => <Link to={`/admin/product/details/${rowData._id}`}>{rowData.Part_No ? rowData.Part_No : "-"}</Link>},
        {title: "Product Name", field: "Device_Name", render: rowData => <Link to={`/admin/product/details/${rowData._id}`}>{rowData.Device_Name}</Link>},
        {title: "Cost Price($)", field: "Cost_Price"},
        {title: "SmartDots MSRP($)", field: "SmartDots_MSRP"},
        {title: "Is Webstore", render: rowData => {
            if(rowData.isSmartDots) {
                return <Badge pill variant="success">Yes</Badge>;
            }
            return <Badge pill variant="danger">No</Badge>;
        }},
        /*  {title: "Supplier Name", field: "Supplier"}, */
        /* {title: "Category Name", field: "category.name", render: rowData => <span>{rowData.category.name}</span>}, */
        /*  {title: "Category", field:"Device_Group"}, */
        {title: "Quantity", field: "inventory"},
        {title: "Status",field:"status", render: rowData =>  checkStatus(rowData.inventory, rowData.threshold, rowData.status)},
       
        {title: "Actions",render: rowData => <h3><Link to={`/admin/update/inventory/${rowData._id}?ref=1`}>+/-</Link></h3>},
        {render: rowData => <Link to={`/admin/update-master-product/${rowData._id}`}><Edit /></Link>},
        {render: rowData => {

            return <span style={{color:"red", cursor:'pointer'}} onClick={() => handleDeleteOpen(rowData._id, rowData.isSmartDots)}><DeleteOutline /></span>
            /* if(rowData.status === 0){
                return <span style={{color:"red", cursor:'pointer'}} onClick={() => destroy(rowData._id, 1)}><DeleteOutline /></span>
            }
            else if(rowData.status === 1){
                return <button className="btn-success"  onClick={() => destroy(rowData._id, 0)}>Activate</button>
            } */
        }},
      /*   {title: "",render: rowData => <span style={{color:"#106eea", cursor:'pointer'}} onClick={() => destroy(rowData._id)}><DeleteOutline /></span>}, */
        
    ]

    const loadProducts = () => {
        setBtnloading(true);
        getMasterProducts().then(data => {
            if (data.error) {
                setBtnloading(false);
                setError(data.error);
                setOpen(true);
            } else {
                setProducts(data);
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

    /* const destroy = (productId, status) => {
        var tempStatus = "";
        if(status === 0){
            tempStatus = "activate"
        }
        else if(status === 1){
            tempStatus = "delete"
        }
        if(window.confirm(`Do you want to ${tempStatus} this product?`))
        {
            setBtnloading(true);
            deleteProduct({id:productId, status}).then(data => {
                if (data.error) {
                    setBtnloading(false);
                    setError(data.error);
                    setOpen(true);
                } else {
                    setOpen(false);
                    setError('');
                    loadProducts();
                }
            });
        }
    };
 */
    useEffect(() => {
        loadProducts()
    }, [])

    const clean = (rowData,columnDef)=>{
        if(columnDef.field === "status"){
            if(Number(rowData.inventory) === Number(rowData.threshold)){
                return "Average"
            }else if(Number(rowData.inventory) > Number(rowData.threshold)){
                return "Good"
            }else{
                return "Poor"
            }
        }
    }

    const handleDeleteOpen = (id, isSmartDots) => {
        setItemId(id);
        setWebstore(isSmartDots);
        setOpenDeleteModal(true);
    }

    const handleDeleteClose = () => {
        setOpenDeleteModal(false);
        setItemId('');
        setWebstore('');
    };

    const handleCancelOptionChange = (event) => {
        let val = event.target.value;
        setDeleteOption(val);
    };

    const destroyProduct = () => {
        setDeleteLoading(true);
        if(Number(deleteOption) === 1)
        {
            //setBtnloading(true);
            deleteProduct({id:itemId, status: 1, isSmartDots:false}).then(data => {
                if (data.error) {
                    setDeleteLoading(false);
                    setBtnloading(false);
                    setError(data.error);
                    setOpen(true);
                } else {
                    setOpen(false);
                    setError('');
                    loadProducts();
                    setOpenDeleteModal(false);
                    setItemId('');
                    setWebstore('');
                    setDeleteLoading(false);
                }
            });
        }
        else if(Number(deleteOption) === 2) {
            //setBtnloading(true);
            deleteProduct({id:itemId, isSmartDots:false}).then(data => {
                if (data.error) {
                    setDeleteLoading(false);
                    setBtnloading(false);
                    setError(data.error);
                    setOpen(true);
                } else {
                    setOpen(false);
                    setError('');
                    loadProducts();
                    setOpenDeleteModal(false);
                    setItemId('');
                    setWebstore('');
                    setDeleteLoading(false);
                }
            });
        }
        else {
            setDeleteLoading(false);
        }
    };

    const showDeleteModal = () => (
        <Dialog
            open={openDeleteModal}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Product ?"}
            </DialogTitle>

            <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Delete type</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={deleteOption}
                        onChange={handleCancelOptionChange} 
                    >
                        <FormControlLabel value={1} control={<Radio />} label={"Delete from Master Product (It will also delete the product from Webstore, if it is available.)"} />
                        
                        <FormControlLabel disabled={!webstore} value={2} control={<Radio />} label="Delete from WebStore only." />

                        {!webstore && <em style={{color:'red'}}>Note : This Product is not available on Webstore</em>}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button 
                    disabled={deleteLoading} 
                    variant="contained" 
                    color="success"
                    onClick={handleDeleteClose}
                    autoFocus
                >
                    Keep Product
                    
                </Button>
                <Button 
                    disabled={deleteLoading} 
                    variant="contained" 
                    color="error"
                    onClick={() => destroyProduct()}  
                >
                    {deleteLoading ? "Loading..." :  "Delete Product"}
                </Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <AdminLayout>

            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Products</h4>

                                    <MaterialTable
                                    title={<Link to='/admin/add/master/product'>Add product</Link>}
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={products}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10,
                                        exportButton:{
                                            csv:true,
                                            pdf:false
                                        },
                                    exportCsv:(columnList,initialData)=>{
                                       const column = columnList.filter(columnDef=>{
                                           return !columnDef.hidden && columnDef.field && columnDef.export !== false;
                                       })
                                       const data = initialData.map(rowData=>{
                                           return(
                                               column.map(columnDef=>{
                                                return rowData[columnDef.field] ? rowData[columnDef.field] : clean(rowData,columnDef);
                                               })
                                           );
                                       })
                                       const builder = new CsvBuilder("manage products"+".csv")
                                       builder
                                       .setDelimeter(',')
                                       .setColumns(column.map(columnDef=>columnDef.title))
                                       .addRows(data)
                                       .exportFile();
                                    }
                                
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No products to display</h6> } }}
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
            {showDeleteModal()}
        </AdminLayout>
    )
}

export default ManageMaterProducts
