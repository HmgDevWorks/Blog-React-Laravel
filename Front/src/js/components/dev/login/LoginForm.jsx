import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from "./../../../../assets/logo_pluma.svg";
import { Form, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const passHandler = (e) => {
        setPass(e.target.value);
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        console.log("HOLA");
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/categories', {
                username,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <>
            <Card className="cardForm">
                <Card.Header className="headerForm d-flex align-items-center">
                    <img src={Logo} alt="Logo" />
                    <h1 className="text-center">C -Blog</h1>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col xs={4} lg={5} className="d-flex align-items-center justify-content-center">
                                <Form.Label className="formLabel" for="name_user">Usuario:</Form.Label>
                            </Col>
                            <Col xs={8} lg={7}>
                                <Form.Control type="text" id="name_user" name= "name_user" onChange={usernameHandler}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={5} className="d-flex align-items-center justify-content-center">
                                <Form.Label className="formLabel" for="password_user">Contraseña:</Form.Label>
                            </Col>
                            <Col xs={7}>
                                <Form.Control type="password" id="password_user" name= "password_user" onChange={passHandler} />
                            </Col>
                        </Row>

                        <Row className="mb-3 d-flex justify-content-center">
                            <Col xs={5} lg={4} className="d-flex align-items-center justify-content-center">
                                <Form.Check type="checkbox" id="rememberMe" label="Recuérdame" name= "rememberMe" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="d-flex align-items-center justify-content-center">
                                <Button type="submit" className="botonForm mt-3" onClick={handleSubmit}>
                                    Enviar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
                <Card.Footer className="footerForm">
                    <Row className="mb-1">
                        <p>También puedes: <Link className="crearCuenta" onClick={handleShowModal}>Crear una cuenta nueva</Link></p>
                    </Row>
                </Card.Footer>
            </Card>
              {/* MODAL */}
            <Modal show={showModal} onHide={handleCloseModal} className="cardForm">
                <Modal.Header closeButton className="headerForm">
                    <img src={Logo} alt="Logo" />
                    <h1 className="text-center">C -Blog</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3 d-flex align-items-center">
                            <Col xs={4} lg={5} className="d-flex align-items-center">
                                <Form.Label className="formLabel" for="name_user">Usuario:</Form.Label>
                            </Col>
                            <Col xs={8} lg={7}>
                                <Form.Control type="text" id="name_user" name= "name_user" />
                            </Col>
                        </Row>

                        <Row className="mb-3 d-flex align-items-center">
                            <Col xs={4} lg={5} className="d-flex align-items-center">
                                <Form.Label className="formLabel" for="password_user">Contraseña:</Form.Label>
                            </Col>
                            <Col xs={8} lg={7}>
                                <Form.Control type="password_user" name= "password_user" />
                            </Col>
                        </Row>

                        <Row className="mb-3 d-flex align-items-center">
                            <Col xs={4} lg={5} className="d-flex align-items-center">
                                <Form.Label className="formLabel" for="password_user_confirmation">Repite Contraseña:</Form.Label>
                            </Col>
                            <Col xs={8} lg={7}>
                                <Form.Control type="password" id="password_user_confirmation" name= "password_user_confirmation" />
                            </Col>
                        </Row>

                        <Row className="mb-3 d-flex align-items-center">
                            <Col xs={4} lg={5} className="d-flex align-items-center">
                                <Form.Label className="formLabel" for="email_user">Correo electrónico:</Form.Label>
                            </Col>
                            <Col xs={8} lg={7}>
                                <Form.Control type="email" id="email_user" name= "email_user" />
                            </Col>
                        </Row>
                        
                        <Row className="mb-3 d-flex w-100">
                            <Col xs={12}>
                                <Form.Check type="checkbox" id="terms" name= "terms" label="Acepto los términos de servicio, política de privacidad y servicio de notificaciones" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={4} className="d-flex align-items-center justify-content-center w-100 mx-auto">
                              <Button type="submit" className="botonForm mt-3">
                                  Registrarse
                              </Button>   
                          </Col>
                        </Row>
                    </Form>
                </Modal.Body>
              
            </Modal>
        </>
    );
};

export default LoginForm;