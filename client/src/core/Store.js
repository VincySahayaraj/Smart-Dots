import React,{useEffect,useState} from 'react';
import {getProducts, getProductsByCategory, getCategories} from '../Apis/apis';
import Layout from './Layout';
import ShowCardImg from '../components/ShowCardImg';
import Skeleton from '@material-ui/lab/Skeleton';

const Store = () => {

    const [loading, setLoading] = useState(true);

    const [products,setproducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [catLoading, setCatLoading] = useState(true);

    const [active, setActive] = useState('')

    const loadCategories = () => {
        getCategories()
        .then(data => {
            if(data.error){
                setCatLoading(false);
            }
            else {
                setCategories(data);
                setCatLoading(false);
            }
        })
    }

    const loadProducts = ()=>{
        getProducts()
        .then(data=>{
            if(data.error){
                console.log(data.error)
                setLoading(false);
            }else{
                setproducts(data);
                setLoading(false);
            }
        })
    }

    const loadProdByCategory = (id) => {
        getProductsByCategory({id})
        .then(data => {
            if(data.error){
                console.log(data.error)
                setLoading(false);
            }else{
                setproducts(data);
                setLoading(false);
            }
        })
    }

    useEffect(()=>{
        loadCategories()
        loadProducts();
    },[]);

    const loadByCat = (id) => {
        setLoading(true);
        setActive(id)
        return loadProdByCategory(id);
    }

    const loadAll = () => {
        setLoading(true); 
        setActive('');
        return loadProducts()  
    }

    const showProducts = () => (
        <div className="row">
            {console.log("these are products",products)}
            {products.length >= 1 ? products.map((p,i) => (

                <div className="col-md-4 mb-5" key={p._id}>
                    <div className="card h-100">
                        {/* <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div> */}
                        {p.photo ? <ShowCardImg item={p.photo} id={p._id} /> : <div className="product-img" style={{minHeight:'100px'}}>     
                                                <img
                                                    src="../../assets/img/noimage.png"
                                                    alt="details"
                                                    className="card-img-top"
                                                />
                                            </div>}
                        <div className="card-body p-4">
                            <div className="text-center">                            
                                <h5 className="fw-bolder">{p.Device_Name}</h5>                             
                                {"$ "+p.SmartDots_MSRP}
                            </div>
                        </div>                    
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center"><a className="btn1 btn1-primary mr-2 mb-3" href={`/product-details/${p._id}`}>View Details</a></div>
                        </div>
                    </div>
                </div>
               
               
            )) 
             
                : showNotfound()
            }
        </div>
    )
      
    const showLoading = () => (
            <div className="row">
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <Skeleton animation="wave" variant="rect" width={390} height={260} />  
                        <div className="card-body p-4">
                            <div className="text-center">                            
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </div>
                        </div>                          
                    </div> 
                </div>

                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <Skeleton animation="wave" variant="rect" width={390} height={260} />  
                        <div className="card-body p-4">
                            <div className="text-center">                            
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </div>
                        </div>                          
                    </div> 
                </div>

                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <Skeleton animation="wave" variant="rect" width={390} height={260} />  
                        <div className="card-body p-4">
                            <div className="text-center">                            
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </div>
                        </div>                          
                    </div> 
                </div>

             </div>  
    )

    const showNotfound = () => {
        return (
            <div className="card"  style={{textAlign:'center',color:'red', backgroundColor: '#f5f5f5', border: 'solid 1px #e7e7e7', borderTop: '0px'}} >                    
                <div className="card-body">
                    <h4>Product is empty!!</h4>
                </div>   
            </div>           
        )
    }

    return (
        <Layout>
            <div style={{paddingTop:'100px'}} className="section pp-scrollable slide-dark slide-dark-footer">
                <div className="col-md-12 px-0 inner-tp-pad inner-safely">
                    <header style={{backgroundImage: `url(${`../../assets/img/ad-btm.webp`})`}} /* style={{background: 'linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)'}} */ className="img-fluid rounded mb-4 py-5">
                        <div className="container px-4 px-lg-5 my-5">
                            <div className="text-center text-white">
                                <h1 className="display-4 fw-bolder">Our Products</h1>
                                {/* <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p> */}
                            </div>
                        </div>
                    </header>

                    <section className="py-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 col-lg-3 sidebar-filter" >        
                                   <div className="card" style={{width: '18rem'}}>
                                        <div className="card-header text-uppercase font-weight-bold mb-3">
                                    Categories
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li key="hb85" className="list-group-item"><span className={active === '' ? "categoryActive" : ''} onClick={() => loadAll()} style={{ cursor:'pointer'}}>Show All</span></li>
                                            {catLoading && <li key="55hb85" className="list-group-item"><Skeleton animation="wave" variant="rect" /></li>}
                                            {catLoading && <li key="5569" className="list-group-item"><Skeleton animation="wave" variant="rect" /></li>}
                                            {catLoading && <li key="5569lo" className="list-group-item"><Skeleton animation="wave" variant="rect" /></li>}
                                            
                                            {!catLoading && categories.length >=1 && categories.map((s) => (
                                                <li key={s._id} className="list-group-item"><span className={s._id === active ? "categoryActive" : ''} onClick={() => loadByCat(s._id)} style={{ cursor:'pointer'}}>{s.name}</span></li>
                                            ))} 
                                        </ul>
                                    </div>  
                                </div> 
                                <div className="col-md-9">

                                   {/*  {!loading && (products.length >=1 ? showProducts(): showNotfound())} */}
                                   {loading ? showLoading() : showProducts()}
                                    
                                </div>
                            </div>
                        
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default Store
