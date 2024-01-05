import { Authorized, Query, Resolver } from "type-graphql";
import { UserAccessService } from "../../service/userAccessService/userAccess.service";
import { userAccess, userAccessResponse } from "../../schema/userAccessSchema/userAccess.schema";

@Resolver()
export class UserAccessResolver{
    constructor(private userAccessService: UserAccessService){
        this.userAccessService = new UserAccessService();
    }

    // @Authorized()
    @Query(()=>[userAccessResponse])
    getUsersAccessLog(){
        return this.userAccessService.getUsersAccessLog();
    }
}