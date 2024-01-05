import { UserAccessModal } from "../../schema/userAccessSchema/userAccess.schema";

export class UserAccessService{
    async newAccess(input){
        await UserAccessModal.create(input)
    }

    async getUsersAccessLog(){
        const userLog = await UserAccessModal.aggregate([
            {
                $lookup:{
                    localField: 'employeeId',
                    foreignField: '_id',
                    as: 'employee',
                    from: 'employees'
                }
            }
        ]);
        return userLog;
    }
}