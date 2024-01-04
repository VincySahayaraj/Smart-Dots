import React from 'react'
import Layout from './Layout'
import HomeBannerSection from '../components/HomePage/HomeBannerSection';
import FeaturedServiceSection from '../components/HomePage/FeaturedServiceSection';
import SpruceIrrigationSection from '../components/HomePage/SpruceIrrigationSection';
import DotGateSection from '../components/HomePage/DotGateSection';
import QuoteSections from '../components/HomePage/QuoteSections';
import SafelySection from '../components/HomePage/SafelySection';
import ConsultingSection from '../components/HomePage/ConsultingSection';
import PortfolioSection from '../components/HomePage/PortfolioSection';
import TestimonialSection from '../components/HomePage/TestimonialSection';

const Home = () => {

    return (
        <Layout>
        
            <HomeBannerSection 
                topImg="slider/slider-1.png" 
                page="home" 
                topHeading="Get an<br/>
                ‘always mowed’ lawn"
                topDescription="Our residential and commercial robotic lawn mower solutions ensures that your lawn remains mowed throughout the year, while giving you time to tackle other important things."
            />

            {/* <!-- Start Main Section --> */}
            <main id="main">
                <FeaturedServiceSection />
                <SpruceIrrigationSection />
                <DotGateSection />
                <QuoteSections />
                <SafelySection />
                <ConsultingSection />
                <PortfolioSection />
                <TestimonialSection />   
           </main>
            {/* <!-- End Main Section --> */}

           <a href="/" className="back-to-top"><i className="icofont-simple-up"></i></a>   
       
        </Layout>
    )
}

export default Home
