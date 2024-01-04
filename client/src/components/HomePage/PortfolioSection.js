import React from 'react'

const PortfolioSection = () => {
    return (
        <section id="portfolio" className="portfolio py-0">
            <div id="demo" className="carousel slide" data-ride="carousel">

                {/* <!-- Indicators --> */}
                <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" className="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                    <li data-target="#demo" data-slide-to="3"></li>
                </ul>
            
            {/*  <!-- The slideshow --> */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="position-absolute container tp-menu-show">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color">
                            App Control & Theft Protection</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Mow your lawn at the ease of your fingertips <br />with smartphone compatibility. What's more? <br />Automower comes with a built in GPS tracker <br />and theft protection alarm and pincode <br />security alert provided in case of unauthorized <br />handling.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>

                    <img src="assets/img/bann-1.png" alt="Los Angeles" width="100%" className="tp-menu-show" />
                
                    <div className=" container sh-img">
                        <div className="col-md-12 first-testi pb-4">
                            <h1 className="oswald-font secu-color">
                            App Control & Theft Protection</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Mow your lawn at the ease of your fingertips with smartphone compatibility. What's more?Automower comes with a built in GPS tracker and theft protection alarm and pincode securityalert provided in case of unauthorized handling.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="position-absolute container tp-menu-show">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color">
                            Go 'GREEN'</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>The robotic mower works on Lithium-Ion <br />Batteries, and hence no emissions. <br />Eco-friendly solution, reduced carbon footprint.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                    <img src="assets/img/bann-2.png" alt="Los Angeles" width="100%" className="tp-menu-show" />

                    <div className="container sh-img">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color">
                            Go 'GREEN'</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>The robotic mower works on Lithium-Ion Batteries, and hence no emissions. Eco-friendly solution, reduced carbon footprint.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="position-absolute container tp-menu-show">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color">
                            No Weeds, Bugs, or Harmful <br/>Fertilizers</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Constant mowing ceases weeds to flourish <br/>and also keeps bugs away. The small <br/>clippings dueto constant mowing <br/>decompose fast and are fed back as a <br/>natural fertilizer.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                    <img src="assets/img/bann-3.png" alt="Los Angeles" width="100%" className="tp-menu-show" />

                    <div className="container sh-img">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color">
                            No Weeds, Bugs, or Harmful <br/>Fertilizers</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Constant mowing ceases weeds to flourish and also keeps bugs away. The small clippings dueto constant mowing decompose fast and are fed back as a natural fertilizer.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="position-absolute container tp-menu-show">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color text-uppercase">
                            Save MORE Time While Keeping <br />Your Lawn Always Ready</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Free up time to do other important things <br/>like spending time with family or learning <br/>music whileyour lawn is always ready <br/>for you – No more last-minute mowing <br/>before a party.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                    <img src="assets/img/bann-4.png" alt="Los Angeles" width="100%" className="tp-menu-show" />

                    <div className=" container sh-img">
                        <div className="col-md-12 self-top">
                            <h1 className="oswald-font secu-color text-uppercase">
                            Save MORE Time While Keeping Your Lawn Always Ready</h1>
                            <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Free up time to do other important things like spending time with family or learning music whileyour lawn is always ready for you – No more last-minute mowing before a party.</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <!-- Left and right controls --> */}
            <a className="carousel-control-prev" href="#demo" data-slide="prev" style={{fontSize: '50px', color: '#000'}}>
                <i className="icofont-curved-left tp-menu-show"></i>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next" style={{fontSize: '50px', color: '#000'}}>
                <i className="icofont-curved-right tp-menu-show"></i>
            </a>
        </div>
    </section>
    )
}

export default PortfolioSection
