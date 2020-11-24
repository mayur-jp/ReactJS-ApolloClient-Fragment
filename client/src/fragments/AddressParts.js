import { gql } from 'apollo-boost';

export const AddressParts = gql`
    fragment AddressParts on User {
        country
        state
        city
        areacode
    }
`;