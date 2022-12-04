import { useStyles } from "../../assets/styles/styles";

import LogoImage from "../../assets/imgs/logo.png";

const Logo = () => {
  const styles = useStyles();
  
  return (
    <img 
      src={LogoImage} 
      alt="Logo"
      className={styles.largeLogo} 
    />
  )
};

export default Logo;