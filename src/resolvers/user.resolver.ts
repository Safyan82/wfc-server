import {Query, Resolver, Arg, Mutation} from 'type-graphql';
import { CreateUserInput, User } from '../schema/user.schema';
import UserService from '../service/user.service';

@Resolver()
export default class UserResolver {

    constructor(private userService: UserService){
        this.userService=new UserService()
        // role base auth
        // role = ctx.roleId
    }

    @Mutation(() => User)
    createUser(@Arg('input', {validate: true}) input: CreateUserInput){
        
        return this.userService.createUser(input)
    }

    @Query(()=>User)
    user(){
        return{
            _id: "123",
            name: "Safyan",
            email: "Safyan@gmail.com"
        }
    }
}