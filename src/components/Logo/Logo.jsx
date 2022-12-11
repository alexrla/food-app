import { useStyles } from "../../assets/styles/styles";

import LogoImage from "../../assets/imgs/logo.png";

const Logo = (props) => {
  const styles = useStyles();
  
  return (
    <img 
      src={LogoImage}
      alt="Logo"
      className={props.large ? styles.largeLogo : styles.logo} 
    />
  )
};

export default Logo;