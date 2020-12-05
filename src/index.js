const {ApolloServer,gql} = requ ('apollo-server');

//create the schema
const typeDefs = gql`
type  Query{
    hello:String!
} 
`;

const resolvers = {
    Query :{
        hello:() =>"hello world"
    }
}

const server = new ApolloServer({typeDefs,resolvers});

server.listen().then(({url})=> console.log(`Server started at ${url}`));