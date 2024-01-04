import React from 'react'
import Layout from './Layout'
import BannerSection from '../components/HomePage/BannerSection';

const Commercial = () => {
    return (
        <Layout>

           <BannerSection 
                topImg="org/commercial.jpg" 
                page="commercial" 
                topHeading="Mow into the<br/>
                future"
                topDescription="Commercial entities can benefit the most with our robotic mowing solution. Delegate mowing to the robots while leveraging your crews to engage in high skilled jobs like maintaining beds, trees and more."
            /> 

            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/chart.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>ROI Of Less Than 1.5 Years</h1>
                        <p className="textcustom no-plr-0">When purchased upfront, the ROI is reached in less than 18 months. At approximately 1 acre per mower on an average, the cost of mowing with robotic mowers, versus crews is significantly lesser. Not to forget that there is reduction in fertilizing, pest control and weed control as well.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#f2f2f2'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Business Case For All Scenarios</h1>
                        <p className="textcustom no-plr-0">Our robotic mowing solution is applicable for various kind of commercial entities. Some examples are Golf Courses (even the fairways), City Parks and Zoos, Universities, Schools &amp; Sports Fields, Landscaping Businesses, Restaurants, Corporate Offices etc.  There is a solid business model for every scenario. Call us at <span><a href="tel:+14696296922">469-629-6922 </a></span>to learn more.</p>
                    </div>    
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/all-scene.jpg" className="img-responsive" alt="" />
                    </div> 
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#e2f0d9'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/slopes.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Slopes & Terrains Is A Breeze</h1>
                        <p className="textcustom no-plr-0">More than 80,000 injuries and about 70 deaths occur each year while mowing, especially on extreme sloping landscapes. Outsourcing this task to robotic mowers helps reduce injury risks and with models such as the Husqvarna Automower 535 AWD, rough terrain and extreme slopes is not a problem at all.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#fff2cc'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>How It Works?</h1>
                        <p className="textcustom no-plr-0">A short video that shows how professional mowing with robotic mowers works for the Husqvarna Automower. This should answer any questions and provide clarity on the product and its maintenance and management.</p>
                    </div>    
                    <div className="col-md-5 res-p-left btm-shadow" style={{paddingRight: '0px'}}>
                        <iframe title="commercial" width="100%" height="270" src="https://www.youtube.com/embed/81K9bniTe7c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor: '#dae3f3'}}>
                <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Multiple options available</h1>
                    
                <div className="col-md-12 no-plr-0" style={{overflowX: 'auto'}}>
                    
                    <table className="table table-bordered mb-5" style={{width: '100%'}}>
                        <thead className="primary">
                        <tr className="col-white" style={{backgroundColor: '#4472c4'}}>
                            <th style={{backgroundColor:'#FFF'}}>&nbsp;</th>
                            <th style={{backgroundColor:'#FFF', textAlign: 'center'}}><img src="assets/img/org/auto-1.jpg" alt="" /></th>
                            <th style={{backgroundColor:'#FFF', textAlign: 'center'}}><img src="assets/img/org/auto-2.jpg" alt="" /></th>
                            <th style={{backgroundColor:'#FFF', textAlign: 'center'}}><img src="assets/img/org/auto-3.jpg" alt="" /></th>
                        </tr>
                        <tr className="col-white" style={{backgroundColor: '#4472c4'}}>
                            <th>Specs</th>
                            <th>Automower 550</th>
                            <th>Automower 550H</th>
                            <th>Automower 535 AWD</th>
                        </tr>
                        </thead>
                        <tbody>
                            
                        <tr className="bg-1">
                            <td>Working area capacity (±20%) </td>
                            <td>1.25 acres</td>
                            <td>1.25 acres</td>
                            <td>0.9~1 acre</td>
                        </tr>
                        <tr className="bg-2">
                            <td>Maximum incline within the working area</td>
                            <td>24 degrees</td>
                            <td>24 degrees</td>
                            <td>35 degrees</td>
                        </tr>
                        <tr className="bg-1">
                            <td>Typical mow time on one charge</td>
                            <td>270 mins</td>
                            <td>270 mins</td>
                            <td>100 mins</td>
                        </tr>
                        <tr className="bg-2">
                            <td>Typical charging time </td>
                            <td>60 mins</td>
                            <td>60 mins</td>
                            <td>30 mins</td>
                        </tr>
                        <tr className="bg-1">
                            <td>Max Cutting Height</td>
                            <td>2.4 inches</td>
                            <td>~3.6 inches </td>
                            <td>2.4 inches</td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>
                <div className="clearfix"></div>
            </div>

            <div className="page-container padd-20" style={{backgroundColor:'#e2f0d9'}}>
                <div className="row">  
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Leasing Makes It Easy</h1>
                        <p className="textcustom no-plr-0">With commercial leasing options offered by SmartDots, the upfront cost of procuring a robotic mowing solution becomes absolutely minimal. Low monthly payments with the options of owning the equipment or refreshing with new at the end of the lease makes it easy to manage cashflow, while saving more and growing your business. Leasing terms of 12, 24,36 and 48 months is available. Municipalities and cities and benefit from our special municipal leasing program.</p>
                    </div>        
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/leasing.jpg" className="img-responsive" alt="" />
                    </div>
                    
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#FFF'}}>
                <div className="row">  
                          
                    <div class="col-md-5 res-p-right btm-shadow" style={{paddingLeft: '0px'}}>
                        <iframe title="commercial1" width="100%" height="270" src="https://www.youtube.com/embed/46VqpotD5eg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    </div>

                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Easily Manage The Entire Fleet</h1>
                        <p className="textcustom no-plr-0">Managing the fleet of commercial mowers cannot get simpler than this. A free fleet services platform from Husqvarna enables you to manage mowers across multiple properties from your phone or desktop. If a storm is expected park the entire fleet, change the cutting height of mowers within a single park, or adjust the schedule for all the mowers, it is all just a click away. This video gives an overview of the fleet services platform.</p>
                    </div>  
                    
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#fff2cc'}}>
                <div className="row">          
                    
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>No Power? No Problem!</h1>
                        <p className="textcustom no-plr-0">Our solar solution dotStellar is the answer when it gets expensive to bring power to remote locations of a park or similar properties. With our solar solution, 1 day of battery back up (expandable) enables the mower to even run on cloudy days without stopping. Moreover it makes it a self-sustaining mowing solution without the need of any external power source.</p>
                    </div>
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/no-power.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/protect.jpg" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Protect the mower</h1>
                        <p className="textcustom no-plr-0">One of the primary concerns at a public space is vandalism while the mower is parked. This is addressed by a product that is only available through SmartDots – dotBarn. A solid steel construction, powder coated and designed to avoid water stagnation, promote RF communication with the mower and ventilated to reduce wind load. A modular design enables separation of the door, foyer and the main enclosure. dotBarn protects the Automower from the elements, vandalism and interruption.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor: '#fff2cc'}}>
                <div className="row">
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600'}}>Use Case: City of Dallas</h1>
                    <p className="textcustom no-plr-0">City of Dallas is one of the first cities to adopt robotic mowing into their parks maintenance system, made possible by SmartDots. 
                    SmartDots has been working closely with the city to design the solution, deploy the mowers and service the mowers as well. This short video highlights the initial deployment at the Kiest Park in Dallas, which is being expanded to many parks this year.</p>
                    </div>
                    <div className="col-md-5 res-p-left btm-shadow" style={{paddingRight: '0px'}}>
                        <iframe title="commercial2" width="100%" height="270" src="https://www.youtube.com/embed/9hsvqKDesHc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

        </Layout>
    )
}

export default Commercial
