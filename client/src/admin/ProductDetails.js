import React, {useState, useEffect} from 'react'
import ModalVideo from 'react-modal-video'
import AdminLayout from './Layout/AdminLayout'
import { getProduct, getInventoryHist } from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ShowImage from '../components/ShowImage'
import Moment from 'react-moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    gallery:{
        display:'flex',
        padding:5,
    },
    frame:{
        padding:5
    },
    img:{
        border:'1px solid #dbdbdb',
        width:80,
        padding:5,
    },
    magic:{
        // border:'1px solid #dbdbdb',
        height:200,
        padding:10
    },
    magic_img:{
        width:300
    },
    videobtn:{
        background:'transparent',
        color:'#c9c9c9',
        border:'none',
        
    },
    video:{
        padding:15,
    }
}));

const useStylesErr = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const ProductDetails = ({match}) => {

    const classes = useStyles();

    const classesErr = useStylesErr();

    const [open, setOpen] = useState(false);

    const [ btnloading, setBtnloading] = useState(true);

    const [ product, setProduct ] = useState([]);

    const [history, setHistory] = useState([]);

    const [ error, setError ] = useState("");

    const [isOpen, setisOpen] = useState(false);

    const [magicstate,setmagicstate] = useState({
        hidden:true,
        src:''
    });

    const loadProduct = (productId) => {
        getProduct(productId).then(data => {
            if(data.error){
                setBtnloading(false);
                setError(data.error);
            }
            else {
                setProduct(data);
                loadInventoryHist(match.params.productId);
            }
        })
    }

    const loadInventoryHist = (id) => {
        getInventoryHist({productId: id}).then(data => {
            if(data.error){
                setError(data.error);
                setBtnloading(false);
            }
            else {
                setHistory(data);
                setBtnloading(false);
            }
        })
    }

    useEffect(() => {
        loadProduct(match.params.productId);   
    },[])


    //to be removed
    // const showGallery = ()=>{
    //     if(product.images.length > 0){
    //         console.log("from show gallery",product.images[0].split(","))
    //         SetGallery(product.images[0].split(","))
    //     }
    // }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    }
// console.log(product.video.split("/")[3])
    const mouseOver =(i,e)=>{
        console.log(e.target.src)
        setmagicstate({...magicstate,hidden:false,src:e.target.src})
    }
    const mouseOut =(i,e)=>{
        console.log(e.target.src)
        setmagicstate({...magicstate,hidden:true,src:''})
    }

    const showDetails = () => (

            <div className="card mb-4 bord-line">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="card-text"><b>Device Name : </b>{product?.Device_Name || "-"}</p>
                          {/*   <p className="card-text"><b>Device Alias : </b>{product.Device_Alias}</p> */}
                            <p className="card-text"><b>Description : </b><span dangerouslySetInnerHTML={{__html:product?.Description || "-"}}></span></p>
                           {/*  <p className="card-text"><b>Device Group : </b>{product.Device_Group}</p> */}
                            <p className="card-text"><b>Device Capability : </b>{product?.Device_Capability || "-"}</p>
                            <p className="card-text"><b>Color : </b>{product?.Color || "-"}</p>
                            <p className="card-text"><b>Style : </b>{product?.Style || "-"}</p>
                            <p className="card-text"><b>Technology : </b>{product?.Technology || "-"}</p>
                            <p className="card-text"><b>Internal Cost($) : </b>{product?.Internal_Cost || "-"}</p>
                            <p className="card-text"><b>Cost Price($) : </b>{product?.Cost_Price || "-"}</p>
                            <p className="card-text"><b>SmartDots MSRP($) : </b>{product?.SmartDots_MSRP || "-"}</p>
                            <p className="card-text"><b>Labor Cost Installation($) : </b>{product?.Labor_Cost_Installation || "-"}</p>
                            <p className="card-text"><b>Labor Cost Configuration($) : </b>{product?.Labor_Cost_Configuration || "-"}</p>
                            <p className="card-text"><b>Config Cost Reseller($) : </b>{product?.Config_Cost_Reseller || "-"}</p>
                            <p className="card-text"><b>Labor Price Installation($) : </b>{product?.Labor_Price_Installation || "-"}</p>
                            <p className="card-text"><b>Labor Price Configuration($) : </b>{product?.Labor_Price_Configuration || "-"}</p>
                            <p className="card-text"><b>Supplier : </b>{product?.Supplier || "-"}</p>
                            <p className="card-text"><b>Manufacturer : </b>{product?.Manufacturer || "-"}</p>
                            <p className="card-text"><b>Part_No : </b>{product?.Part_No || "-"}</p>
                            <p className="card-text"><b>UPC_Code : </b>{product?.UPC_Code || "-"}</p>
                            <p className="card-text"><b>Shipping Charge($) : </b>{product?.shipping_charge || 0}</p>
                        </div>

                        <div className="col-lg-6">
                            
                            {product.photo ? 
                                <ShowImage item={product.photo} /> : 
                                    <div className="product-img" style={{minHeight:'100px'}}>     
                                        <img
                                            src="../../../assets/img/noimage.png"
                                            alt="details"
                                            className="mb-3"
                                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                                        />
                                    </div>
                            }

                            <div className={classes.magic} >
                                <img className={classes.magic_img} hidden={magicstate.hidden} src={magicstate.src} alt="" />
                            </div>

                            <div className={classes.gallery}>
                                {product.images.length > 0 ? product.images.map((img,i)=>{

                                    return <div className={classes.frame}><img onMouseOver={(e)=>mouseOver(i,e)} onMouseOut={(e)=>mouseOut(i,e)} src={img} className={classes.img} alt="" /></div>
                                    }) :null}

                                    {product.video && <span className={classes.video}><button className={classes.videobtn} onClick={()=> setisOpen(true)}><PlayCircleOutlineIcon fontSize='large' /></button>
                                    </span> }
                            </div>
                            <hr />                         
                           {/*  <p className="card-text"><b>Notes : </b>{product.Notes ? product.Notes : "-"}</p> */}
                            <p className="card-text"><b>Inventory : </b>{product?.inventory || "-"}</p>
                            <p className="card-text"><b>Threshold : </b>{product?.threshold || "-"}</p>
                            <p className="card-text"><b>Reserved : </b>{product?.reserved || "-"}</p>
                            <p className="card-text"><b>Weight : </b>{product?.weight || "-"}</p>
                            <p className="card-text"><b>Created At : </b><Moment format='DD/MM/YYYY'>{product?.createdAt}</Moment></p>
                            <p className="card-text"><b>Updated At : </b><Moment format='DD/MM/YYYY'>{product?.createdAt}</Moment></p>
                            {product.added_by && <p className="card-text"><b>Created By : </b>{product?.added_by?.prefix+". "+product?.added_by?.cfirst+" "+product?.added_by?.clast}</p>}
                            <p><b>Status</b>:&nbsp;&nbsp;{((Number(product?.inventory) === Number(product?.threshold)) ? <span style={{backgroundColor:'#f0ad4e',color:'white'}} className="btn">Average</span> : ((Number(product?.inventory) > Number(product?.threshold)) ? <span style={{backgroundColor:'#5cb85c',color:'white'}} className="btn">Good</span> : <span style={{backgroundColor:'#FFBF00',color:'white'}} className="btn">Poor</span>))}</p> 
                        </div>
                    </div>
                </div>
            </div>
    )

    const showInventoryHistory = () => (

        <div className="card mb-4 bord-line">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <h4 style={{color:"#106eea"}}>Inventory History : </h4><br/>
                        <div className="table-responsive">

                            <table className="table table-striped">

                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Reason</th>
                                        <th>Quantity</th>
                                        <th>Added by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((p,i) => (
                                        <tr key={i}>
                                            <td><Moment format='DD/MM/YYYY'>{p?.createdAt}</Moment></td>        
                                            <td>{p?.reason}</td>
                                            <td>{p?.quantity}</td>
                                            <td>{p?.added_by?.clast}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            {history.length === 0 && <><br/><h4 style={{textAlign:'center', color:'red'}}>Sorry! No Inventory history found</h4></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

    const showNotFound = () => {
        return (
            <div className="card mb-4 bord-line">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">
                            <h3 style={{textAlign:'center'}}>Sorry, Product not found!</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <AdminLayout>

            <div className="row">
                    
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Product Details</h4>       
                            {(!btnloading && product._id) ? showDetails() : showNotFound()}

                            {(!btnloading && product._id) && showInventoryHistory()}

                            {!btnloading && <div><Link className="nav-link" to="/admin/products">Go Back to List </Link></div>}

                            <Backdrop className={classes.backdrop} open={btnloading} >
                                <CircularProgress color="inherit" />
                            </Backdrop> 

                            <Backdrop className={classes.backdrop} open={isOpen} >

                                 <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={product.video && product.video.split("/")[3]} onClose={() => setisOpen(false)} />

                            </Backdrop> 

                            <div className={classesErr.root}>
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

export default ProductDetails
