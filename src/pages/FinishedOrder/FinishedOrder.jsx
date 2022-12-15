import { 
  Alert, 
  Box, 
  Button, 
  CircularProgress, 
  Typography 
} from "@mui/material";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../assets/styles/Styles.module.css";

import Logo from "../../components/Logo/Logo";

import { Store } from "../../context/OrderInfo";
import { createOrder } from "../../utils/actions";

const FinishedOrder = () => {

  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);

  const { order } = state;
  
  const { loading, error, newOrder } = state.orderCreate;

  useEffect(() => {
    if(order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  }, [order, dispatch]);

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Logo large />
          { loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Typography
                gutterBottom
                className={styles.pt}
                variant="h3"
                component="p"
              >
                Seu pedido foi feito
              </Typography>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="h3"
              >
                Obrigado!
              </Typography>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="p"
              >
                Número do pedido: {newOrder.number}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
      <Button
          onClick={() => navigate("/admin")}
          variant="contained"
          // color="secondary"
          className={[styles.xLargeButton, styles.otherColor]}
        >
          Ver pedidos já realizados!
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          color="secondary"
          className={styles.xLargeButton}
        >
          Realizar novo pedido!
        </Button>
      </Box>
    </Box>
  )
}

export default FinishedOrder;