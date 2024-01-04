import React from 'react'
import Layout from './Layout'
import BannerSection from '../components/HomePage/BannerSection';

const Residential = () => {
    return (
        <Layout>

           <BannerSection 
                topImg="org/resi-header.jpg" 
                page="residential" 
                topHeading="A lawn that takes<br/>
                care of itself"
                topDescription="Our Residential solution for robotic mowing addresses any kind of set up. Whether is just backyard or just front yard or both, we can achieve it, even if there is a fence in between."
            /> 

            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/wide-range.png" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>One Size Is Not For All</h1>
                        <p className="textcustom no-plr-0">With a wide range of models available with varying set of features and capabilities, SmartDots provides the insight on the best model that will work for your yard and your lifestyle. Different models have different capabilities and an optimal balance between cost, mowing efficiency and relevant feature set is essential for an amazing experience.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#f2f2f2'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Get A Better Lawn And More</h1>
                        <p className="textcustom no-plr-0">Home owners who have compared the robotic mower solution with traditional mowing have found that not only do they get a return on their investment within 2 years or less when compared to traditional services, but they also see reduction in use of fertilizers, significantly lesser weeds and reduced pests activity in their lawns. Moreover they no longer have to deal with the uncertain schedule of mowing crews and with any security or privacy concerns when crews had to come into their backyards.</p>
                    </div>    
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/geta-a-.png" className="img-responsive" alt="" />
                    </div> 
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#e2f0d9'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/mow.png" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Mow On The Go</h1>
                        <p className="textcustom no-plr-0">Automower X series come with 10 year cellular service included in the price of the mower. This enables you to stay in touch with the mower, no matter where you are. Whether you want to start change the cutting height before you get back from your vacation, park the mower when someone comes for service or adjust its schedule, the Automower Connect app enables you to do this and more from a single app.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            {/* <div className="page-container padd-20" style={{backgroundImage: 'url(assets/img/org/sleep.png)', paddingTop: '60px', paddingBottom: '60px', backgroundSize: '100% 400px'}}>
                <div className="row">          
                    <div className="col-md-5">
                        
                    </div>
                    <div className="col-md-7">
                        <h1 style={{paddingLeft: '30px', color: '#FFF', fontWeight: '600', textTransform: 'capitalize'}}>Quiet Operation</h1>
                        <p className="textcustom" style={{color: '#FFF'}}>The Automower operates quietly, making it possible to mow your yard even in the night so that the yard is available to you the entire day without any interference. With a guaranteed sound level of 59 dB(A), Automower is the most quiet robotic mower in the industry. </p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>  */}

            <div className="page-container padd-20" style={{backgroundColor:'#fff2cc'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Alexa! Park My Mower</h1>
                        <p className="textcustom no-plr-0">The Automower integrates with <strong>Alexa</strong> and <strong>IFTTT</strong> which enables some really useful use cases like controlling the mower with your voice and enabling use cases where it parks itself in case there is a thunderstorm in the area. With our core strength in smart home and automation, we can enable out customers with any specific use cases that they may need.</p>
                    </div>    
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/alexa.png" className="img-responsive" alt="" />
                    </div> 
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#f2f2f2'}}>
                <div className="row">    
                    <div className="col-md-5 res-p-left btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/dotGate_or.gif" className="img-responsive" alt="" />
                    </div>   
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Fence Is Not A Barrier</h1>
                        <p className="textcustom no-plr-0">If your home has a fence that separates the front yard from the backyard, then we have our patent pending product dotGate v2.0 that comes to the rescue. A solid metal gate with high quality finish is made, sold and installed by SmartDots that enables the mower to automatically move between the yards. The mower has the intelligence built in to manage narrow manages and find its way around.</p>
                    </div>    
                    
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#fff2cc'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Financing</h1>
                        <p className="textcustom no-plr-0">As Husqvarna dealers, SmartDots is able to offer great financing options that make it really affordable to purchase the robotic mowers for your home . 0% interest @ 36 or 48 months for qualified buyers makes robotic mowing cheaper than traditional lawn care services. Moreover, after the end of term, your lawn mowing is virtually free with high quality performance. If you consider the additional benefits of robotic mowing the ROI is a lot faster.</p>
                    </div>    
                    <div className="col-md-5 res-p-left btm-shadow" style={{paddingRight: '0px'}}>
                        <table className="table table-bordered mb-5" style={{width: '100%'}}>
                            <thead className="primary">
                                <tr className="col-white" style={{backgroundColor: '#4472c4'}}>
                                    <th>Term</th>
                                    <th>Interest Rate</th>
                                    <th>Approximate Monthly Payment</th>
                                </tr>
                            </thead>
                            <tbody>       
                                <tr className="bg-1">
                                    <td>12 Months</td>
                                    <td>0%</td>
                                    <td>$208 to $430*</td>
                                </tr>
                                <tr className="bg-2">
                                    <td>24 Months</td>
                                    <td>0%</td>
                                    <td>$100 - $235*</td>
                                </tr>
                                <tr className="bg-1">
                                    <td>36 Months</td>
                                    <td>0%</td>
                                    <td>$86 - $156*</td>
                                </tr>
                                <tr className="bg-2">
                                    <td>42 Months</td>
                                    <td>0%</td>
                                    <td>$74 - $133*</td>
                                </tr>
                                <tr className="bg-1">
                                    <td>48 Months</td>
                                    <td>0%</td>
                                    <td>$65 - $117* </td>
                                </tr>               
                            </tbody>
                        </table>
                    <p style={{fontStyle: 'italic'}}>*A down payment may be required</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20 text-center" style={{backgroundColor: '#e2f0d9', overflowX: 'auto'}}>

                <table className="table table-bordered mb-5 w100-tab">
                    <thead className="primary">
                    <tr className="col-white">
                        <th></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/11.jpg" alt="" /></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/12.jpg" alt="" /></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/1314.jpg" alt="" /></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/14.jpg" alt="" /></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/15.jpg" alt="" /></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/16.jpg" alt="" /></th>
                        <th style={{backgroundColor:'#FFF'}}><img src="assets/img/org/17.jpg" alt="" /></th>
                    </tr>
                    <tr className="col-white" style={{backgroundColor: '#4472c4'}}>
                        <th>Feature</th>
                        <th>115H</th>
                        <th>315X</th>
                        <th>430X</th>
                        <th>430XH</th>
                        <th>450X</th>
                        <th>450XH</th>
                        <th>435AWD</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-1 te-lt">
                        <td>Automower Connect</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td></td>
                    </tr>   
                    <tr className="bg-1 te-lt">
                        <td>Automower Connect @ Home</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td></td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>GPS Assisted Navigation</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>LED Headlights</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Remote Object Detection</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>Weather Timer</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Remote Start Points X5</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>GPS Theft Protection</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Ultra Silent Drive</td>
                        <td>&nbsp;</td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                        <td className="green-col"><i className="fa fa-check" aria-hidden="true"></i></td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>Passage Handling</td>
                        <td>Guided</td>
                        <td>Automated</td>
                        <td>Automated</td>
                        <td>Automated</td>
                        <td>Automated</td>
                        <td>Automated</td>
                        <td>Automated</td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Guide Wires</td>
                        <td>1</td>
                        <td>1</td>
                        <td>2</td>
                        <td>2</td>
                        <td>3</td>
                        <td>3</td>
                        <td>2</td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>Height Adjustment  </td>
                        <td>Manual</td>
                        <td>Manual</td>
                        <td>Electric</td>
                        <td>Electric</td>
                        <td>Electric</td>
                        <td>Electric</td>
                        <td>Electric</td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Slope Management</td>
                        <td>30%%</td>
                        <td>40%</td>
                        <td>45%</td>
                        <td>45%</td>
                        <td>45%</td>
                        <td>45%</td>
                        <td>70%</td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>Battery</td>
                        <td>2.0 Ah</td>
                        <td>2.0 Ah</td>
                        <td>5.0 Ah</td>
                        <td>5.0Ah</td>
                        <td>10.0 Ah</td>
                        <td>10.0 Ah</td>
                        <td>5.0 Ah</td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Work Capacity</td>
                        <td>0.4 Acre</td>
                        <td>0.4 Acre</td>
                        <td>0.8 Acre</td>
                        <td>0.8 Acre</td>
                        <td>1.25 Acre</td>
                        <td>1.25 Acre</td>
                        <td>~1 Acre</td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>Cutting Height </td>
                        <td>2 🡪 3.6 inches</td>
                        <td>0.8 🡪 2.4 inches</td>
                        <td>0.8 🡪 2.4 inches</td>
                        <td>2 🡪 3.6 inches</td>
                        <td>0.8 🡪 2.4 inches</td>
                        <td>2 🡪 3.6 inches</td>
                        <td>1.2 🡪 2.8 inches</td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Cutting Width</td>
                        <td>8.7 inches</td>
                        <td>8.7 inches</td>
                        <td>9.5 inches</td>
                        <td>9.5 inches</td>
                        <td>9.5 inches</td>
                        <td>9.5 inches</td>
                        <td>8.7 inches</td>
                    </tr>
                    <tr className="bg-1 te-lt">
                        <td>Typical Mowing Time</td>
                        <td>&lt; 60 mins</td>
                        <td>&lt; 60 mins</td>
                        <td>~2.5 hrs</td>
                        <td>~2.5 hrs</td>
                        <td>~5 hrs</td>
                        <td>~ 5 hrs</td>
                        <td>~ 1.5 hrs</td>
                    </tr>
                    <tr className="bg-2 te-lt">
                        <td>Typical Charging Time</td>
                        <td>60 mins</td>
                        <td>60 mins</td>
                        <td>60 mins</td>
                        <td>60 mins</td>
                        <td>60 mins</td>
                        <td>60 mins</td>
                        <td>30 mins</td>
                    </tr>
                    </tbody>
                </table>
                <div className="clearfix"></div>
            </div>

            <div class="page-container padd-20" style={{backgroundColor: '#fff2cc'}}>
                <div className="row">
                    <div class="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Use Case Example
                    </h1>
                    <p class="textcustom no-plr-0">An example of a home where SmartDots had sold and installed the mower to mow both font and back yards by using a gate in the fence to navigate itself. The mower had to not only cross the fence, but also cross the driveway and side walk to get to different areas and side yard of the lawn. It was a successful installation.

                    </p>
                    </div>
                    <div class="col-md-5 res-p-left btm-shadow" style={{paddingRight: '0px'}}>
                        <iframe title="residential" width="100%" height="270" src="https://www.youtube.com/embed/0Vxd9m0A9EI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>

            
            
        </Layout>
    )
}

export default Residential
