import React, { useState } from "react";
import Modal from "react-modal";
import Brand from "./Brand";

Modal.setAppElement("#root");

const About = () => {
  return (
    <>
      <div className="tokyo_tm_about">
        <div className="about_image ">
          <img src="assets/img/slider/1.jpg" alt="about" />
        </div>
        {/* END ABOUT IMAGE */}
        <div className="description">
          <h3 className="name">About Me</h3>
          <div className="description_inner">
            <div className="left">
              <p>
                Hi! 👋 <br/>
                I'm a full-stack developer from Galway, Ireland.
              </p>
              <p>
                I studied Software Development at GMIT (now ATU) and was awarded a 1:1 Honours Degree in 2011.<br/>
                I also received the Student of the Year Award for achieving the highest overall grade in my class.
              </p>
              <p>
                This is where I'll be exhibiting my latest work.<br/>
                Feel free to get in touch!
              </p>
              {/* END TOKYO BUTTON */}
            </div>
            {/* END LEFT */}
            <div className="right">
              <ul>
                <li>
                  <p>
                    <span>Birthday:</span>Oct 1987
                  </p>
                </li>
                <li>
                  <p>
                    <span>Address:</span>Inchicore, Dublin, Ireland
                  </p>
                </li>
                <li>
                  <p>
                    <span>Email:</span>
                    <a href="mailto:ianluddy@gmail.com">ianluddy@gmail.com</a>
                  </p>
                </li>
                <li>
                  <p>
                    <span>Study:</span>
                    <a href="https://www.atu.ie/">ATU</a>
                  </p>
                </li>
                <li>
                  <p>
                    <span>Experience:</span>
                    {new Date().getFullYear() - 2011} years
                  </p>
                </li>
              </ul>
              {/* END UL */}
            </div>
            {/* END RIGHT */}
          </div>
          {/* END DESCRIPTION INNER */}
        </div>
      </div>
    </>
  );
};

export default About;
