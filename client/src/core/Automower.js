import React from 'react'
import Layout from './Layout'
import BannerSection from '../components/HomePage/BannerSection';

const Automower = () => {
    return (
        <Layout>
           <BannerSection 
            topImg="org/main-header.jpg" 
            page="automower" 
            topHeading="Get an<br/>
            ‘always mowed’ lawn"
            topDescription="Our residential and commercial robotic lawn mower solutions ensures that your lawn remains mowed throughout the year, while giving you time to tackle other important things."
        /> 
            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/wide-range.png" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Wide range of options</h1>
                        <p className="textcustom no-plr-0">SmartDots will work with you to determine the mower model that works the best for your yard, whether it is a single family home, a town house with a small yard or a commercial space like a football field or golf course. With more than 3 years of experience in DFW area, no yard is impossible for an Automower, when designed and installed by SmartDots. We are the <strong>#1</strong>  robotic mower solution providers in the DFW area.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#f2f2f2'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Extreme Slope Handling</h1>
                        <p className="textcustom no-plr-0">Models that handle anywhere between <strong>30%</strong> to <strong>70%</strong> of slope make slope handling a breeze. Whether you have a yard that’s too steep to walk on or a yard where traditional mowers are difficult to mow with, an Automower can mow it without any problem. SmartDots ensures that best practices for a proper installation on slopes is applied for hassle free operation.</p>
                    </div>    
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/extreme-slope.png" className="img-responsive" alt="" />
                    </div> 
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#e2f0d9'}}>
                <div className="row">          
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/preci.png" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Precision Cutting System</h1>
                        <p className="textcustom no-plr-0">A precision cutting system with pivoting blades ensures that grass is cut gently without causing significant damage to itself and any objects like toys or branches that the mower may come across in the yard. This also makes it very easy to change the blades and keep the cut quality high throughout the year.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundImage: 'url(assets/img/org/sleep.png)', paddingTop: '60px', paddingBottom: '60px', backgroundSize: '100% 400px'}}>
                <div className="row">          
                    <div className="col-md-5">
                        
                    </div>
                    <div className="col-md-7">
                        <h1 style={{paddingLeft: '30px', color: '#FFF', fontWeight: '600', textTransform: 'capitalize'}}>Quiet Operation</h1>
                        <p className="textcustom" style={{color: '#FFF'}}>The Automower operates quietly, making it possible to mow your yard even in the night so that the yard is available to you the entire day without any interference. With a guaranteed sound level of 59 dB(A), Automower is the most quiet robotic mower in the industry. </p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#fff2cc'}}>
                <div className="row">      
                    <div className="col-md-7 no-plr-0">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>Smart Technology</h1>
                        <p className="textcustom no-plr-0">The Automower comes with  <strong>built in GPS tracker</strong> and <strong>pin code access system</strong>  that provides theft protection and the GPS enables the mower to assess areas that it has already mowed so that it covers all corners of the yard. Guide wires and base station radio signals help the mower get back to the charging station without running out of battery. Access to the mower via a mobile app, enables you to always know what your mower is upto and enables you to make changes such as changing cutting height from the phone itself.</p>
                    </div>    
                    <div className="col-md-5 res-p-right btm-shadow" style={{paddingLeft:'0px'}}>
                        <img src="assets/img/org/smat-tech.png" className="img-responsive" alt="" />
                    </div> 
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20" style={{backgroundColor:'#dae3f3'}}>
                <div className="row">    
                    <div className="col-md-5 works-bg btm-shadow" style={{paddingLeft:'0px'}}>
                        <iframe title="SmartDots" width="100%" height="270" src="https://www.youtube.com/embed/jlMx7uG7UV0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    </div>   
                    <div className="col-md-7 no-plr-0 pt-tp-n">
                        <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize'}}>How it works</h1>
                        <p className="textcustom no-plr-0">The video below gives a quick overview on how the Automower works . SmartDots is an authorized Husqvarna dealer that can sell and install these robotic mowers to work for virtually any yard.<br/><br/> 
                        <strong>SmartDots is the #1 Robotic Mower Solution Provider in the Dallas-FortWorth area.</strong><br /><br /> Video preview here. </p>
                    </div>    
                    
                    <div className="clearfix"></div>
                </div>
            </div> 

            <div className="page-container padd-20 text-center" style={{backgroundColor: '#e2f0d9'}}>

                <h1 style={{paddingLeft: '30px', fontWeight: '600', textTransform: 'capitalize', marginBottom: '25px'}}>Benefits of automower for your smart lawn maintenance</h1>
                

                
                <div className="col-md-12 res-p-left btm-shadow" style={{paddingRight: '0px'}}>
                    <div className="row">
                        <div className="col-md-4 text-center pt-tp-n" style={{backgroundColor: '#7f7f7f'}}>
                            <h3 className="col-white mb-20 font-bold-nw">Get MORE Time</h3>
                            <p className="col-white">Free up time to do other important things like spending time with family or learning music.<br/><br/></p>
                            <p><img src="assets/img/org/time.png" alt="" /></p>
                        </div>

                        <div className="col-md-4 text-center pt-tp-n" style={{backgroundColor: '#6ab41c'}}>
                            <h3 className="col-white mb-20 font-bold-nw">Always Ready Lawn</h3>
                            <p className="col-white">The lawn will always be ready for you – No more last minute mowing before a party.<br/><br/></p>
                            <p><img src="assets/img/org/like.png" alt="" /></p>
                        </div>

                        <div className="col-md-4 text-center pt-tp-n" style={{backgroundColor: '#656565'}}>
                            <h3 className="col-white mb-20 font-bold-nw">ECO Friendly</h3>
                            <p className="col-white">The robotic mower works on Lithium Ion Batteries, and hence no emissions. Reduce your carbon footprint.<br/><br/></p>
                            <p><img src="assets/img/org/ecco.png" alt="" /></p>
                        </div>

                        <div className="col-md-4 text-center pt-tp-n" style={{backgroundColor: '#c55a11'}}>
                            <h3 className="col-white mb-20 font-bold-nw">Natural Fertilizer</h3>
                            <p className="col-white">The small clippings due to constant mowing decompose fast and are fed back as fertilizer. <br/><br/></p>
                            <p><img src="assets/img/org/ferti.png" alt="" /></p>
                        </div>

                        <div className="col-md-4 text-center pt-tp-n" style={{backgroundColor: '#008fc3'}}>
                            <h3 className="col-white mb-20 font-bold-nw">No Weeds , Bugs</h3>
                            <p className="col-white">Constant mowing ceases weeds to flourish and also keeps bugs away.<br/><br/></p>
                            <p><img src="assets/img/org/no-weed.png" alt="" /></p>
                        </div>

                        <div className="col-md-4 text-center pt-tp-n" style={{backgroundColor: '#6ab41c'}}>
                            <h3 className="col-white mb-20 font-bold-nw">Privacy</h3>
                            <p className="col-white">No more invasion of privacy by 3rd party services. Robotic mower will get it done with better results<br/><br/></p>
                            <p><img src="assets/img/org/lock.png" alt="" /></p>
                        </div>

                        <div className="col-md-4 text-center col-md-offset-4 pt-tp-n" style={{backgroundColor: '#7f7f7f'}}>
                            <h3 className="col-white mb-20 font-bold-nw">It's Cool</h3>
                            <p className="col-white">It will definitely be a topic of discussion among friends – We just know it!<br /><br /></p>
                            <p><img src="assets/img/org/cool.png" alt="" /></p>
                        </div>
                        

                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="clearfix"></div>
                
            </div>
            
        </Layout>
    )
}

export default Automower
