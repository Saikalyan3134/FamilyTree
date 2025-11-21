import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Layout/Header';

const FamilyTreeContainer = () => {
    return (
        <>
            <Header />
            <Container fluid className="p-0" style={{ height: 'calc(100vh - 56px)', overflow: 'hidden' }}>
                <div className="d-flex justify-content-center align-items-center h-100 bg-light">
                    <h3>Family Tree Visualization (Coming Soon)</h3>
                </div>
            </Container>
        </>
    );
};

export default FamilyTreeContainer;
