import styled from "styled-components";

import Donate_Illus from "src/assets/images/Donate_Illus.png";

export const NavBarListContentWrapper = styled.div`
  ul.navbar-nav li .a-class {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: right;
    color: #eff3f4;
    opacity: 0.8;
    padding-left: 3px;
    padding-right: 3px;
    margin-left: 10px;
    margin-right: 10px;

    @media only screen and (max-width: 1600px) {
     margin-left: 7px;
     margin-right: 7px;
    }

    @media only screen and (max-width: 1366px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 16px;
    }
  }
  ul.nav.navbar-nav li:nth-last-child(2) a {
    font-weight: 600;

    @media(max-width:767px){
      font-weight: normal;
    }
  }
  .navbar-nav > .active > .a-class {
    color: #eff3f4;
    background-color: transparent;
    opacity: 1;
    font-weight: 600;
  }
  .navbar-nav > .active > .a-class:hover,
  .navbar-nav > .active > .a-class:focus,
  ul.navbar-nav li .a-class:hover,
  ul.navbar-nav li .a-class:focus {
    color: #eff3f4;
    background-color: transparent;
    opacity: 1;
  }

  .navbar-nav > .active .a-class{
    position: relative;
  }

  // .navbar-nav > .active .a-class:after {
  //   content: '';
  //   width: 100%;
  //   position: absolute;
  //   height: 1px;
  //   background-color: #fff;
  //   left: 0;
  //   bottom: 5px;
  // }

  ul.navbar-nav li.donate-button {
    height: 60px;
    width: 60px;
    background: #fff;
    border-radius: 50%;
    padding: 2px;
    margin-right: 125px;
    margin-left:30px;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      right: -140px;
      top: -47px;
      background: url(${Donate_Illus.src});
      background-size: 120px auto;
      background-repeat: no-repeat;
      height: 120px;
      width: 120px;
      @media only screen and (max-width: 1024px) {
        display:none;
      }
    }
  }

  ul.navbar-nav li.donate-button a {
    font-size: 13px;
    line-height:24px;
    padding: 14px 2px;
    background: #ffffff;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 2px solid #0099ba;
    color: #104573;
    font-family: "Source Sans Pro", sans-serif;
    font-weight:bold;
    text-align: center;



  }
  .search-box {
    position: relative;

    > img{
      cursor: pointer;
    }
  }

  .search-box input[type="search"] {
    width: 340px;
    height: 48px;
    margin: 6px;
    padding: 0px 35px 0 15px;
    border-radius: 24px;
    border: 0px;
    background: #b2c3d226;
    outline: none;
    color: #eff3f4;
    transition: all 0.5s;
    font-size: 20px;

    @media(max-width: 1800px){
      width: 280px;
    }

    @media(max-width: 1700px){
      width: 245px;
    }

    @media(max-width: 1600px){
      width: 220px;
    }

    @media(max-width: 1450px){
      width: 245px;
    }

    @media(max-width: 1380px){
      width: 220px;
    }

    @media(max-width: 1280px){
      width: 170px;
    }
  }

  .search-box input:focus {
    outline: none;
    border: solid 1px rgba(239, 243, 244, 1);
  }

  .search-box img{
    position: absolute;

    width: 21px;
    right: 18px;
    top: 18px;
    font-size: 24px;
    color: rgba(239, 243, 244, 1);
  }
  @media only screen and (max-width: 768px) {
    li {
      .donate-button {
        display: none;
      }
    }
  }
`;
