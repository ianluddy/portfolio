import React from "react";

const SocialShare = [
  {
    iconName: "gmail",
    link: "mailto:ianluddy@gmail.com",
  },
  { 
    iconName: "github", 
    link: "https://github.com/ianluddy" 
  },
  {
    iconName: "google",
    link: "mailto:ianluddy@gmail.com",
  },
  { 
    iconName: "linkedin", 
    link: "https://ie.linkedin.com/in/ianluddy"
  },
];
const Social = () => {
  return (
    <>
      <ul className="social">
        {SocialShare.map((val, i) => (
          <li key={i}>
            <a href={`${val.link}`} target="_blank" rel="noreferrer">
              <img
                className="svg"
                src={`/assets/img/svg/social/${val.iconName}.svg`}
                alt="social"
              ></img>
            </a>
          </li>
        ))}
      </ul>
      {/* END SOCIAL */}
    </>
  );
};

export default Social;
