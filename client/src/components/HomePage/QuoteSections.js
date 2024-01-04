import React from 'react'

const QuoteSections = () => {
    return (
        <div className="col-md-12 py-5" style={{backgroundColor: '#4a5866'}}>

            <div className="container">     
                <div className="row">
                    <div className="col-md-4 text-center text-white">
                        <div className="col-md-12">
                            <img src="assets/img/file.png" className="mb-2" alt="" />
                            <h4>GET A QUOTE</h4>
                            <p>Contact us to schedule a free demo or provide us with your info and request for a quote</p><br />
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Get Started</button>
                        </div>
                    </div>

                    <div className="col-md-4 text-center text-white">
                        <div className="col-md-12">
                            <img src="assets/img/choosing.png" className="mb-2" alt="" />
                            <h4>CHOOSE YOUR SOLUTION</h4>
                            <p>Already know what you need? Shop our packages and we will work with you if needed to ensure everything goes smoothly</p>
                            <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Shop Now</button>
                        </div>
                    </div>

                    <div className="col-md-4 text-center text-white">
                        <div className="col-md-12">
                            <img src="assets/img/customer.png" className="mb-2" alt="" />
                            <h4>OUR SERVICES</h4>
                            <p>Learn more about the services we offer and schedule a visit with our trained and certified technicians.</p><br />
                            <a href="/services" className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuoteSections
