export interface UserModel
{
    id: number;
    name: string;
    age: number;
    nationality: string;
    statistics:
    {
        qi: number;
        strength: number;
        agility: number;
    }
}