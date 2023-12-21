import {Query, Resolver, Arg, Mutation, UseMiddleware} from 'type-graphql';
import { userInput, User, UserReponse } from '../../schema/userSchema/user.schema';
import UserService from '../../service/userService/user.service';
import HashPasswordMiddleware from '../../utils/middleware/hashPassword.middleware';

@Resolver()
export default class UserResolver {

    constructor(private userService: UserService){
        this.userService=new UserService()
        // role base auth
        // role = ctx.roleId
    }

    @Mutation(() => UserReponse)
    @UseMiddleware(HashPasswordMiddleware)
    newUser(@Arg('input', {validate: true}) input: userInput){
        
        return this.userService.newUser(input)
    }

  
}