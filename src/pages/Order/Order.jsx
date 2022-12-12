import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Alert, 
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Dialog, 
  DialogTitle, 
  Grid, 
  List, 
  ListItem,
  TextField,
  Typography 
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { useStyles } from "../../assets/styles/styles";

import { Store } from "../../context/OrderInfo";
import { 
  listCategories, 
  listProducts, 
  addToOrder,
  removeFromOrder,
  clearOrder 
} from "../../utils/actions";

import Logo from "../../components/Logo/Logo";

const Order = () => {
  const styles = useStyles();

  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const {
    products,
    loading: loadingProducts,
    error: errorProducts
  } = state.productList;
  const {
    orderItems,
    itemsCount,
    totalPrice,
    taxPrice,
    orderType
  } = state.order;

  const [ categoryName, setCategoryName ] = useState("");
  const [ quantity, setQuantity ] = useState(1);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ product, setProduct ] = useState({});

  useEffect(() => {
    if(!categories) listCategories(dispatch);
    else listProducts(dispatch, categoryName);
  }, [dispatch, categories, categoryName]);

  function categoryClickHandler(name) {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  }

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

  function previewOrderHandler() {
    navigate("/review");
  }

  return(
    <Box className={styles.root}>
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
      <Box className={styles.main}>
        <Grid container>
          <Grid item md={2}>
            <List>
              { loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) :
              (
                <>
                  <ListItem 
                    button
                    onClick={() => categoryClickHandler("")}
                  >
                    <Logo />
                  </ListItem>
                  {categories.map((category) => (
                    <ListItem 
                      button 
                      key={category.name}
                      onClick={() => categoryClickHandler(category.name)}
                    >
                      <Avatar alt={category.name} src={category.image} />
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            <Typography
              gutterBottom
              className={styles.title}
              variant="h2"
              component="h2"
            >
              {categoryName || "Menu"}
            </Typography>
            <Grid container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products.map((product) => (
                  <Grid item md={6} key={product.name}>
                    <Card 
                      className={styles.card}
                      onClick={() => productClickHandler(product)}
                    >
                      <CardActionArea className={styles.center}>
                        <CardMedia 
                          component="img"
                          alt={product.name}
                          image={product.image}
                          className={styles.media}
                        />
                      </CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textPrimary"
                          component="p"
                        >
                          {product.name}
                        </Typography>
                        <Box className={styles.cardFooter}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {product.calorie} Cal
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                            component="p"
                          >
                            R$ {product.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
              ))
              )}
            </Grid>
          </Grid>
        </Grid> 
      </Box>
      <Box className={styles.fixed}>
        <Box className={[styles.bordered, styles.space]}>
          Meu pedido - {orderType} | Taxa: R${taxPrice > 0 ? taxPrice.toFixed(2) : taxPrice} | Total: R${totalPrice > 0 ? totalPrice.toFixed(2) : totalPrice} | Items: {itemsCount}
        </Box>
        <Box className={[styles.row, styles.around]}>
          <Button
            onClick={() => {
              clearOrder(dispatch);
              navigate("/");
            }}
            variant="contained"
            color="primary"
            className={styles.largeButton}
          >
            Cancelar pedido
          </Button>
          <Button
            onClick={previewOrderHandler}
            variant="contained"
            color="secondary"
            disabled={orderItems.length === 0}
            className={styles.largeButton}
          >
            Finalizar pedido
          </Button>
        </Box>
      </Box>
    </Box>
  )
};

export default Order;