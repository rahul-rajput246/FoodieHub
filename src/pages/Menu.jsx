import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import MenuFilter from "../components/MenuFilter";
import Footer from "../components/Footer";
import { MenuBannerData } from "../data/Menudata";

function Menu({ addToCart, add_cart, plus_cart, minus_cart, totalQty , wishList,wish }) {
  return (
    <>
      <Navbar totalQty={totalQty} />
      
      <HomeBanner details={MenuBannerData} />

     <MenuFilter
        addToCart={addToCart}
        add_cart={add_cart}
        plus_cart={plus_cart}
        wish={wish}
        wishList={wishList}
        minus_cart={minus_cart}
      />

      <Footer />
    </>
  );
}

export default Menu;