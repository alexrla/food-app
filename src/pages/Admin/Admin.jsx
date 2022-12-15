import { 
  Alert, 
  Box, 
  Button, 
  CircularProgress, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow
} from "@mui/material";

import axios from "axios";

import { useEffect, useContext } from "react";

import styles from "../../assets/styles/Styles.module.css";

import { Store } from "../../context/OrderInfo";

import { listOrders } from "../../utils/actions";

const Admin = () => {
  const { state, dispatch } = useContext(Store);

  const { orders, loading, error } = state.orderList;

  useEffect(() => {
    listOrders(dispatch);
  }, [dispatch]);

  async function setOrderStateHandler(order, action) {
    try {
      await axios.put(`http://localhost:5000/orders/${order._id}`, {
        action: action
      });

      listOrders(dispatch);
    } catch (error) {
      alert(error.message);
    }
  } 

  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main]}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} arial-label="Orders">
              <TableHead>
                <TableRow className={styles.row}>
                  <TableCell align="center">Número do Pedido</TableCell>
                  <TableCell align="center">Preço: R$</TableCell>
                  <TableCell align="center">Quantidade</TableCell>
                  <TableCell align="center">Itens</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Pagamento</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index} className={styles.row}>
                    <TableCell component="th" scope="row" align="center">{order.number}</TableCell>
                    <TableCell align="center">{order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell align="center">{order.orderItems.length}</TableCell>
                    <TableCell align="center">
                      {
                        order.orderItems.map((item) => (
                          <Box key={item.name}>
                            {item.name} x {item.quantity}
                          </Box>
                        ))
                      }
                    </TableCell>
                    <TableCell align="center">{order.orderType}</TableCell>
                    <TableCell align="center">{order.paymentType}</TableCell>
                    <TableCell align="center">
                      {
                        order.inProgress
                        ? "Fazendo"
                        : order.isReady
                        ? "Feito"
                        : order.isDelivered
                        ? "Entregue"
                        : "Desconhecido"
                      }
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, "feito")}
                        color="terciary"
                        className={styles.gap}
                      >
                        Feito
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, "cancelar")}
                        color="primary"
                        className={styles.gap}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, "entregue")}
                        color="secondary"
                      >
                        Entregue
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  )
};

export default Admin;
