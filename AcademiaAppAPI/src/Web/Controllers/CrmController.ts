import {Request, Response} from "express";
import { UserModel } from "../../DTOs/userModel";
import { createUserService, getUserByIdService, getUserService, updateUserService } from "../../Infrastructure/Services/CrmService";


export const getUser = async (req: Request ,res: Response) => 
    {
        const httpResponse = await getUserService();

        res.status(httpResponse.statusCode).json(httpResponse.body);
    }

export const getUserById = async (req: Request, res: Response) => 
    {
        const id = parseInt(req.params.id);
        const httpResponse = await getUserByIdService(id);

        if (httpResponse) {
            res.sendStatus(200); 
        } else {
            res.sendStatus(404);
        }  
    }

export const postUser = async(req: Request, res: Response) =>
{
    const value = req.body;
    const httpResponse = await createUserService(value);
    if (httpResponse) {
        res.sendStatus(200); 
    } else {
        res.sendStatus(404);
    } 
}

export const updateUser = async (req: Request, res: Response) => 
    {
        const id = parseInt(req.params.id);
        const body : UserModel = req.body;
        const httpResponse = await updateUserService(id, body);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }