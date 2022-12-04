import { Box, Card, CardActionArea, Typography  } from "@mui/material"
import { TouchApp } from "@mui/icons-material"

import Logo from "../../components/Logo/Logo";

import { useStyles } from "../../assets/styles/styles";

const Home = () => {
  const styles = useStyles();

  return (
    <Card>
      <CardActionArea>
        <Box className={[styles.root, styles.red]}>
          <Box className={[styles.main, styles.center]}>
            <Typography component="h6" variant="h6">
              Rápido e Fácil
            </Typography>
            <Typography component="h1" variant="h1">
              Peça <br /> & Pague <br /> Aqui
            </Typography>
            <TouchApp fontSize="large"></TouchApp>
          </Box>
          <Box className={[styles.center, styles.green]}>
            <Logo large></Logo>
            <Typography component="h5" variant="h5">
              Clique aqui
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
};

export default Home