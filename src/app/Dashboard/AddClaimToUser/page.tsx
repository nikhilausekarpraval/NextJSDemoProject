"use client"
import SubmitButton from '@/app/Components/SubmitButton'
import UsersService from '@/app/Services/UsersService';
import React, { useEffect, useState } from 'react'

export default function AddClaimToUser() {

  const [formData, setFormData] = useState({
    userId: '',
    claimType: '',
    claimValue:'',
    userName:""
  });
  
   const service = new UsersService();
  
   const [rolesResult,setRolesResult] =  useState([{userName:"",id:""}]);

     useEffect(()=>{
 
         getUsersAndRoles();
 
     },[])
 
   const  getUsersAndRoles=async()=>{
         try {
             const userService = new UsersService();
            const  users = await userService.getUsers() as any;   
            setRolesResult(users.value);

      
         } catch (error) {
             console.error("Error fetching data on the server:", error);
             return <div>Error loading roles or users</div>;
         }
     }
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   const result = await service.assignClaimToUser(formData);
  
  };

  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>
    <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white shadow-md rounded-lg col-span-full">
    <div className='justify-center items-center text-center font-bold h4 mb-0'>Add Claim To User</div>
    <div className="form-group mb-4 col-span-6">
          <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">User Name</label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a user</option>
            {rolesResult.map(role => (
              <option key={role?.userName} value={role?.id}>{role?.userName}</option>
            ))}
          </select>
        </div>
      <div className="form-group mb-4 col-span-6">
        <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Claim Type</label>
        <input
          id="claimType"
          name="claimType"
          type='text'
          value={formData.claimType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        </input>
      </div>
      <div className="form-group mb-4 col-span-6">
        <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Claim Value</label>
        <input
          id="claimValue"
          name="claimValue"
          type='text'
          value={formData.claimValue}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        </input>
      </div>
      <SubmitButton title={"Update"} />
    </form>
  </div>
  )
}
