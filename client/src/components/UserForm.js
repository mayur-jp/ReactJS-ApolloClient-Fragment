import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { NameParts } from '../fragments/NameParts'
import { AddressParts } from '../fragments/AddressParts'

const ADD_USER = gql`
  ${NameParts}
  ${AddressParts}
  mutation addUser($firstName: String!,$lastName: String!,$email: String!,$country: String!,$state: String!,$city: String!,$areacode: String!) {
    addUser(firstName: $firstName,lastName: $lastName,email: $email,country: $country,state: $state,city: $city,areacode: $areacode) {
        id,
        ...NameParts
        email
        ...AddressParts
    }
  }
`;

const UserForm = () => {
    const [addUser] = useMutation(ADD_USER);
    const [firstName, setFirstName] = useState({});
    const [lastName, setLastName] = useState({});
    const [email, setEmail] = useState({});
    const [country, setCountry] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [areacode, setAreacode] = useState({});

    const firstNameHandleOnChange = (event) => {
        setFirstName(event.target.value);
    }

    const lastNameHandleOnChange = (event) => {
        setLastName(event.target.value);
    }

    const emailHandleOnChange = (event) => {
        setEmail(event.target.value);
    }

    const countryHandleOnChange = (event) => {
        setCountry(event.target.value);
    }

    const stateHandleOnChange = (event) => {
        setState(event.target.value);
    }

    const cityHandleOnChange = (event) => {
        setCity(event.target.value);
    }

    const areacodeHandleOnChange = (event) => {
        setAreacode(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addUser({ variables: { firstName, lastName, email, country, state, city, areacode } });
        setFirstName("");
        setLastName("");
        setEmail("");
        setCountry("");
        setState("");
        setCity("");
        setAreacode("");
        window.location.reload();
    }

    return <div>
        <h4>Add User</h4>
        <hr></hr>
        <form onSubmit={handleSubmit}>
            <div className="row center">
                <div className="col-md-8">
                    <input className="form-control" value={firstName.length ? firstName : ''} onChange={firstNameHandleOnChange} type="text" name="firstName" placeholder="First Name" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="form-control" value={lastName.length ? lastName : ''} onChange={lastNameHandleOnChange} type="text" name="lastName" placeholder="Last Name" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="form-control" value={email.length ? email : ''} onChange={emailHandleOnChange} type="email" name="email" placeholder="Email Address" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="form-control" value={country.length ? country : ''} onChange={countryHandleOnChange} type="text" name="country" placeholder="Country" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="form-control" value={state.length ? state : ''} onChange={stateHandleOnChange} type="text" name="state" placeholder="State" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="form-control" value={city.length ? city : ''} onChange={cityHandleOnChange} type="text" name="city" placeholder="City" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="form-control" value={areacode.length ? areacode : ''} onChange={areacodeHandleOnChange} type="text" name="areacode" maxLength="6" placeholder="Areacode" required />
                </div>
                <div className="col-md-8 mt-2">
                    <input className="btn btn-success btn-block" type="submit" value="Add" />
                </div>
            </div>
        </form>
    </div>;
}

export default UserForm;