import React, { Fragment } from "react";
import "./AboutSection.css";
import MetaData from '../MetaData';
import { Button, Typography, Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/punitp_2.793";
  };
  return (
    <Fragment>
    < MetaData title='About Page'/>
    <div className="aboutSection">
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div  className="aboutContent">
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media.licdn.com/dms/image/D4D03AQF7CRplrsM-Lg/profile-displayphoto-shrink_400_400/0/1715580540388?e=1723680000&v=beta&t=tpFAaKDXHaYg6p4Wqb3B6tWyHo0P6ThmF2AsnYlV3lk"
              alt="Founder"
            />
            <Typography>Punit Prajapati</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            I am a dedicated Computer Engineering student at L.D. College of Engineering, specializing in software development and web technologies. With expertise in programming and experience in both front-end and back-end development, I excel at solving complex problems and creating innovative solutions.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Social Media</Typography>
            <a
              href="https://x.com/Punit2709"
              target="blank"
            >
              <TwitterIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/punitp_2.793" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default About;