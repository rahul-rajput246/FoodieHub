import "./About.css";
import "./Home.css";
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
  const [aboutData, setAboutData] = useState(() => {
    try {
      const cached = localStorage.getItem("aboutDataCache");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [homeData, setHomeData] = useState(() => {
    try {
      const cached = localStorage.getItem("homeDataCache");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    axios.get("/api/home-data/about")
      .then((res) => {
        if (res.data?.data) {
          setAboutData(res.data.data);
          try {
            localStorage.setItem("aboutDataCache", JSON.stringify(res.data.data));
          } catch (e) {
            console.warn("Could not cache about data:", e);
          }
        }
      })
      .catch((error) => {
        console.log("error Fetching about API:", error);
      });
  }, []);

  useEffect(() => {
    if (!homeData) {
      axios.get("/api/home-data/home")
        .then((res) => {
          if (res.data?.data) {
            setHomeData(res.data.data);
            try {
              localStorage.setItem("homeDataCache", JSON.stringify(res.data.data));
            } catch (e) {
              console.warn("Could not cache home data:", e);
            }
          }
        })
        .catch((error) => {
          console.log("Error fetching home API:", error);
        });
    }
  }, [homeData]);

  if (!aboutData && !homeData) {
    return (
      <>
        <Navbar totalQty={totalQty} user={user} />
        <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-warning" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading About Us...</span>
          </div>
          <p className="mt-3 text-secondary">Loading FoodieHub story...</p>
        </div>
        <Footer />
      </>
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
