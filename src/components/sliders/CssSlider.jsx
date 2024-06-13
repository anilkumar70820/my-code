import React from "react";
import chola_logo from "../../assets/images/svg/chola-logo.svg";
import business_insider from "../../assets/images/svg/business-insider.svg";
import firenation_logo from "../../assets/images/svg/firenation-logo.svg";
import pr_week_logo from "../../assets/images/svg/pr-week-logo.svg";
import yahoo_logo from "../../assets/images/svg/yahoo-logo.svg";
import forbes_logo from "../../assets/images/svg/forbes-logo.svg";
import credit_suisse_logo from "../../assets/images/svg/credit-suisse-logo.svg";
const CssSlider = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="overflow-hidden">
          <div className="css_slider_animation d-flex align-items-center gap-4">
            <a
              className="logo_hover logo_radius"
              href="https://www.cholamandalam.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={chola_logo} alt="chola-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.businessinsider.in/"
              target="_blank"
            >
              <img
                className="logo_sizes"
                src={business_insider}
                alt="business-insider"
              />
            </a>
            <a className="logo_hover logo_radius" href="#">
              <img
                className="logo_sizes"
                src={firenation_logo}
                alt="firenation-logo"
              />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.prweek.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={pr_week_logo} alt="pr-week-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://finance.yahoo.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={yahoo_logo} alt="yahoo-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.forbes.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={forbes_logo} alt="forbes-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.credit-suisse.com/"
              target="_blank"
            >
              <img
                className="logo_sizes"
                src={credit_suisse_logo}
                alt="credit-suisse-logo"
              />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.cholamandalam.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={chola_logo} alt="chola-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.businessinsider.in/"
              target="_blank"
            >
              <img
                className="logo_sizes"
                src={business_insider}
                alt="business-insider"
              />
            </a>
            <a className="logo_hover logo_radius" href="#">
              <img
                className="logo_sizes"
                src={firenation_logo}
                alt="firenation-logo"
              />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.prweek.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={pr_week_logo} alt="pr-week-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://finance.yahoo.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={yahoo_logo} alt="yahoo-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.forbes.com/"
              target="_blank"
            >
              <img className="logo_sizes" src={forbes_logo} alt="forbes-logo" />
            </a>
            <a
              className="logo_hover logo_radius"
              href="https://www.credit-suisse.com/"
              target="_blank"
            >
              <img
                className="logo_sizes"
                src={credit_suisse_logo}
                alt="credit-suisse-logo"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CssSlider;
