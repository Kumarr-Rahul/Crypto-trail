import { Container, Paper, Typography } from '@mui/material';
import { padding } from '@mui/system';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import Carousel from './Carousel';

const useStyles = makeStyles()(() => {
    return {
        bannerContent: {
            height: 450,
            display: "flex",
            flexDirection: "column",
            paddingTop: 30,
            justifyContent: "space-around",
        },
        tagline: {
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        }
    };
});

const Banner = () => {
    const { classes } = useStyles();

    return (
        <div>
            <Container>
                <Paper sx={{ backgroundColor: "#25004E"}} elevation={24} className={classes.bannerContent} >

                    <div className={classes.tagline}>
                        <Typography
                            variant="h2"
                            style={{
                                fontWeight: "bold",
                                marginBottom: 15,
                                fontFamily: "Montserrat",
                                color: "White"
                            }}
                        >
                            Crypto Trail
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            style={{
                                color: "#FF5722",
                                textTransform: "capitalize",
                                fontFamily: "Montserrat",
                            }}
                        >
                            Your final destination for Cryptocurrency Information
                        </Typography>
                    </div>

                    <Carousel />
                </Paper>
            </Container>
        </div>
    )
}

export default Banner