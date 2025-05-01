import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image, Card  } from "react-bootstrap";
import { getOwnerProfile, updateOwnerProfile, uploadProfileImage, getProfileImage } from "../services/ownerAuthService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ownerSidebar";

const OwnerProfile = () => {
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        country: "",
        province: "",
        zip: "",
        address: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getOwnerProfile(authToken);
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [authToken]);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const imageUrl = await getProfileImage(authToken);
                console.log("The image URL: ", imageUrl);
                setProfileImage(`http://localhost:8000${imageUrl}`);
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };
        fetchProfileImage();
    }, [authToken]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOwnerProfile(authToken, profile);
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const imageUrl = await uploadProfileImage(file, authToken);
            setProfileImage(`http://localhost:8000${imageUrl}`);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <Container className="min-vh-100 d-flex flex-column  align-items-center">
            <Row className="w-100" text-center>
                <Col className="p-4 m-0"  md={3}>
                    <Sidebar />
                </Col>
                
                <Col className="p-4 m-0"  md={3}>
                    <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                        <Card.Body className="text-center">
                            {profileImage && <Image src={profileImage} alt="Profile" roundedCircle width={150} height={150} />}
                            <Form.Group>
                                <h4>{profile.firstName} {profile.lastName}</h4>
                                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                            </Form.Group>
                            <br />
                            <Button variant="primary" onClick={() => navigate("/change-password")}>Change Password</Button>
                        </Card.Body>
                    </Card>
                </Col>
            
                <Col className="pb-4" md={5} lg={5}>
                    <br />
                    <div className="p-4 shadow-sm border rounded">
                    <h2 className="p-4" style={{ textAlign:"center" }}>My Profile</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={profile.firstName} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={profile.lastName} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={profile.email} disabled />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="mobile" value={profile.mobile} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name="country" value={profile.country} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Province</Form.Label>
                            <Form.Control type="text" name="province" value={profile.province} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" name="zip" value={profile.zip} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" name="address" value={profile.address} onChange={handleChange} disabled={!editing} />
                        </Form.Group>
                        <br />
                        <div className="d-flex justify-content-center">
                        <Button variant="primary" type="button" onClick={() => setEditing(!editing)} className="me-2 text-center ">
                            {editing ? "Cancel" : "Update Profile"}
                        </Button>
                        {editing && <Button variant="success" type="submit">Save</Button>}
                        </div>
                    </Form>
                    </div>
                </Col>
            
            </Row>
        </Container>
    );
};

export default OwnerProfile;
