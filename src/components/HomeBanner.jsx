import { Link } from "react-router-dom";
function HomeBanner({ details, bannerKey}){

  const banner = details?.content?.[bannerKey];

    return(
      <div className="banner_section">
        <div className="banner_img_box">
          <img src={`http://127.0.0.1:8000/storage/${banner?.image}`} loading="lazy" alt="banner_Img.." className="banner_img" />
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
                <Link to={banner?.btn_url1} className="shop_btn">
                  {banner?.btn_text1}
                </Link>
                <Link to={banner?.btn_url2} className="menu_btn">
                  {banner?.btn_text2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HomeBanner;