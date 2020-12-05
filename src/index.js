//GraphQL cheat sheat link :https://github.com/sogko/graphql-schema-language-cheat-sheet

const {ApolloServer,gql} = require ('apollo-server');

//create the schema
// "!" is used to allow null values
const typeDefs = gql`
type  Query{
    hello:String!
    user:User
} 

type User {
    id:ID!,
    username : String!
}

type   Error  {
    field:String!,
    message:String!
}

type RegisterResponse {
    error:[Error],
    user:User
}

type Mutation {
    register(username:String!,password:String!,age:Int) :  RegisterResponse
    login(username:String!,password:String!,age:Int) :  Boolean!
}
`;

const resolvers = {
    Query :{
        hello:() =>"hello world",
        user:()=>
        ({
            id:1,
            username:"username"
        })
    },
    Mutation:{
        login:()=>true,
        register :()=>({
            error:[,
                {
                    field:"Username",
                    message:"Bad user name"
                },
                {
                field:"Email",
                message:"Bad email"
            }],
            user:{
                id:1,
                username:"username"
            }
            
        })
    }
}

const server = new ApolloServer({typeDefs,resolvers});

server.listen().then(({url})=> console.log(`Server started at ${url}`));

