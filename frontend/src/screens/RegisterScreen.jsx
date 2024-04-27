import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useRegisterMutation, useSocialRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from "react-toastify";
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const RegisterScreen = () => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const [socialRegister] = useSocialRegisterMutation();

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
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
        } else {
            try{
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res, }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const responseFacebook = async (response) => {
        const name = response.name;
        const email = response.email;
        const socialLoginString = 'facebook';

        try{
            const res = await socialRegister({name, email, socialLoginString}).unwrap();
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    
    const responseGoogle = async (response) => {
        const name = jwtDecode(response.credential).name;
        const email = jwtDecode(response.credential).email;
        const socialLoginString = 'google';

        try{
            const res = await socialRegister({name, email, socialLoginString}).unwrap();
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    };


    const errorMessage = (error) => {
        console.log(error);
    };

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

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

            <Form.Group controlId='confirmPassword' className='my-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                Register
            </Button>

            {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
            <Col>
                Already have an account? {' '} 
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
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
                    textButton="SIGN UP WITH FACEBOOK"
                    callback={responseFacebook} />
            </Col>
            <Col>
                <GoogleOAuthProvider clientId="1036034371799-d4225aimppm17e5njhvlqktchrhlmmup.apps.googleusercontent.com">  
                    <GoogleLogin width="100" theme="filled_blue" text="signup_with" onSuccess={responseGoogle} onError={errorMessage} />
                </GoogleOAuthProvider>
                
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterScreen