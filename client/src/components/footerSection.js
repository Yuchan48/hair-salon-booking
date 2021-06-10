import React from "react";
import "./footerSection.css";

function FooterSection() {
  return (
    <footer className="footer">
      <p>&copy; created by Yuchan</p>
      <div>
        <a href="https://github.com/Yuchan48" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/yuchan-iizuka/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="mailto:yuchan.iizuka@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-envelope-open footer-mail-icon"></i>
        </a>
      </div>
    </footer>
  );
}

export default FooterSection;
