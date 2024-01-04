import React from 'react'

const SpruceIrrigationSection = () => {
    return (
        <>
            <div className="col-md-12 px-0">
                <div className="container">
                    <div className="col-md-10 col-lg-10 welcome-pos tp-menu-show">
                        
                        <h2 className="oswald-font">SPRUCE IRRIGATION</h2>
                        <hr className="new5" />

                        <div className="row">
                            <div className="col-md-5">           
                                <ul>
                                    <li style={{fontSize: '20px', textDecoration: 'underline'}}> <strong>Climate control</strong></li>
                                    <p>Advanced algorithms trace hyper-local weather and landscape requirements to create the perfect climate for your yard. Customize rain, wind, and freeze skip settings.</p>
                                    
                                    <li style={{fontSize: '20px', textDecoration: 'underline'}}> <strong>Catch leaks</strong></li>
                                    <p>Catch leaks early with flow meter integration. Spruce offers exclusive real time flow tracking. Works with most flow meters.</p>
                                </ul>
                            </div>

                            <div className="col-md-5">          
                                <ul className="pl-5">                            
                                    <li style={{fontSize: '20px', textDecoration: 'underline'}}> <strong>Unleash your  green thumb </strong></li>
                                    <p>Simple setup from advanced options. Follow the steps in the Spruce app to generate an advanced weather aware water schedule personalized for you.</p>                       
                                </ul>
                                <div className="col-md-12 pl-5">
                                    <p className="pt-3">Coming Soon! Integration between Spruce and Automover</p>
                                    <a href="/smart-irrigation" className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Learn more</a>

                                </div>
                            </div>
                        </div>     
                    </div>

                </div>
                    <img src="assets/img/ad-btm.png" className="img-fluid" alt="" />
            </div>  


            <div className="col-md-12 sh-img pt-3 pl-5 pb-4">    
                <h2 className="oswald-font">SPRUCE IRRIGATION</h2>
                <hr className="new5" />
                 <ul>
                    <li>Climate Control</li>
                    <p>Advanced algorithms trace hyper-local weather and landscape requirements to create the perfect climate for your yard. Customize rain, wind, and freeze skip settings.</p>
                    <li>Catch leaks </li>
                    <p>Catch leaks early with flow meter integration. Spruce offers exclusive real time flow tracking. Works with most flow meters.</p>
                    <li>Unleash your  green thumb</li>
                    <p>Simple setup from advanced options. Follow the steps in the Spruce app to generate an advanced weather aware water schedule personalized for you.</p>
                </ul>
                <p className="oswald-font">Coming Soon! Integration between Spruce and Automover</p>
                <a href="/smart-irrigation" className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Learn more</a>
            </div>         
        </>
    )
}

export default SpruceIrrigationSection
