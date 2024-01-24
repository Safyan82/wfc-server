import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { UserAccessService } from "../../service/userAccessService/userAccess.service";
import { DeactivedResponse, userAccess, userAccessResponse } from "../../schema/userAccessSchema/userAccess.schema";

@Resolver()
export class UserAccessResolver{
    constructor(private userAccessService: UserAccessService){
        this.userAccessService = new UserAccessService();
    }

    @Authorized()
    @Query(()=>[userAccessResponse])
    getUsersAccessLog(){
        return this.userAccessService.getUsersAccessLog();
    }

    @Authorized()
    @Query(()=>[userAccessResponse])
    getUsersAccessLogByEmpId(@Arg('employeeId') employeeId:String){
        return this.userAccessService.getUsersAccessLogByEmpId(employeeId);
    }

    
    @Mutation(()=>DeactivedResponse)
    deactiveSession(@Arg('id') id:String ){
        return this.userAccessService.deactiveSession(id);
    }

    @Authorized()
    @Mutation(()=>DeactivedResponse)
    logoutAllDevices(@Arg('employeeId') employeeId:String){
        return this.userAccessService.logoutAllDevices(employeeId);
    }

}