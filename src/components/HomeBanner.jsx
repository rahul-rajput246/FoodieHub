import { Link } from "react-router-dom";
function HomeBanner({ details }){
    return(
      <div className="banner_section">
        <div className="banner_img_box">
          <img src={details.image} alt="banner_Img.." className="banner_img" />
        </div>
        <div className="banner_overlay">
          <div className="container">
            <div className="banner_right_box">
              <div className="heading_box">
                <span className="banner_tag">{details.subtitle}</span>
                <h3>
                  
                  {details.title ? (
                  <>
                    {details.title} <br />
                    <span>{details.titleSecond}</span>
                    {details.titleThird}
                  </>
                ) : (
                  <>
                    {details.titleFirst} <br />
                    {details.titleSecond} <br />
                    <span>{details.titleThird}</span>
                  </>
                )}
                </h3>
                <p>{details.description}</p>
              </div>

              <div className="button_box">
                <Link to={details.btn1Link} className="shop_btn">
                  {details.btn1Text}
                </Link>
                <Link to={details.btn2Link} className="menu_btn">
                  {details.btn2Text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HomeBanner;