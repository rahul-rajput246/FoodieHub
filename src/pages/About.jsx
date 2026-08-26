import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import AboutStory from "../components/AboutUsSection";
import WhyToChooseUs from "../components/whytoChooseUs";
import Specialist from "../components/AboutSpecialist";
import HowItWorks from "../components/HowItWorks";
import TestomonialSection from "../components/TestomonialSection";
import CTASection from "../components/CTASection";
import FAQSection from "../components/FAQSection";
import { useState, useEffect } from "react";
import axios from "axios";

function AboutPage({ totalQty, user }){
  const [aboutData , setAboutData] = useState(null);
  const [homeData , setHomeData] = useState(null);

  useEffect(() => {
    axios.get("/api/home-data/about")
      .then((res) => {
        setAboutData(res.data.data);
      })
      .catch((error) => {
        console.log("error Fatching API" , error);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/home-data/home")
      .then((res) => {
        setHomeData(res.data.data);
      })
      .catch((error) => {
        console.log("Error fatching API:" , error);
      });
  }, []);

   if (!aboutData || !homeData) {
      return (
        <div className="text-center py-5">
          <div className="spinner">
            <img src="public/assets/favicon/favicon.png" alt="loading..." loading="lazy"/>
          </div>
        </div>
      );
    }

  return (
    <>
      <Navbar totalQty={totalQty} user={user} />
      <Banner details={aboutData} bannerKey="about_banner" />
      <AboutStory details={aboutData} aboutStory="about_our_story"/>
      <WhyToChooseUs details={homeData} />
      <Specialist details={aboutData}/>
      <HowItWorks details={homeData}/>
      <CTASection details={aboutData} />
      <TestomonialSection details={homeData}/>
      <FAQSection details={homeData} />
      <Footer />
    </>
  );
}

export default AboutPage;
