
import { useEffect, useContext } from "react";
import { 
  Alert, 
  Avatar, 
  Box, 
  CircularProgress, 
  Grid, 
  List, 
  ListItem 
} from "@mui/material";
import { useStyles } from "../../assets/styles/styles";

import { Store } from "../../context/OrderInfo";
import { listCategories } from "../../utils/actions";

import Logo from "../../components/Logo/Logo";

const Order = () => {
  const styles = useStyles();

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;

  if(categories) {
    console.log(categories);
  }

  useEffect(() => {
    listCategories(dispatch);
  }, [dispatch]);

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
                  <ListItem button>
                    <Logo />
                  </ListItem>
                  {categories.map((category) => (
                    <ListItem button key={category.name}>
                      <Avatar alt={category.name} src={category.image} />
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            Opções do menu
          </Grid>
        </Grid> 
      </Box>
    </Box>
  )
};

export default Order;