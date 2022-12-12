import { useEffect, useContext, useState } from "react";
import { 
  Alert, 
  Avatar, 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Grid, 
  List, 
  ListItem,
  Typography 
} from "@mui/material";
import { useStyles } from "../../assets/styles/styles";

import { Store } from "../../context/OrderInfo";
import { listCategories, listProducts } from "../../utils/actions";

import Logo from "../../components/Logo/Logo";

const Order = () => {
  const styles = useStyles();

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const {
    products,
    loading: loadingProducts,
    error: errorProducts
  } = state.productList;

  const [ categoryName, setCategoryName ] = useState("");

  useEffect(() => {
    if(!categories) listCategories(dispatch);
    else listProducts(dispatch, categoryName);
  }, [dispatch, categories, categoryName]);

  function categoryClickHandler(name) {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  }

  return(
    <Box className={styles.root}>
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
    </Box>
  )
};

export default Order;