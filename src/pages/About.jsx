import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import AboutData from "../data/Aboutdata";
import AboutStory from "../components/AboutUsSection";
function AboutPage(){
    return (
        <>
            <Navbar />
            <Banner details={AboutData}/>
            <AboutStory />
            <Footer />
        </>
    );
}

export default AboutPage;