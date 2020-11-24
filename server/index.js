const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes, Model } = require('sequelize');
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

class User extends Model { }

User.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areacode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

// Find all users
async function getUsers() {
    const user = await User.findAll();
    return user;
}
async function addUser(params) {
    const user = await User.create({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        country: params.country,
        state: params.state,
        city: params.city,
        areacode: params.areacode,
    });
    return user;
}

async function updateUser(params) {
    var values = {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        country: params.country,
        state: params.state,
        city: params.city,
        areacode: params.areacode,
    };
    var selector = {
        where: { id: params.id }
    };
    const user = await User.update(values, selector);
    return user ? true : false;
}

async function getUser(id) {
    const user = await User.findByPk(id);
    return user;
}

async function deleteUser(id) {
    const user = await User.destroy({
        where: {
            id: id
        }
    });;
    return user;
}

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    country: String
    state: String
    city: String
    areacode: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getUsers: [User]
    getUser(id: Int): User
  }

  # The "Mutation" type is another type, it can insert, delete, update the table's records.
  type Mutation {
    addUser(firstName: String, lastName: String, email: String, country: String, state: String, city: String, areacode: String): User
    updateUser(id: Int, firstName: String, lastName: String, email: String, country: String, state: String, city: String, areacode: String): User
    deleteUser(id: Int): Boolean
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getUsers: () => getUsers(),
        getUser: (parent, args, context, info) => {
            return getUser(args.id);
        },
    },
    Mutation: {
        addUser: (parent, args, context, info) => {
            return addUser({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                country: args.country,
                state: args.state,
                city: args.city,
                areacode: args.areacode,
            });
        },
        deleteUser: (parent, args, context, info) => {
            return deleteUser(args.id);
        },
        updateUser: (parent, args, context, info) => {
            const user = updateUser({
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                country: args.country,
                state: args.state,
                city: args.city,
                areacode: args.areacode,
            });
            return user;
        }
    }
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.use(cors());

const port = 4000;

app.listen({ port: port }, async () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
);
