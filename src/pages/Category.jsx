import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import CategoryPage from "../components/CategoryPage";
import Footer from "../components/Footer";
import { CategoryBannerData } from "../data/Categorydata";

function Category({ totalQty }) {
    return (
        <>
            <Navbar totalQty={totalQty} />

            <HomeBanner details={CategoryBannerData} />

            <CategoryPage />

            <Footer />
        </>
    );
}

export default Category;