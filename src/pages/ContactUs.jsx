import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import {ContactBannerData ,contactData } from "../data/ContactUsdata";
import ContactTiming from "../components/ContactUsTiming";
import ContactForm from "../components/ContactUsForm";
import CTASection from "../components/CTASection";
import ContactMap from "../components/ContactMap";
import "./ContactUs.css";
function ContactUs(){
    return(
        <>
            <Navbar />

            <Banner details={ContactBannerData}/>

            <ContactTiming items={contactData}/>

            <ContactForm />

            <CTASection />

            <ContactMap />

            <Footer />
        </>
    );
}

export default ContactUs;