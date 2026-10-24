import { Link } from "react-router-dom";
import { normalizeImageUrl } from "../config";

const DEFAULT_BANNER_IMAGES = {
  home_banner: "/assets/images/home_banner.png",
  menu_banner: "/assets/images/menu_banner.png",
  about_banner: "/assets/images/about_banner.jpg",
  contact_banner: "/assets/images/contact_banner.jpeg",
};

function HomeBanner({ details, bannerKey }){
  const banner = details?.content?.[bannerKey];
  const defaultFallback = DEFAULT_BANNER_IMAGES[bannerKey] || "/assets/images/home_banner.png";

  const bannerImgSrc = banner?.image
    ? normalizeImageUrl(banner.image, defaultFallback)
    : defaultFallback;

  return (
    <div className="banner_section">
      <div className="banner_img_box">
        <img
          src={bannerImgSrc}
          fetchPriority="high"
          decoding="async"
          alt="banner_Img.."
          className="banner_img"
          onLoad={(e) => {
            if (e.currentTarget.src.includes("ui-avatars.com") || (e.currentTarget.naturalWidth === 500 && e.currentTarget.naturalHeight === 500 && e.currentTarget.src.includes("Admin"))) {
              e.currentTarget.src = defaultFallback;
            }
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultFallback;
          }}
        />
      </div>
      <div className="banner_overlay">
        <div className="container">
          <div className="banner_right_box">
            <div className="heading_box">
              <span className="banner_tag">{banner?.subtitle}</span>
              <h3>
                {banner?.title1 ? (
                  <>
                    {banner?.title1} <br />
                    <span>{banner?.title2}</span><br />
                    {banner?.color_title}
                  </>
                ) : (
                  <>
                    {banner?.title1} <br />
                    {banner?.title2} <br />
                    <span>{banner?.color_title}</span>
                  </>
                )}
              </h3>
              <p>{banner?.desc}</p>
            </div>

            <div className="button_box">
              <Link to={banner?.btn_url1 || "/cart"} className="shop_btn">
                {banner?.btn_text1 || "Shop Now"}
              </Link>
              <Link to={banner?.btn_url2 || "/menu"} className="menu_btn">
                {banner?.btn_text2 || "Explore Menu"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;