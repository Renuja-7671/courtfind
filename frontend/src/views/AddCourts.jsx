import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to generate time options
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 4; hour <= 22; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    times.push(formattedHour);
  }
  return times;
};

const AddCourt = () => {
  const timeOptions = generateTimeOptions();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Court</h2>
      <div className="card p-4">
        <div className="mb-3">
          <label className="form-label">Court Name</label>
          <input type="text" className="form-control" placeholder="Court Name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Court Size</label>
          <input type="text" className="form-control" placeholder="Court Size" />
        </div>
        <hr />
        <h5>Available Sports</h5>
        <div className="mb-3">
          {["Badminton", "Basketball", "Table Tennis", "Swimming", "Tennis", "Gym"].map((sport) => (
            <div key={sport} className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id={sport} />
              <label className="form-check-label" htmlFor={sport}>{sport}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">Other</label>
          <input type="text" className="form-control" placeholder="Enter if not listed above" />
        </div>
        <hr />
        <h5>Available Time</h5>
        <div className="border p-3">
          <div className="row">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day} className="col-12 d-flex align-items-center mb-2">
                <span className="me-3" style={{ width: "100px" }}>{day}</span>
                <select className="form-select me-2 w-25">
                  <option>Open Time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <select className="form-select w-25">
                  <option>Close Time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="btn btn-primary me-2">Create</button>
          <button className="btn btn-outline-primary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddCourt;
