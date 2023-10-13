import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {PathEnum} from "../../../type/enum/path/PathEnum";
import { registerViewModel } from '../../../viewModel/auth/RegisterViewModel';
import axios from 'axios';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

let stompClient: any;

export default function SignUpView() {

    const connectWebSocket = () => {
        console.log("start websocket");
        const socket = new SockJS('http://localhost:8080/ws');
        console.log("start websocket2");
        stompClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000
        });
    
        stompClient.onConnect = (frame: any) => {
          console.log('Connected: ' + frame);
          
          // Subscribe to the public topic
          stompClient.subscribe('/topic/public', (message: any) => {
            console.log(JSON.parse(message.body));
          });

          
          const chatMessage = {
            sender: "user",
            content: "Hello from User1",
            type: "CHAT"      // Or whatever type is appropriate for addUser
            // ...any other necessary fields...
          };
        
          // Send a message to the server to add user
          stompClient.publish({
            destination: '/app/chat.addUser',
            body: JSON.stringify(chatMessage)
          });
          // Send a message to the server
          stompClient.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify({ content: 'Hello, world!' }) });
        };
    
        stompClient.activate();
    }



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(12)
        const formData = new FormData(event.currentTarget);
        registerViewModel({
            firstname: formData.get("firstName") as string,
            lastname: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string
        });
    };

    const handleClick = async () => {
        console.log(123)
        console.log(await axios.get("http://localhost:8080/api/v1/demo-controller", {headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`
          }, withCredentials: true}))
        
      };

    const handleClick2 = async () => {
    console.log(123)
    console.log(await axios.post("http://localhost:8080/api/v1/auth/logout", {}, {
        withCredentials: true
    }))
    
    };

    const handleClick3 = async () => {
        console.log(123)
        console.log(await axios.post("http://localhost:8080/api/v1/auth/getAccessToken", {}, {
            withCredentials: true
        }))
        
    };

    const handleClick4 = async () => {
        console.log(123)
        const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {email: "123@naver.com", password:"123123123123"}, {
            withCredentials: true
        })

        console.log(response.data);
        
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={PathEnum.SIGN_IN} >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*<Copyright sx={{ mt: 5 }} />*/}
                <Button onClick={handleClick}>test</Button>
                <Button onClick={handleClick2}>logout</Button>
                <Button onClick={handleClick3}>getAccessToken</Button>
                <Button onClick={handleClick4}>authenticate</Button>
                <Button onClick={connectWebSocket}>websocket</Button>
            </Container>
        </ThemeProvider>
    );
}