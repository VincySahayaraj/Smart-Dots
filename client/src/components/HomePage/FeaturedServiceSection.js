import React from 'react'

const FeaturedServiceSection = () => {
    return (
                <section id="featured-services" className="featured-services pt-0">
                    <div className="container" data-aos="fade-up">
                    <div className="col-md-12 text-center pb-3"><h1 className="orange-color oswald-font">Packages</h1></div>
                        <div className="row">
                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq1.png" className="img-fluid" alt="" /></a>
                            </div>

                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq2.png" className="img-fluid" alt="" /></a>
                            </div>

                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq3.png" className="img-fluid" alt="" /></a>
                            </div>

                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq4.png" className="img-fluid" alt="" /></a>
                            </div>
                        </div>
                        <div className="col-md-12 text-center pt-5">
                            <a style={{padding:'18px 80px'}} className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" href="#/" /* data-src={window.location.href} href="/product-listing" */>Shop Now</a>
                        </div>
                    </div>
                </section>
    )
}

export default FeaturedServiceSection
