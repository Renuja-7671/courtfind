import React, { useEffect, useState } from "react";
import { getArenaCourtDetails } from "../services/commonService";

const ViewingPage = () => {
    const [arenaCourts, setArenaCourts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            const response = await getArenaCourtDetails();
            if (response.success !== false) {
                setArenaCourts(response);
            }
            setLoading(false);
        }
        fetchDetails();
    }, []);

    return (
        <div className="container py-4">
            {loading ? (
                <div className="text-center fs-4">Loading...</div>
            ) : (
                arenaCourts.map((item, index) => (
                    <div key={index} className="mb-5 bg-white rounded shadow p-4">
                        {/* Arena Name and Info */}
                        <h2 className="h4 fw-bold mb-2">{item.arena_name}</h2>
                        <p className="text-secondary mb-2">{item.arena_address}, {item.arena_country}</p>

                        {/* Images */}
                        <div className="row g-3 mb-4">
                            {item.court_images?.split(",").map((url, i) => (
                                <div key={i} className="col-6 col-md-4">
                                    <img
                                        src={url.trim()}
                                        alt="Court"
                                        className="img-fluid rounded"
                                        style={{ height: '160px', objectFit: 'cover', width: '100%' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Court Info */}
                        <h3 className="h5 fw-semibold mb-1">Court: {item.court_name}</h3>
                        <p className="mb-2">Availability: {item.court_availability}</p>

                        {/* Rating & Action */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <p className="mb-1 fs-5">Rating: ⭐ 4.2</p>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-decoration-underline small"
                                >
                                    Open in Google Maps
                                </a>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-secondary btn-sm">Availability</button>
                                <button className="btn btn-primary btn-sm">Book Now</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};


export default ViewingPage;
