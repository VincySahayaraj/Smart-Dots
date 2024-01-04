import React from 'react'

const BottomBanner = () => {
    return (
        <section style={{backgroundImage: 'linear-gradient(90deg, #00e2d8, #00a6e4)'}}>
              
              <div className="container"> 
                <div className="row">
                    <div className="col-lg-6 pt-3">
                        <div className="col-lg-12 pt-5">
                            <img src="assets/images/safely-min.png" width="75%" style={{opacity: '0.8'}} alt="" />    
                        </div>
                    </div>
                   <div className="col-lg-6 pt-3">
                            {/* <div className="col-lg-12 pt-5">
                                <div className="col-md-12 pl-0">
                                    <p className="mb-1">BE THE FIRST TO KNOW</p>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control boder-radi-0" placeholder="Enter Email" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary boder-radi-0" type="submit">Subscribe</button>  
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default BottomBanner
