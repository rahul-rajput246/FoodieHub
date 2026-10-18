import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import ContactTiming from "../components/ContactUsTiming";
import ContactForm from "../components/ContactUsForm";
import CTASection from "../components/CTASection";
import ContactMap from "../components/ContactMap";
import "./ContactUs.css";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../config";
import { DEFAULT_CONTACT_DATA, DEFAULT_ABOUT_DATA } from "../data/defaultPageData";

function ContactUs({ totalQty, user }) {

    const [contactData, setContactData] = useState(() => {
      try {
        const cached = localStorage.getItem("contactDataCache");
        return cached ? JSON.parse(cached) : DEFAULT_CONTACT_DATA;
      } catch {
        return DEFAULT_CONTACT_DATA;
      }
    });

    const [aboutData, setAboutData] = useState(() => {
      try {
        const cached = localStorage.getItem("aboutDataCache");
        return cached ? JSON.parse(cached) : DEFAULT_ABOUT_DATA;
      } catch {
        return DEFAULT_ABOUT_DATA;
      }
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/home-data/contact`)
        .then((res) => res.json())
        .then((result) => {
            if (result.data) {
              setContactData(result.data);
              try {
                localStorage.setItem("contactDataCache", JSON.stringify(result.data));
              } catch (e) {
                console.warn("Could not cache contact data:", e);
              }
            }
        })
        .catch((error) => {
            console.log('error fetching contact API:', error);
        });
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/home-data/about`)
        .then((res) => res.json())
        .then((result) => {
            if (result.data) {
              setAboutData(result.data);
              try {
                localStorage.setItem("aboutDataCache", JSON.stringify(result.data));
              } catch (e) {
                console.warn("Could not cache about data:", e);
              }
            }
        })
        .catch((error) => {
            console.log("error fetching about API:", error);
        });
    }, []);

    return(
        <>
            <Navbar totalQty={totalQty} user={user} />

            <Banner details={contactData} bannerKey="contact_banner"/>

            <ContactTiming details={contactData}/>

            <ContactForm details={contactData}/>

            <CTASection details={aboutData}/>

            <ContactMap details={contactData}/>

            <Footer />
        </>
    );
}

export default ContactUs;