import React, { useState, useEffect, useContext } from "react";
import { getDetails } from "../Apis/apis";
import { AuthContext } from "../globalStates";
import Layout from "./Layout";
import { makeStyles } from "@material-ui/core/styles";
import { API } from "../config";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { createCart } from "../Apis/cartHelpers";
import { v4 as uuidv4 } from "uuid";
//import { Accordion,AccordionSummary,AccordionDetails,Typography } from '@material-ui/core';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ModalVideo from "react-modal-video";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactPlayer from 'react-player'
import YouTube from 'react-youtube';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  gallery: {
    display: "flex column",
    padding: 5,
  },
  frame: {
    padding: 5,
  },
  img: {
    border: "1px solid #dbdbdb",
    width: 140,
    padding: 5,
  },
  magic: {
    // border:'1px solid #dbdbdb',
    height: 200,
    padding: 10,
  },
  magic_img: {
    width: 300,
  },
  videobtn: {
    background: "transparent",
    color: "#c9c9c9",
    border: "none",
  },
  video: {
    padding: 15,
  },
  topImg: {
    width: "507px",
    height: "285px",
  },
}));

const ProductDetails = ({ match }) => {
  const [authState] = useContext(AuthContext);

  const classes = useStyles();

  const [products, setproducts] = useState([]);

  const [quan, setQuan] = useState(1);

  const [loading, setLoading] = useState(true);

  const [cartLoading, setCartLoading] = useState(false);

  const [redirectTo, setRedirectTo] = useState(false);

  const [isOpen, setisOpen] = useState(false);

  const [videoUrl, setVideoUrl] = useState("");

  const [imgLoad, setImgLoad] = useState(true);

  const [magicstate, setmagicstate] = useState({
    hidden: true,
    src: products.photo,
  });
  useEffect(() => {
    if (products)
      setmagicstate({
        hidden: true,
        src: products.photo,
      });
  }, [products]);

  const loadProducts = (id) => {
    getDetails(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setproducts(data);
        if (data.video) {
          var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          var match = data.video.match(regExp);
          var url = match && match[7].length === 11 ? match[7] : false;
          setVideoUrl(url);
        }
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadProducts(match.params.productId);
  }, []);

  const addCart = () => {
    setCartLoading(true);
    var tempUserId = "";

    if (authState._id) {
      // Auth User
      createCart({
        productID: "AFZAL",
        quantity: quan,
        price: Number(products.SmartDots_MSRP),
        userID: authState._id,
      }).then((data) => {
        if (data.error) {
          setCartLoading(false);
        } else {
          setRedirectTo(true);
        }
      });
    } else {
      // New user

      if (localStorage.getItem("_cart")) {
        const cartData = JSON.parse(localStorage.getItem("_cart"));
        tempUserId = cartData.id;
      } else {
        tempUserId = uuidv4();
        localStorage.setItem("_cart", JSON.stringify({ id: tempUserId }));
      }

      createCart({
        productID: match.params.productId,
        quantity: quan,
        price: Number(products.SmartDots_MSRP),
        tempUser: tempUserId,
      }).then((data) => {
        if (data.error) {
          setCartLoading(false);
        } else {
          setRedirectTo(true);
        }
      });
    }
  };
  //bug
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return window.location.replace("/review-order");
      // return window.location.href="/review-order";
      //return <Redirect to="/revieworder" />
    }
  };

  // console.log(product.video.split("/")[3])
  const mouseOver = (i, e) => {
    setmagicstate({ ...magicstate, src: e.target.src });
  };
  const mouseOverMain = (e) => {
    setmagicstate({ ...magicstate, src: e.target.src });
  };
  const mouseOut = (i, e) => {
    setmagicstate({
      ...magicstate,
      src: `${API}/product/photo/${match.params.productId}`,
    });
  };

  // console.log(products.images.length);
  const imageHeader = () => {
    return (
      <div className="row border-who">
        <div className={classes.gallery}>
          {products.images && products.images.length > 0
            ? products.images.map((img, i) => {
                return (
                  <div key={i} className={classes.frame}>
                    <img
                      onMouseOver={(e) => mouseOver(i, e)}
                      onMouseOut={(e) => mouseOut(i, e)}
                      src={img}
                      className={classes.img}
                      alt=""
                    />
                  </div>
                );
              })
            : null}

          {products.video && (
            <span className={classes.frame}>
              <button className={classes.img} onClick={() => setisOpen(true)}>
                <PlayCircleOutlineIcon fontSize="large" />
              </button>
            </span>
          )}
        </div>
        <div className="col-md-6 p-5 text-center">
          {imgLoad && (
            <Skeleton
              animation="wave"
              variant="rect"
              width={488}
              height={275}
            />
          )}
          {products.photo ? (
            <img
              src={magicstate.src}
              onLoad={() => setImgLoad(false)}
              loading="lazy"
              className="img-fluid"
              alt=""
            />
          ) : (
            <img
              onLoad={() => setImgLoad(false)}
              src="../../assets/img/noimage.png"
              alt="details"
              className="img-fluid"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          )}
        </div>

        <div className="col-md-6 pl-5 pt-5">
          <h1 className="font-hd-on">{products.Device_Name}</h1>
          <h3 className="font-hd-on">{"$ " + products.SmartDots_MSRP}</h3>
          {/*  <p className="inner-line newtext">{products.Description}</p> */}
          <p
            className="inner-line newtext"
            dangerouslySetInnerHTML={{ __html: products.Description }}
          ></p>

          <div className="row pt-5">
            <div className="col-md-8 pt-1">
              <div className="col-md-6">
                <button
                  className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
                  onClick={addCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleChangeQuantity = (e) => {
    setQuan(e.target.value);
  };

  const showHead = () => (
    <div className="card_details">
      <div className="container-fliud">
        <div className="wrapper1 row">
          <div className="preview1 col-md-6">
            <div className="preview1-pic tab-content1">
              <div className="tab-pane active" id="pic-1">
                {imgLoad && (
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width={507}
                    height={285}
                  />
                )}
                {products.photo ? (
                  <img
                    className="prod_img"
                    src={magicstate.src}
                    onLoad={() => setImgLoad(false)}
                    loading="lazy"
                    alt=""
                  />
                ) : (
                  <img
                    onLoad={() => setImgLoad(false)}
                    src="../../assets/img/noimage.png"
                    alt="details"
                    className="prod_img"
                  />
                )}
              </div>

              <ul className="preview1-thumbnail nav nav-tabs">
                <li>
                  <a>
                    <img
                      className="prod_img23"
                      onClick={(e) => mouseOverMain(e)}
                      src={products.photo}
                      alt=""
                    />
                  </a>
                </li>
                {products.images && products.images.length > 0
                  ? products.images.map((img, i) => {
                      return (
                        <li key={i}>
                          <a>
                            <img
                              className="prod_img23"
                              onClick={(e) => mouseOver(i, e)}
                              /* onMouseOut={(e)=>mouseOut(i,e)} */ src={img}
                              alt=""
                            />
                          </a>
                        </li>
                      );
                    })
                  : null}

                {products.video && (
                  <li>
                    <a style={{ cursor: "pointer" }}>
                      <img
                        onClick={() => setisOpen(true)}
                        className="prod_img23"
                        src="../../../assets/img/vid_play.png"
                        alt=""
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="details_prod col-md-6">
            <h3 className="product-title1">{products.Device_Name}</h3>
            <h4 className="price1">
              <span>{"$" + products.SmartDots_MSRP}</span>
            </h4>
            <div className="action mb-3">
              <div className="form-group">
                <input
                  type="number"
                  style={{ width: "100%", height: "56px" }}
                  onChange={(e) => handleChangeQuantity(e)}
                  min={1}
                  max={100}
                  defaultValue={quan}
                  className="form-control"
                />
              </div>
              &nbsp;
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
                onClick={addCart}
              >
                Add to cart
              </button>
            </div>
            <p
              className="product-description1"
              dangerouslySetInnerHTML={{ __html: products.Description }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );

  /* const tech_spec1 = ()=>{
            if(products.tech_spec){
                return(
                    <div dangerouslySetInnerHTML={{__html:products.tech_spec}}></div>
                )
            }else{
                return(
                    <div style={{textAlign:'center',paddingTop:50}}>No technical data available</div>
                )
            }
        
    } */

  /* const tech_spec = () => {
        if(products.tech_spec){
                return(
                    <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}><b style={{fontSize:'1rem'}}>Technical Specifications</b></Typography>
                            </AccordionSummary>

                            <AccordionDetails style={{marginLeft:'10px'}}>
                                <Typography>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span dangerouslySetInnerHTML={{__html:products.tech_spec}}></span>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>

                    </Accordion>
                )
            }
    } */

  //<Skeleton animation="wave" variant="rect" width={390} height={260} />
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  const showLoadingHeader = () => (
    <div className="card_details">
      <div className="container-fliud">
        <div className="wrapper1 row">
          <div className="preview1 col-md-6">
            <div className="preview1-pic tab-content1">
              <div className="tab-pane active" id="pic-1">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width={507}
                  height={285}
                />
              </div>
            </div>
            <ul className="preview1-thumbnail nav nav-tabs">
              <li>
                <a>
                  <Skeleton
                    animation="wave"
                    width={68}
                    height={38}
                    variant="rect"
                  />
                </a>
              </li>
              <li>
                <a>
                  <Skeleton
                    animation="wave"
                    width={68}
                    height={38}
                    variant="rect"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="details_prod col-md-6">
            <h3 className="product-title1">
              <Skeleton animation="wave" variant="rect" />
            </h3>
            <p className="product-description1">
              <Skeleton animation="wave" variant="rect" />
            </p>
            <h4 className="price1">
              <span>
                <Skeleton animation="wave" variant="rect" />
              </span>
            </h4>

            <div className="action">
              <Skeleton animation="wave" variant="rect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setisOpen(false);
  return (
    <Layout>
      <div
        style={{ paddingTop: "80px" }}
        className="section pp-scrollable slide-dark slide-dark-footer"
      >
        <div className="col-md-12 inner-tp-pad inner-safely">
          <div className="container ptb-inner top-det-sp">
            {loading ? showLoadingHeader() : showHead()}

            {/*  <div className="card-body">
                           
                                
                            </div> */}
          </div>
        </div>
      </div>
      {shouldRedirect(redirectTo)}

      {/*  <Backdrop className={classes.backdrop} open={loading} >
                     <CircularProgress color="inherit" />
                </Backdrop> */}

      {/* cart loading */}
      <Backdrop className={classes.backdrop} open={cartLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {isOpen && (
        <>
        <Modal
open={isOpen}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
 
<Box sx={style}>
   
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoUrl}`} controls={true}/>
          {/* {videoUrl} */}
          {/* <YouTube videoId="2g811Eo7K8U"  opts={opts} onReady={onVideoReady}/> */}
        </Box>

</Modal>
        </>
        // <ModalVideo
        //   channel="youtube"
        //   autoplay
        //   isOpen={isOpen}
        //   videoId={videoUrl}
        //   onClose={() => setisOpen(false)}
        // />
      )}
      {/*  <div className="push"></div> */}
      <div className="pushCart"></div>
    </Layout>
  );
};

export default ProductDetails;
