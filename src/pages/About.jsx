import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import { AboutData } from "../data/Aboutdata";
import AboutStory from "../components/AboutUsSection";
import WhyToChooseUs from "../components/whytoChooseUs";
import { whyToChooseUs, Testomonial, faqs  } from "../data/Homedata";
import Specialist from "../components/AboutSpecialist";
import HowItWorks from "../components/HowItWorks";
import TestomonialSection from "../components/TestomonialSection";
import CTASection from "../components/CTASection";
import FAQSection from "../components/FAQSection";

function AboutPage(){
    return (
        <>
           
            <Navbar />

            <Banner details={AboutData}/>

            <AboutStory />

            <WhyToChooseUs
                title={whyToChooseUs[0].title}
                subtitle={whyToChooseUs[0].subtitle}
                items={whyToChooseUs[0].items}
            />

            <Specialist />

            <HowItWorks />

            <CTASection />
            
            <TestomonialSection
                title="Loved By Food Lovers"
                desc="See what our happy customers say about the taste, freshness, and fast delivery of FoodieHub."
                items={Testomonial}
            />

            <FAQSection items={faqs} />

            <Footer />
        </>
    );
}

export default AboutPage;