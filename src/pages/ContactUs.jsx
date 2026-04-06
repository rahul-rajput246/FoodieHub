import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import {ContactBannerData ,contactData } from "../data/ContactUsdata";
import ContactTiming from "../components/ContactUsTiming";
import ContactForm from "../components/ContactUsForm";
import "./ContactUs.css";
function ContactUs(){
    return(
        <>
            <Navbar />

            <Banner details={ContactBannerData}/>

            <ContactTiming items={contactData}/>

            <ContactForm />

            <Footer />
        </>
    );
}

export default ContactUs;