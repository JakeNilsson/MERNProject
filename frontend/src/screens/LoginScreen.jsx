import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useLoginMutation, useSocialLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from "react-toastify";
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const LoginScreen = () => {
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Login, { isLoading }] = useLoginMutation();
    const [SocialLogin] = useSocialLoginMutation(); //doesn't use isLoading, will this be a problem later?

    const {userInfo} = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        try{
            const res = await Login({email, password}).unwrap();
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const responseFacebook = async (response) => {
        const email = response.email;

        try{
            const res = await SocialLogin({email}).unwrap();
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

      const responseGoogle = async (response) => {
        const email = jwtDecode(response.credential).email;

        try{
            const res = await SocialLogin({email}).unwrap();
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const errorMessage = (error) => {
        console.log(error);
    };

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                Sign In
            </Button>

            {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? {' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
                . Or:
            </Col>
        </Row>

        <Row className='d-flex justify-content-between'>
            <Col>
                <FacebookLogin
                    size='small'
                    appId="1566878197190181"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook} />
            </Col>
            <Col>
            <GoogleOAuthProvider clientId="1036034371799-d4225aimppm17e5njhvlqktchrhlmmup.apps.googleusercontent.com">  
                    <GoogleLogin width="100" size="large" text="signin_with" theme="filled_blue" onSuccess={responseGoogle} onError={errorMessage} />
                </GoogleOAuthProvider>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen