import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


const useStyles = makeStyles()(() => {
    return {
        container: {
            width: 400,
            padding: 25,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            backgroundColor: "#1D0046", /* blue */
        },
        profile: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            height: "92%",
        },
        logout: {
            height: "8%",
            width: "100%",
            backgroundColor: "#388E3C",
            marginTop: 20,
        },
        picture: {
            width: 200,
            height: 200,
            cursor: "pointer",
            backgroundColor: "#388E3C", /* green */
            objectFit: "contain",
        },
        watchlist: {
            flex: 1,
            width: "100%",
            borderRadius: 10,
            padding: 15,
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            overflowY: "scroll",
            backgroundColor: "#160036", /* darker blue */
        },
        coin: {
            padding: 10,
            borderRadius: 5,
            color: "black",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#EEBC1D",
            boxShadow: "0 0 3px black",
        },

    };
});



export default function UserSidebar() {

    const { classes } = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const { user,setAlert } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
          open: true,
          type: "success",
          message: "Logout Successfull !",
        });
    
        toggleDrawer();
    };



    return (
        <div >
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            marginLeft: 15,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        
                    >
                        <div className={classes.container} >
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>

                                <div className={classes.watchlist} >
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}