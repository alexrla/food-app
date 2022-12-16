import {
  Alert, 
  Box,
  CircularProgress, 
  Grid,
  List,
  ListItem,
  Paper,
  Typography
} from "@mui/material";

import { useEffect, useContext } from "react";

import styles from "../../assets/styles/Styles.module.css";

import { Store } from "../../context/OrderInfo";

import { listQueue } from "../../utils/actions";

const Queue = () => {
  const { state, dispatch } = useContext(Store);

  const { queue, loading, error } = state.queueList;

  useEffect(() => {
    listQueue(dispatch);
  }, [dispatch]);

  return (
    <Box className={[styles.root]}>
      {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
              <Paper>
                <Typography variant="h1" align="center" className={[styles.space]}>
                  Fazendo
                </Typography>
                <List>
                  {queue.inProgressOrders.map((order) => (
                    <ListItem key={order.number} align="center">
                      <Typography variant="h2" className={[styles.space, styles.border]}>Pedido: nº {order.number}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Paper>
                  <Typography variant="h1" align="center" className={[styles.space]}>
                    Feito
                  </Typography>
                  <List>
                    {queue.servingOrders.map((order) => (
                      <ListItem key={order.number} align="center">
                        <Typography variant="h2" className={[styles.space, styles.border]}>Pedido: nº {order.number}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
            </Grid>
          </Grid>
        )
      }
    </Box>
  )
}

export default Queue;