import React from 'react'
import Layout from './Layout'
import BannerSection from '../components/HomePage/BannerSection';

const SmartIrrigation = () => {
    return (
        <Layout>
            
            <BannerSection 
                topImg="org/serv-head.jpg" 
                page="smartIrrigation" 
                topHeading="Smart Sprinkler"
                topDescription="With Spruce Irrigation SmartDots can provide a completely automated lawn maintenance solution. When combined with our robotic mower solution, it provides a complete lawn care solution that helps you achieve a lush green lawn. Moreover with Spruce you can save a lot of water!"
            /> 
            

            <p><img src="assets/img/org/Spruce_2.jpg" style={{width: 'auto', maxWidth: '100%', height: 'auto'}} alt="" /></p>
            <p><img src="assets/img/org/Spruce_3.jpg" style={{width: 'auto', maxWidth: '100%', height: 'auto'}} alt="" /></p>
            <p><img src="assets/img/org/Spruce_4.jpg" style={{width: 'auto', maxWidth: '100%', height: 'auto'}} alt="" /></p>
            <p><img src="assets/img/org/Spruce_5.jpg" style={{width: 'auto', maxWidth: '100%', height: 'auto'}} alt="" /></p>
            <p><img src="assets/img/org/Spruce_6.jpg" style={{width: 'auto', maxWidth: '100%', height: 'auto'}} alt="" /></p>
            <p><img src="assets/img/org/Spruce_7.jpg" style={{width: 'auto', maxWidth: '100%', height: 'auto'}} alt="" /></p>
            
        </Layout>
    )
}

export default SmartIrrigation
