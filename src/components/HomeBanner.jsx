import { Link } from "react-router-dom";
import { normalizeImageUrl } from "../config";

function HomeBanner({ details, bannerKey}){

  const banner = details?.content?.[bannerKey];
  const bannerImgSrc = normalizeImageUrl(
    banner?.image,
    "/assets/images/home_banner.png"
  );

    return(
      <div className="banner_section">
        <div className="banner_img_box">
          <img
            src={bannerImgSrc}
            fetchPriority="high"
            decoding="async"
            alt="banner_Img.."
            className="banner_img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/images/home_banner.png";
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