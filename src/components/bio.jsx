import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { SocialIcon } from "react-social-icons";

const Bio = () => {
  const [avatarSize, setAvatarSize] = useState(77);
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 420) {
        if (avatarSize !== 150) setAvatarSize(150);
      } else {
        if (avatarSize !== 77) setAvatarSize(77);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const { author, social } = data.site.siteMetadata;
  return (
    <div className="bio">
      <Image
        className="bio-avatar"
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginBottom: 0,
          minWidth: avatarSize,
          height: avatarSize,
          borderRadius: `100%`,
        }}
      />
      <div className="bio-content">
        <div>
          <h1>Likia Sun</h1>
          <div className="bio-social-bar">
            <SocialIcon
              className="bio-social-item"
              fgColor="#ffffff"
              url={`https://twitter.com/${social.twitter}`}
            />
          </div>
        </div>
        <strong className="bio-introduce">Full Stack Developer</strong>
        <p>
          <strong>Major language</strong>: Nodejs, Python
        </p>
        <p>Studying Rust, Oath2 and Music</p>
        <p>Also learning psychology, political science and Math</p>
      </div>
    </div>
  );
};

export default Bio;
