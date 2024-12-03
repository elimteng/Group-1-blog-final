import React from "react";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://getbootstrap.com/",
      iconClass: "fa-brands fa-bootstrap",
      label: "Instagram",
    },
    {
      href: "https://www.northeastern.edu/",
      iconClass: "fa fa-university",
      label: "Facebook",
    },
    {
      href: "https://github.com/lhq5520/Blog-React",
      iconClass: "fab fa-github",
      label: "GitHub",
    },
  ];

  return (
    <footer className="border-top">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Social Media Links */}
            <ul className="list-inline text-center">
              {socialLinks.map((link, index) => (
                <li className="list-inline-item" key={index}>
                  <a href={link.href} aria-label={link.label}>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className={`${link.iconClass} fa-stack-1x fa-inverse`}></i>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Copyright */}
            <div className="small text-center text-muted fst-italic">
              Copyright &copy; {new Date().getFullYear()} Bytes Odyssey Website
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
