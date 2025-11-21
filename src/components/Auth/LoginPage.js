import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'normal',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
        }
    };

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setVerificationId(confirmationResult);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await verificationId.confirm(otp);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Family Tree Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Tabs defaultActiveKey="email" id="login-tabs" className="mb-3">
                                <Tab eventKey="email" title="Email">
                                    <Form onSubmit={handleEmailAuth}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100">
                                            {isSignUp ? 'Sign Up' : 'Login'}
                                        </Button>
                                    </Form>
                                    <div className="text-center mt-3">
                                        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
                                            {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
                                        </Button>
                                    </div>
                                </Tab>

                                <Tab eventKey="phone" title="Phone">
                                    {!verificationId ? (
                                        <Form onSubmit={handlePhoneSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="+1 234 567 8900"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Include country code (e.g., +1)
                                                </Form.Text>
                                            </Form.Group>
                                            <div id="recaptcha-container" className="mb-3"></div>
                                            <Button variant="primary" type="submit" className="w-100">
                                                Send OTP
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Form onSubmit={handleOtpSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Enter OTP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="123456"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="w-100">
                                                Verify OTP
                                            </Button>
                                        </Form>
                                    )}
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
