"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../schema/user.schema");
// import { consumer, producer } from "../utils/kafka";
class UserService {
    async createUser(input) {
        try {
            const user = await user_schema_1.UserModal.create(input);
            const messages = JSON.stringify(input);
            // await producer.send([{topic: 'wfc-test', messages}], (error, _) => {
            //     if (error) {
            //       throw new Error(error);
            //     }
            //     producer.close();
            //   });
            return user;
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.default = UserService;
