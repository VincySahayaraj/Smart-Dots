import React,{useEffect,useState} from 'react';
import {getProducts, getProductsByCategory} from '../Apis/apis';
import Layout from './Layout';
import ShowListingImg from '../components/ShowListingImg';
import { makeStyles } from '@material-ui/core/styles';
import {Tab, Nav, Row, Col} from 'react-bootstrap';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    page_inner_head:{
        marginTop:100,
        textAlign:'center'
    }
}));

const ProductListing = () => {

    const classes = useStyles();
    
    const [loading, setLoading] = useState(true);

    const [categoryLoading, setCatLoading] = useState(false);

    const [products,setproducts] = useState([])

    const init = (id) => {
        setCatLoading(true);
        if(Number(id) === 1){
            return loadProdByCategory("6092029780cb76f65be31e4a"); // Smart Home
        }
        else if(Number(id) === 2){
            return loadProdByCategory("6092023280cb76f65be31e49"); // Automower Parts
        }
        else if(Number(id) === 3){
            return loadProdByCategory("6092022980cb76f65be31e48"); // Automower Accessories
        }
        else if(Number(id) === 4){
            return loadProdByCategory("6092021580cb76f65be31e46"); // Automowers
        }
        else {
            return loadProducts()
        }
    }

    const loadProducts = ()=>{
        getProducts()
        .then(data=>{
            if(data.error){
                console.log(data.error)
                setLoading(false);
                setCatLoading(false);
            }else{
                setproducts(data);
                setLoading(false);
                setCatLoading(false);
            }
        })
    }

    const loadProdByCategory = (id) => {
        getProductsByCategory({id})
        .then(data => {
            if(data.error){
                console.log(data.error)
                setCatLoading(false);
                setLoading(false);
            }else{
                setproducts(data);
                setCatLoading(false);
            }
        })
    }

    useEffect(()=>{
        loadProducts();
    },[]);

    const productList = ()=>{
        return (   
                    <div className="row">
                        {products.map((p,i) => (
                            <div className="col-md-6 mb-2-btm pl-0 plr-0px book" key={i}>
                                <div className="col-md-12 info">
                                    <div className="row pt-8-per-but">
                                        <div className="col-md-12 py-5 px-5">
                                            <a className="btn1 btn1-primary mr-2 mb-3" href={`/product-details/${p._id}`}>See Details</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 box-bord-gr image">
                                    <div className="row">
                                        <div className="col-md-5"> 
                                            {p.photo ? <ShowListingImg item={p._id} /> : <div className="product-img" style={{minHeight:'100px'}}>     
                                                <img
                                                    src="../../assets/img/noimage.png"
                                                    alt="details"
                                                    className="mb-3"
                                                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                                                />
                                            </div>}
                                        </div>
                                        <div className="col-md-7 py-5 px-5 text-mini-mbile">
                                            <h4 style={{textAlign:'center'}} className="inner-line"><b>{p.Device_Name}</b></h4>
                                            <h5 style={{textAlign:'center'}}  className="card-price text-warning">{"$ "+p.SmartDots_MSRP}</h5> 
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        ))}                               
                    </div>   
        )
    }

    const showNotfound = () => {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-12 px-0" style={{textAlign:'center',color:'red', backgroundColor: '#f5f5f5', border: 'solid 1px #e7e7e7', borderTop: '0px'}} >                    
                    <h4>Product is empty!!</h4>
                </div>
                </div>
            </div>              
        )
    }


    return(
        <Layout>  
               <div style={{paddingTop:'50px'}} className="section pp-scrollable slide-dark slide-dark-footer">
                   <div className="col-md-12 px-0 inner-tp-pad inner-safely">
                       <div className="container">
                           <div className="col-md-10 inner-header">
                               <h1 className="white-inner-txt">Our Products </h1>
                           </div>
                       </div>
                       <img src="../../assets/img/ad-btm.webp" className="img-fluid" alt="" /> 
                        {/* {(loading) ? <div><div className='loader1'></div></div> : ""}   */}
                   </div>
                        
                        <div style={{paddingTop:'60px'}} className="col-md-12 inner-safely mb-5">
                            <div className="container-fluid">
                                <div className="row">

                                
                            {/* <div className="container ptb-inner">
                                <div className="row">
                                    <div className="col-md-12"> 
                                        <div className="row">
                                            <div className="col-md-2 px-0 padd-tp-srt"><button className="btn pad-lt-srt"> Filter Products</button></div>
                                            <Tabs defaultActiveKey="-1" onSelect={(k) => init(k)} className="show-all-btm" id="uncontrolled-tab-example">
                                                <Tab eventKey="-1" title="Show All">
                                                    {!loading && (products.length >=1 && productList())}
                                                </Tab>
                                                <Tab eventKey="1" title="Smart Home">
                                                    {!loading && (products.length >=1 && productList())}
                                                </Tab>
                                                <Tab eventKey="2" title="Automower Parts">
                                                    {!loading && (products.length >=1 && productList())}
                                                </Tab>
                                                <Tab eventKey="3" title="Automower Accessories">
                                                    {!loading && (products.length >=1 && productList())}
                                                </Tab>
                                                <Tab eventKey="4" title="Automowers">
                                                    {!loading && (products.length >=1 && productList())}
                                                </Tab>                                           
                                            </Tabs>                                         
                                        </div>
                                    </div>                                  
                                </div>
                            </div> */}

                            <Tab.Container id="left-tabs-example" defaultActiveKey="-1" onSelect={(k) => init(k)}>
                            <Row>
                                <Col sm={3}>
                                <h6 class="text-uppercase font-weight-bold mb-3">Categories</h6>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="-1">Show All</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="1">Smart Home</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="2">Automower Parts</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="3">Automower Accessories</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="4">Automowers</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                              
                                    {(!loading && products.length === 0) && showNotfound()}
                                 
                                <Tab.Content>
                                    
                                    <Tab.Pane eventKey="-1">
                                        {!loading && (products.length >=1 && productList())}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="1">
                                        {(products.length >=1 && productList())}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="2">
                                        {(products.length >=1 && productList())}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="3">
                                        {(products.length >=1 && productList())}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="4">
                                        {(products.length >=1 && productList())}
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                            </Row>
                            </Tab.Container>
                            </div>
                            </div>
                        </div>

                                 
                </div> 
                   <Backdrop className={classes.backdrop} open={loading} >
                     <CircularProgress color="inherit" />
                 </Backdrop>      

                 <Backdrop className={classes.backdrop} open={categoryLoading} >
                     <CircularProgress color="inherit" />
                 </Backdrop>     
        </Layout>
    )  
}

export default ProductListing;
