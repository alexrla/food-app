import {
  Box, 
  Button, 
  Card, 
  CardActionArea, 
  CardContent, 
  Dialog, 
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useStyles } from "../../assets/styles/styles";
import Logo from "../../components/Logo/Logo";

import { Store } from "../../context/OrderInfo";
import { 
  addToOrder,
  removeFromOrder,
} from "../../utils/actions";

const Review = () => {
  const styles = useStyles();

  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);

  const {
    orderItems,
    itemsCount,
    totalPrice,
    taxPrice,
    orderType
  } = state.order;

  const [ quantity, setQuantity ] = useState(1);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ product, setProduct ] = useState({});

  function closeHandler() {
    setIsOpen(false);
  }

  function productClickHandler(p) {
    setProduct(p);
    setIsOpen(true);
  }

  function addToOrderHandler() {
    addToOrder(dispatch, {...product, quantity });
    setIsOpen(false);
  }

  function cancelOrRemoveFromOrder() {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  }

  function procedToCheckoutHandler() {
    // procedToCheckout(dispatch);
    navigate("/select-payment");
  }
  
  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.navy, styles.center]}>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={isOpen}
          onClose={closeHandler}
        >
          <DialogTitle className={styles.center}>
            Adicionar {product.name}
          </DialogTitle>
          <Box className={[styles.row, styles.center]}>
            <Button
              variant="contained"
              color="primary"
              disabled={quantity === 1}
              onClick={(event) => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveCircle />
            </Button>
            <TextField
              inputProps={{ className: styles.largeInput }}
              InputProps={{
                bar: true,
                inputProps: {
                  className: styles.largeInput
                }
              }}
              className={styles.largeNumber}
              type="number"
              variant="filled"
              min={1}
              value={quantity}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => setQuantity(quantity + 1)}
            >
              <AddCircle />
            </Button>
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              color="primary"
              size="large"
              className={styles.btn}
            >
              {orderItems.find((x) => x.name === product.name)
                ? "Remover"
                : "Cancelar"
              }
            </Button>
            <Button
              onClick={addToOrderHandler}
              variant="contained"
              color="primary"
              size="large"
              className={styles.btn}
            >
              Adicionar
            </Button>
          </Box>
        </Dialog>
        <Box className={[styles.center, styles.column, styles.space]}>
          <Logo large />
          <Typography 
            gutterBottom 
            className={styles.title} 
            variant="h3"
            component="h3"
          >
            Revise seu pedido
          </Typography>
        </Box>
        <Grid container className={styles.margin}>
          {orderItems.map((orderItem) => (
            <Grid item md={12} key={orderItem.name}>
              <Card 
                className={styles.card}
                onClick={() => productClickHandler(orderItem)}
              >
                <CardActionArea>
                  <CardContent>
                    <Box className={[styles.row, styles.between]}>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {orderItem.name}
                      </Typography>
                      <Button variant="contained" color="secondary">Editar</Button>
                    </Box>
                    <Box className={[styles.row, styles.between]}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {orderItem.calorie} kcal
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {orderItem.quantity} x R$ {orderItem.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Box className={[styles.fixed, styles.otherColor]}>
          <Box className={[styles.bordered, styles.borderColor, styles.space]}>
            Meu pedido - {orderType === "Levar para casa" ? "Levar para casa" : "Comer aqui"} | Taxa: R${taxPrice.toFixed(2)} | Total: R${totalPrice.toFixed(2)} | Itens: {itemsCount}
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={() => {
                navigate("/order");
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Voltar
            </Button>
            <Button
              onClick={procedToCheckoutHandler}
              variant="contained"
              color="secondary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              Confirmar Pedido
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default Review;
