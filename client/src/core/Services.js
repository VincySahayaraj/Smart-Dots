import React from 'react'
import Layout from './Layout'
import BannerSection from '../components/HomePage/BannerSection';

const Services = () => {
    return (
        <Layout>

            <BannerSection 
                topImg="org/serv-head.jpg" 
                page="services" 
                topHeading="SmartDots are<br/>
                the experts!"
                topDescription="SmartDots has been selling and installing robotic lawn mowers since 2016. Our expertise in the field complemented by some of our own products helps us provide the best in class service for robotic mowers, no matter the complexity of installation."
            /> 

            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/Installation.gif" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Professional Installation</h1>
                        <p className="textcustom no-plr-0">Our professional installation service ensures that your mower is installed correctly and any unforeseen challenges are addressed before any issues occur. We leverage the wire laying machine designed specifically for robotic mower installations to ensure that the wire is hidden and protected. Whether its just a backyard or a complex installation that includes back and front yard, separated by a fence and driveways, we will ensure that the robotic mower gets every inch of the yard.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor:'#f2f2f2'}}>
                <div className="row">          
                    
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Annual Service</h1>
                        <p className="textcustom no-plr-0">Just like your car, even the robotic mowers require regular service to ensure optimal performance and smooth operation. SmartDots offers annual maintenance service where tasks such as cleaning the mower, change of weather seal, re-calibration of sensors, checking the battery, firmware upgrades, lubrication of all bearings and a long list of other tasks are performed to ensure the mower is ready for the next mowing season. We also offer optional pick up and drop off service.</p>
                    </div>
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/annual-ser.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor:'#e2f0d9'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/dotGate_or.gif" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>DotGate</h1>
                        <p className="textcustom no-plr-0">Our patent pending product dotGate ensures that the mower has the ability to autonomously move between the front and back yards when separated by a fence. An optional battery operated locking kit will soon be available that ensures that the gate remains locked when not required by the mower, preventing pets to get away through the gate. The dotGate was created to keep the robotic mower’s feature true to its completely automated capability. Without the dotGate, the user will have to move the mower manually between fences, which defeats the purpose of a fully automated robotic lawn mower.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor:'#fff2cc'}}>
                <div className="row">          
                    
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>DotWrap</h1>
                        <p className="textcustom no-plr-0">A robotic lawn mower can also have some style. dotWrap is a solution offered by SmartDots that enables users to wrap their robotic mowers with skins that add some character to their robotic mowers. Whether you want to promote your small business locally, add a skin that matches the holiday theme or just protect the mower from scratches, dotWrap is a solution that addresses it all.</p>
                    </div>
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/dot-wrap.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/warranty.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Warranty & Repair Services</h1>
                        <p className="textcustom no-plr-0">Our trained and certified technicians are ready to repair any issues related to the robotic mower. You simply have to drop off your mower or arrange for a pick up/drop off service with us and we will take it from there. If your mower is within warranty then there is nothing that you have to worry about. Our workshop is equipped to address any kind of repair that is needed to get the mower back to work.</p>
                    </div>
                    
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor:'#e2f0d9'}}>
                <div className="row">          
                    
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>On-Site Services</h1>
                        <p className="textcustom no-plr-0">If the boundary wire that was installed was broken during a landscaping project or if re-wiring is required after addition of a swimming pool, we can take care of it for you. We provide services to resolve broken wire, mark boundary/guide wire for aeration or even re-wire certain areas. We leverage state-of-the-art tools to identify wires underground and our efficient processes ensure that the issue is identified and resolved fast.</p>
                    </div>
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/onsite.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor: '#fff2cc'}}>

                <div className="col-md-12 no-plr-0">
                    <h1 style={{paddingLeft: '30px', fontWeight: '600'}}>Financing </h1>
                    <p className="textcustom no-plr-0">As Husqvarna dealers, we are able to offer great financing options that make it really affordable to purchase the robotic mowers for your home or business. 0% interest @ 36 or 48 months  for qualified buyers makes robotic mowing cheaper than traditional lawn care services. Moreover, after the end of term, your lawn mowing is virtually free with high quality performance.</p>
                </div>
                <div className="col-md-12 res-p-left btm-shadow" style={{paddingRight: '0px'}}>
                    <div className="row">
                  
                        <div className="col-md-4 text-center" style={{backgroundColor: '#c55a11'}}>
                            <h3 className="col-white mb-20 font-bold-nw pt-tp-n">Apply for Credit</h3>
                            <p className="col-white">Easy online application for credit. 0% interest rates available for qualified buyers. Instant Approval.</p>
                            <p><img src="assets/img/org/order.png" alt="" /></p></div>
                            <div className="col-md-4 text-center" style={{backgroundColor: '#5ca90b'}}>
                            <h3 className="col-white mb-20 font-bold-nw pt-tp-n">Get Approved</h3>
                            <p className="col-white">Upon approval submit copy of drivers license and signed loan contract.</p>
                        <p><img src="assets/img/org/tick.png" alt="" /></p></div>
                        <div className="col-md-4 text-center" style={{backgroundColor: '#008fc3'}}>
                            <h3 className="col-white mb-20 font-bold-nw pt-tp-n">Easy Payments</h3>
                            <p className="col-white">Pay very affordable monthly installments<br /><br />
                        </p>
                        <p><img src="assets/img/org/pay.png" alt="" /></p></div>
                            <div className="clearfix"></div>
                        </div>
                    <div className="clearfix"></div>
                </div>
            </div>
            
        </Layout>
    )
}

export default Services
