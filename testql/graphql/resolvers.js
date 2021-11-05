import { getData } from "./db.js";

const resolvers = {
    Query: {
        data: () => getData()
    }
};

export default resolvers;