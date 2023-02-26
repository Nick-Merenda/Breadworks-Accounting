import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Register = () => {
  const [error, setError] = useState(null);
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState({
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const [DOB, setDOB] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/register", {
        Fname: Fname,
        Lname: Lname,
        email: email,
        password: password,
        address: {
          street_address: address.street_address,
          city: address.city,
          state: address.state,
          zip_code: address.zip_code,
        },
        DOB: DOB,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
		setMessage("Account registration successful");
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
        navigate('/');
      }, 3000);
    }
  }, [message]);

  return (
	<div className="flex flex-col items-center">
    <div className="bg-white p-6 rounded-lg shadow-xl w-4/12 mx-auto mt-10 mb-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium mb-4">Register</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="Fname">
            First Name
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="Fname"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="Lname">
            Last Name
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="Lname"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="street_address">
            Street Address
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="street_address"
            name="street_address"
            value={address.street_address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="city">
            City
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="state">
            State
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="zip_code">
            Zip Code
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="zip_code"
            name="zip_code"
            value={address.zip_code}
            onChange={handleAddressChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="DOB">
            Date of Birth
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="DOB"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
          />
        </div>
        {error ? (
          <div className="text-red-500 font-medium mb-4">{error}</div>
        ) : null}

        <button className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600">
          Register
        </button>
		<p>{message}</p>
      </form>
	  </div>
	  <div className="pb-10">
		<Link to='/login'>
		<button
          className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-800" 
        >
          Already have an account?
        </button>
		</Link>
		</div>
    </div>
  );
};


export default Register;