const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const snoowrap = require('snoowrap');

const requester = new snoowrap({
  userAgent: 'becausecause',
  clientId: 'TRWSzDOcX4jtow',
  clientSecret: 'eT8y9OfVi5UDTEyOJC9ySd8nksw',
  refreshToken: '26923243-VAbrtHA498O-yIxO_QtejZ0Lt28'
});

const schema = buildSchema(`
  type Query {
    getBest: String,
    getMe: String,
    getSubs: String
  }
`);

const root = {
  getBest: async () => {
    listing = requester.getBest();
    const data = await listing;
    return JSON.stringify(data);
  },
  getMe: async () => {
    me = requester.getMe();
    const data = await me;
    return JSON.stringify(data);
  },
  getSubs: async () => {
    subs = requester.getSubscriptions();
    const data = await subs;
    return JSON.stringify(data);
  }
}

// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   input MessageInput {
//     content: String
//     author: String
//   }

//   type Message {
//     id: ID!
//     content: String
//     author: String
//   }

//   type Query {
//     getMessage(id: ID!): Message
//   }

//   type Mutation {
//     createMessage(input: MessageInput): Message
//     updateMessage(id: ID!, input: MessageInput): Message
//   }
// `);

// // If Message had any complex fields, we'd put them on this object.
// class Message {
//   constructor(id, {content, author}) {
//     this.id = id;
//     this.content = content;
//     this.author = author;
//   }
// }

// // Maps username to content
// const fakeDatabase = {};

// const root = {
//   getMessage: ({id}) => {
//     if (!fakeDatabase[id]) {
//       throw new Error('no message exists with id ' + id);
//     }
//     return new Message(id, fakeDatabase[id]);
//   },
//   createMessage: ({input}) => {
//     // Create a random id for our "database".
//     var id = require('crypto').randomBytes(10).toString('hex');

//     fakeDatabase[id] = input;
//     return new Message(id, input);
//   },
//   updateMessage: ({id, input}) => {
//     if (!fakeDatabase[id]) {
//       throw new Error('no message exists with id ' + id);
//     }
//     // This replaces all old data, but some apps might want partial update.
//     fakeDatabase[id] = input;
//     return new Message(id, input);
//   },
// };

const app = express();
// not exactly sure what this is doing. This gets us around the Access-Control-Allow-Origin issue
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');