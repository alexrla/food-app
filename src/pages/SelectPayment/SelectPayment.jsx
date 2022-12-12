import { 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography 
} from "@mui/material";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useStyles } from "../../assets/styles/styles";

import { Store } from "../../context/OrderInfo";

import Logo from "../../components/Logo/Logo";

import { setPaymentType } from "../../utils/actions";

// Imagens
import PayHere from "../../assets/imgs/payhere.png";
import AtCounter from "../../assets/imgs/atcounter.png";

const SelectPayment = () => {
  const styles = useStyles();

  const navigate = useNavigate();

  const { dispatch } = useContext(Store);

  function selectHandler(paymentType) {
    setPaymentType(dispatch, paymentType);
    if(paymentType === "cartao") {
      navigate("/payment");
    } else {
      navigate("/finished-order");
    }
  }

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Logo large />
        <Typography
          className={styles.center}
          gutterBottom
          variant="h3"
          component="h3"
        >
          Selecione o tipo de pagamento
        </Typography>
      </Box>
      <Box className={styles.cards}>
        <Card className={[styles.card, styles.space]}>
          <CardActionArea 
            onClick={() => selectHandler("cartao")}
            className={[styles.center, styles.centerColumn]}
          >
            <CardMedia
              component="img"
              alt="Cartão"
              image={PayHere}
              className={styles.media}
            />
            <CardContent>
              <Typography 
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="p"
              >
                Cartão
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={[styles.card, styles.space]}>
          <CardActionArea 
            onClick={() => selectHandler("dinheiro")}
            className={[styles.center, styles.centerColumn]}
          >
            <CardMedia
              component="img"
              alt="Dinheiro"
              image={AtCounter}
              className={styles.media}
            />
            <CardContent>
              <Typography 
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="p"
              >
                Dinheiro
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  )
}

export default SelectPayment;