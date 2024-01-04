import React from 'react'
import Layout from '../Layout'

const PaymentSuccess = () => {

    return (
        <Layout>

            <div style={{paddingTop:'80px'}} className="section pp-scrollable slide-dark slide-dark-footer">
                <div className="container">
                    <div className="col-md-12 top-det-sp-in">

                        <div className="col-md-12">
                            <div className="jumbotron" style={{backgroundImage: 'linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)', color:'white'}}>
                                <h3 style={{textAlign:'center'}}>Order Success</h3>
                            </div>
                        </div>

                        <div className="col-md-12 plr-0px">
                            <div className="container plr-0px">
                                <div className="row px-5 pt-5 qty-text pb-2">
                                     <div className="alert alert-success"><h4>Thank you. Your order has been placed successfully! <a className="btn btn-info btn-gra-my-p" href="/user/yourorders">Click here to see your order</a></h4></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="push"></div>
            </div>
            
        </Layout>
    )
}

export default PaymentSuccess
