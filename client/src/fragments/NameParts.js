import { gql } from 'apollo-boost';

export const NameParts = gql`
    fragment NameParts on User {
        firstName
        lastName
    }
`;