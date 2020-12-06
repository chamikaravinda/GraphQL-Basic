//GraphQL cheat sheat link :https://github.com/sogko/graphql-schema-language-cheat-sheet

const {ApolloServer,gql} = require ('apollo-server');

//create the schema
// "!" is used to allow null values
const typeDefs = gql`
type  Query{
    hello(name:String):String!
    user:User
} 

type User {
    id:ID!
    username : String!
    firstLetterOfUserName:String!
}

type   Error  {
    field:String!,
    message:String!
}

type RegisterResponse {
    error:[Error],
    user:User
}

input UserInfo{
    username:String!
    password:String!
    age:Int
}

type Mutation {
    register(userInfo:UserInfo) :  RegisterResponse
    login(userInfo:UserInfo) :  String!
}
`;

const resolvers = {
    User:{
        username : parent=>{
            return parent.username
        },
        firstLetterOfUserName : parent=>{
            return parent.username[0]
        },
    },
    Query :{
        hello:(parent,{name}) =>{
            return `Hey ${name}`;
        },
        user:()=>
        ({
            id:1,
            username:"username"
        })
    },
    Mutation:{
        login: async(parent,{userInfo:{username}},context,info)=>{
            console.log(context)
            return username;
        },
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

const server = new ApolloServer({typeDefs,resolvers,context:({req,res})=>({})});

server.listen().then(({url})=> console.log(`Server started at ${url}`));

