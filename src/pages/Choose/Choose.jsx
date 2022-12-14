import { 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Fade, 
  Typography 
} from "@mui/material";
import Logo from "../../components/Logo/Logo";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../assets/styles/Styles.module.css";

import { Store } from "../../context/OrderInfo";

import { setOrderType } from "../../utils/actions";

// Imagens
import Eating from "../../assets/imgs/eatin.png";
import Takeout from "../../assets/imgs/takeout.png";


const Choose = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);


  function chooseHandler(orderType) {
    setOrderType(dispatch, orderType);
    navigate("/order");
  }

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]}>
        <Box className={[styles.main, styles.center, styles.space]}>
          <Logo large />
          <Typography
            variant="h3"
            component="h3"
            className={styles.center}
            gutterBottom
          >
            É para comer aqui ou para levar?
          </Typography>
          <Box className={styles.cards}>
            <Card className={[styles.cardOption, styles.space]}>
              <CardActionArea 
                className={[styles.center, styles.centerColumn]}
                onClick={() => chooseHandler("Comer aqui")}
              >
                <CardMedia
                  component="img"
                  alt="Comer aqui"
                  image={Eating}
                  className={styles.media}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textPrimary"
                    component="p"
                  >
                    Comer aqui!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={[styles.cardOption, styles.space]}>
              <CardActionArea 
                className={[styles.center, styles.centerColumn]}
                onClick={() => chooseHandler("Levar para casa")}
              >
                <CardMedia
                  component="img"
                  alt="Levar para casa"
                  image={Takeout}
                  className={styles.media}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textPrimary"
                    component="p"
                  >
                    Levar para casa!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
};

export default Choose;
