import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";

const About = () => {
  const visitPortfolio = () => {
    window.location = "https://arsalans-portfolio.netlify.app/";
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "11vmax", margin: "0.5vmax 0" }}
              src="https://res.cloudinary.com/dvnlehz6m/image/upload/v1668322135/My%20Upload/Arsalan_x5ma9m.jpg"
              alt="Founder"
            />

            <div>
              <Typography component="h1">Hi, I'm Arsalan</Typography>
              <span>
                Web Developer from Karachi, Pakistan. I create custom websites
                to help businesses do better online.
              </span>
            </div>
            <Button onClick={visitPortfolio}>
              Visit Portfolio <KeyboardArrowRightIcon />
            </Button>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h6">Follow Us</Typography>
            <a href="https://www.facebook.com/arsalan.azmi.9" target="blank">
              <FacebookOutlinedIcon className="facebookSvgIcon" />
            </a>

            <a href="https://github.com/arsalanazmi" target="blank">
              <GitHubIcon className="githubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
