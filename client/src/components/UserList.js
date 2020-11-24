import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NameParts } from '../fragments/NameParts'
import { AddressParts } from '../fragments/AddressParts'

import UserForm from './UserForm';
import UserUpdate from './UserUpdate';

const GET_USERS = gql`
  ${NameParts}
  ${AddressParts}
  query getUsers{
    getUsers {
      id
      ...NameParts
      email
      ...AddressParts
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Int!){
    deleteUser(id: $id)
  }
`;

const UsersList = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [userId, setUserId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(true);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleOnClick = (id) => {
    deleteUser({ variables: { id } });
  }

  const handleOnUpdateClick = (id) => {
    setUserId(id);
    setShowAddForm(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return <div refetch={refetch()}>
    {showAddForm && <UserForm />}
    {userId && !showAddForm && <UserUpdate id={userId}></UserUpdate>}
    {showAddForm &&
      <div>
        <hr></hr>
        <h4>User List</h4>
        <hr></hr>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Areacode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.getUsers.map(({ id, firstName, lastName, email, country, state, city, areacode }) =>
              <tr key={id}>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{country}</td>
                <td>{state}</td>
                <td>{city}</td>
                <td>{areacode}</td>
                <td><button className="btn btn-danger" onClick={() => handleOnClick(id)}>Delete</button>&nbsp;&nbsp;
            <button className="btn btn-info" onClick={() => handleOnUpdateClick(id)}>Update</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    }

  </div>;
}
export default UsersList;