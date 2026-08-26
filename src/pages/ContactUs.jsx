import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import ContactTiming from "../components/ContactUsTiming";
import ContactForm from "../components/ContactUsForm";
import CTASection from "../components/CTASection";
import ContactMap from "../components/ContactMap";
import "./ContactUs.css";

import {useEffect , useState} from 'react';

function ContactUs({  totalQty, user }) {

    const [contactData , setContactData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/home-data/contact')
        .then((res) => res.json())
        .then((result) => {
            console.log("Fatching API:" , result);
            setContactData(result.data);
        })
        .catch((error) => {
            console.log('error fatching Api:' , error);
        });
    } , []);

    const [aboutData , setAboutData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/home-data/about')
        .then((res) => res.json())
        .then((result) => {
            console.log('Apt Data:',result)
            setAboutData(result.data)
        })
        .catch((error) => {
            console.log("error Fatching API" , error);
        });
    }, []);

//     useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       await fetch("http://localhost:8000/sanctum/csrf-cookie", {
//         credentials: "include",
//       });

//       const res = await fetch("http://localhost:8000/api/user", {
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Not logged in");

//       const data = await res.json();
//       setUser(data);
//     } catch (err) {
//       setUser(null);
//     }
//   };

//   fetchUser();
// }, []);

     if (!contactData || !aboutData) {
        return (
            <div className="text-center py-5">
            <div className="spinner">
                <img src="public/assets/favicon/favicon.png" alt="loading..." loading="lazy"/>
            </div>
            </div>
        );
    }

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