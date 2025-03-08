import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OwnerSideMenu() {
    const navigate = useNavigate();

    return (
        <>
        <div className="bg-primary bg-opacity-25 p-3" style={{ height: "100vh", minWidth: "250px" }}>
            <h4>Owner Menu</h4>
            <ListGroup>
                <ListGroup.Item
                    action
                    onClick={() => navigate('/owner/dashboard')}
                    className="custom-list-item"
                >
                    Dashboard
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    onClick={() => navigate('/owner/profile')}
                    className="custom-list-item"
                >
                    Profile
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    onClick={() => navigate('/owner/change-password')}
                    className="custom-list-item active"
                >
                    Change Password
                </ListGroup.Item>
            </ListGroup>
        </div>
        <style>{`

            .custom-list-item {
                background-color: rgba(13, 110, 253, 0.25) !important; /* Matches bg-primary with opacity */
                border: none !important;
                color: black !important;
            }

            .custom-list-item:hover {
                background-color: rgba(13, 110, 253, 0.5) !important; /* Slightly darker on hover */
                color: white !important;
            }

            .custom-list-item.active {
                background-color: rgba(13, 110, 253, 0.7) !important; /* Darker blue for active item */
                color: white !important;
            }
        `}</style>
        </>
        
    );
}

export default OwnerSideMenu;
