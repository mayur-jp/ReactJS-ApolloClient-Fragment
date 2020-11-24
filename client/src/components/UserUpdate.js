import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NameParts } from '../fragments/NameParts'
import { AddressParts } from '../fragments/AddressParts'

const GET_USER = gql`
  ${NameParts}
  ${AddressParts}
  query getUser($id: Int!) {
    getUser(id: $id) {
      id
      ...NameParts
      email
      ...AddressParts
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($userId: Int!,$firstName: String!, $lastName: String!,$email: String!,$country: String!,$state: String!,$city: String!,$areacode: String!) {
    updateUser(id: $userId,firstName: $firstName,lastName: $lastName,email: $email,country: $country,state: $state,city: $city,areacode: $areacode){
      id
    }
  }
`;

const UserUpdate = ({ id }) => {
  const { data } = useQuery(GET_USER, { variables: { id: id } });
  const [userId, setUserId] = useState({});
  const [updateUser] = useMutation(UPDATE_USER);

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

  const updateHandleSubmit = (event) => {
    event.preventDefault();
    updateUser({ variables: { userId, firstName, lastName, email, country, state, city, areacode } });
    setFirstName("");
    setLastName("");
    setEmail("");
    setCountry("");
    setState("");
    setCity("");
    setAreacode("");
    window.location.reload();
  }

  if (data && data.getUser) {
    const { getUser: { id, firstName, lastName, email, country, state, city, areacode } } = data;
    return <div>
      <hr></hr>
      <h4>Update Details</h4>
      <form onSubmit={updateHandleSubmit} >
        <div className="row center">
          <div className="col-md-8">
            <input className="form-control" defaultValue={firstName} onChange={firstNameHandleOnChange} type="text" name="firstName" placeholder="First Name" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="form-control" defaultValue={lastName} onChange={lastNameHandleOnChange} type="text" name="lastName" placeholder="Last Name" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="form-control" defaultValue={email} onChange={emailHandleOnChange} type="email" name="email" placeholder="Email Address" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="form-control" defaultValue={country} onChange={countryHandleOnChange} type="text" name="country" placeholder="Country" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="form-control" defaultValue={state} onChange={stateHandleOnChange} type="text" name="state" placeholder="State" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="form-control" defaultValue={city} onChange={cityHandleOnChange} type="text" name="city" placeholder="City" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="form-control" defaultValue={areacode} onChange={areacodeHandleOnChange} type="text" name="areacode" maxLength="6" placeholder="Areacode" required />
          </div>
          <div className="col-md-8 mt-2">
            <input className="btn btn-success btn-block" onClick={() => setUserId(id)} type="submit" value="Update" />
          </div>
        </div>
      </form>
    </div>;
  }

  return null;
}

export default UserUpdate;