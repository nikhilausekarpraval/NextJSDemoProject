import { IClaim, IRoleClaim, IRoleUser, IUser, IUserForm } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class usersService {

    constructor(){

    }

    async createUser(user:IUser){
       return await apiService.post('api/Authenticate/register',user);
    }

    async updateUser(user:IUserForm){
        return await apiService.put('api/Authenticate/update_user',user);
    }

    async resetUserPasssword(user:IUserForm){
        return await apiService.put('api/Authenticate/reset_password',user)
    }

    async forgettUserPasssword(user:IUserForm){
      return await apiService.put('api/Authenticate/forget_password',user)
  }

    async deleteUser(user:IUser){
        return await apiService.delete("api/Authenticate",user);
    }

    async assignClaimToUser(claim:IClaim){
       return await apiService.post("api/Admin/add_claim_to_user",claim);
    }

    async addRoleToUser(role:IRoleUser){
      return  await apiService.post("api/Admin/add_role_to_user",role)
    }

    async addClaimtoRole(claim:IRoleClaim){
      return  await apiService.post("api/Admin/add_claim_to_role",claim)

    }

    async addRole(role:any){
        return await apiService.post("api/Admin/add_role",role)
    }

    async getRoles(){
        return await apiService.get("api/Admin/getRoles")
    }

    async getUsers(){
       return await apiService.get("api/Admin/getUsers")
    }

    async logoutUser(user:any){
        return await apiService.get("api/Authenticate/logout");
    }


}export default usersService