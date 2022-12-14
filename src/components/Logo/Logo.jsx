import styles from "../../assets/styles/Styles.module.css";

import LogoImage from "../../assets/imgs/logo.png";

const Logo = (props) => {
  
  return (
    <img 
      src={LogoImage}
      alt="Logo"
      className={props.large ? styles.largeLogo : styles.logo} 
    />
  )
};

export default Logo;