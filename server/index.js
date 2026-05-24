import express, { json, urlencoded } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

// import users from './mockData/users';
// import todos from './mockData/todos';

async function startServer() {
    const app = express();
    app.use(json());
    app.use(urlencoded({ extended: true }));

    const server = new ApolloServer({
        typeDefs: ` type User{
                        id: ID!
                        name: String
                        username: String
                        email: String
                        phone: String
                        website: String
                    }

                    type Todo {
                        id: ID!
                        title: String!
                        completed: Boolean
                        user: User 
                    }

                    type Query {
                        getTodos: [Todo]
                        getUser(id: ID!): User
                    }
                `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + todo.id);
                    const data = await res.json();
                    return data;
                }
            },

            Query: {
                getTodos: async () => {
                    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
                    const data = await res.json();
                    return data;
                },

                getUser: async (parent, { id }) => {

                }

            },
        },
    });

    await server.start();

    app.use(
        '/graphQL',
        cors(),
        express.json(),
        (req, _res, next) => {
            if (req.body === undefined) {
                req.body = {};
            }
            next();
        },
        expressMiddleware(server)
    );
    app.listen(8000, () => console.log('Server started'));
}

startServer();
