import * as repositorie from "../../Infrastructure/Repositories/CrmRepositorie";
import { UserModel } from "../../DTOs/userModel";
import { response } from "express";

export const getUserService = async () => 
    {
        try
        {
            const fetchAllUsers = await repositorie.findAllUsers();
            
            const jsonData = JSON.parse(JSON.stringify(fetchAllUsers));
            
            return jsonData;
        }catch (error) 
        {
            throw console.error("Error while attempting to retrieve All Users ", error);
        }
    }

export const getUserByIdService = async (id: number) => 
    {
        const data = await repositorie.findUserById(id);
        return data;
    };

export const createUserService = async (user: UserModel) =>
    {
        let response = null;
        if (Object.keys(user).length != 0)
            {
                await repositorie.createUser(user);
            }
        return response;
    }

export const deleteUserService = async (id: Number) => 
    {
        let response = null;
        if (id)
            {
                await repositorie.deleteUser(id);
            }
        return response;
    }
    
export const updateUserService = async (id: number, userModel: UserModel) => 
    {
        const data = await repositorie.updateUser(id, userModel);
        const response = await data;
        return response;
    }