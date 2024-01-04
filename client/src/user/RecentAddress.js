import React, {Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'
import { getShippingAdress,updateShippingStatus } from './apiUser'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const RecentAddress = () => {
  
    const classes = useStyles();

  const [address, setAddress] = useState([])
  const [loading, setLoading] = useState(true)

  const loadAddress = () => {
    getShippingAdress()
    .then(data => {
        if (data.error) {
           setLoading(false);
        } else {
            // populate the state
            setAddress(data)
            setLoading(false);
        }
    });
  };

  const destroy = shippingId => {
    if(window.confirm("Do you want to delete this address?"))
    {
    updateShippingStatus(shippingId,{status: 2,Id:shippingId}).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            loadAddress();
        }
    });
    }
};

  useEffect(() => {
    loadAddress();
  },[])
 
    const allAddress = () => {
      return (
        <div className="row">
          
                {address.map((p) => ( 
                    <div key={p._id} className="col-md-6 px-0 mb-3">
                      <div className="col-md-8 bord-line">

                        <div className="row">
                           
                            <div className="col-md-8 py-3 wid-60-per-in">

                                <h4 className="pb-3 color-blk-in font-one-re">{p.prefix}. {p.first_name} {p.last_name}</h4>
                                <p className="pb-0 mb-0">
                               
                                {p.address1}
                                            {p.address2 !== undefined && <><br/><span>{p.address2}</span></>}<br/>
                                            {p.city}{p.state && <span>-{p.state}</span>}<br/>
                                            {p.pin_code}<br/>
                                            {p.country}<br/>
                                            Phone no: {p.phone}

                                </p>
                            </div>
                            <div className="col-md-4 pt-3 text-right">
                                <p className="font-one-edit"><Link to={`/user/update/address/${p._id}/recentaddress`}>Edit</Link> | <span style={{cursor:'pointer'}} onClick={() => destroy(p._id)}>Delete</span></p>
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
              <div className="col-md-12 px-0">
                  <div className="col-md-12" style={{backgroundColor: '#f5f5f5', border: 'solid 1px #e7e7e7', borderTop: '0px'}}>
                      <br/>
                       <h4 style={{textAlign:'center',color:'red'}}>Not found!!</h4>
                  </div>
              </div>
      )
  }



    return (
        <UserLayout>
            
            <div className="section">
                
                <div className="container">
    
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ color:'#19a6dd', textAlign:'center'}}>Recent Address</h2>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <br/>

                        {(loading) ? <div className='loader-container'><div className='loader'></div></div> : ""}  
                                    
                        {!loading && (address.length>=1 ? allAddress() : showNotfound())}
                      </div> 
                    </div>

                </div>

  
        <Backdrop className={classes.backdrop} open={loading} >
            <CircularProgress color="inherit" />
        </Backdrop>
        
        </UserLayout>
    )
}

export default RecentAddress
