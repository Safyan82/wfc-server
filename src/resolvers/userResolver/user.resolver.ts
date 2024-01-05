import {Query, Resolver, Arg, Mutation, UseMiddleware, Ctx, Authorized} from 'type-graphql';
import { userInput, User, UserReponse, IsLoginResponse } from '../../schema/userSchema/user.schema';
import UserService from '../../service/userService/user.service';
import HashPasswordMiddleware from '../../utils/middleware/hashPassword.middleware';
import { Context } from '../../utils/context';

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

    @Mutation(() => UserReponse)
    @UseMiddleware(HashPasswordMiddleware)
    updateUser(@Arg('input', {validate: true}) input: userInput){
        return this.userService.updateUser(input)
    }

    @Mutation(()=> UserReponse)
    async verifyPassword(@Ctx() ctx: Context,
        @Arg('input', {validate: true}) input: userInput
        ){
        return this.userService.verifyPassword(input, ctx);
    }


    @Query(()=> UserReponse)
    getAllUser(){
        return this.userService.getAllUserList();
    }
  
    @Authorized()
    @Query(()=>IsLoginResponse)
    IsLogin(@Ctx() ctx: Context){
        if(ctx?.user){
            return {
                isLogin: true,
            }
        }else{
            return {
                isLogin: false,
            }
        }
    }

    @Authorized()
    @Query(()=>UserReponse)
    getUserByEmpId(@Arg('employeeId', {validate: true}) employeeId: string){
        return this.userService.getUserByEmpId(employeeId);
    }
}