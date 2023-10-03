import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

async function loginUser(credentials) {
    return axios.post('https://skiza-app-dy3qp.ondigitalocean.app/public/token', credentials)
        .then(response => response.data);
}

export default function Signin() {
    const classes = useStyles();
    const [email, setemail] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [Confirmapassword, setconfirmPassword] = useState();
    const navigate = useNavigate();
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const response = await loginUser({
    //         username,
    //         password
    //     });
    //     if ('token' in response) {
    //         swal("Success", "You have Loggged In", "success", {
    //             buttons: false,
    //             timer: 2000,
    //         })
    //             .then((value) => {
    //                 localStorage.setItem('token', response['token']);
    //                 localStorage.setItem('user', JSON.stringify(response['user']));
    //                 window.location.href = "/skizatunes";
    //             });
    //     } else {
    //         swal("Failed", response.error, "error");
    //     }
    // }


  

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // You can perform any form validation here if needed
        setFormSubmitted(true);
    };




    const handleButtonClick = (e) => {
        e.preventDefault();
        // Set isSubmitting to true when the button is clicked
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
        }, 150);

    };

    const[proceedLogin,setProceedLogin]=useState(false)

    useEffect(() => {
        if (formSubmitted) {
            let data = JSON.stringify({
                "email": email,
                "name": username,
                "password": password,
                "passwordConfirm": Confirmapassword
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://plankton-app-c2rii.ondigitalocean.app/api/skiza/user/register',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': '__cf_bm=9EDL1IS7R0Rj.kOo.E7W_bpAcAWDsa5l1Joj.9C9sQ4-1696197272-0-AYawdcv8XfiizSkdZLfI1ETW24FkFqjGqzsnecATHCqiXPG+/ydaOfjikoIxjUOZvQkYGf+CKXeHWJKH0DGgp+U='
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                  
                    if (response.status == 201) {
                        console.log("Register response Form", response)
                       
                        window.location.href = "/";
                        swal.fire(
                            'Good job!',
                            'You clicked the button!',
                            'success'
                        )
                        // navigate('/skizatunes');
                        // <Link to="/home" style={{ textDecoration: "none" }}/>
                           
                    }
                    // window.location.href = "/skizatunes";
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [formSubmitted]);
    
    

    return (
        <Grid container className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} md={7} className={classes.image} />
            <Grid item xs={12} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register Account
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            onChange={e => setemail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            onChange={e => setUserName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Confirm Password"
                            type="password"
                            onChange={e => setconfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleButtonClick}
                        >
                            Register
                        </Button>
                        <div style={{ display: 'flex'}}>
                            <div style={{ display: 'flex' }}>
                                Already have an Account,
                                <div style={{ display: 'flex',marginLeft:2 }}><Link to="/" style={{ textDecoration: "none" }}>
                                  Proceed to Login

                                </Link></div>
                            </div></div>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}