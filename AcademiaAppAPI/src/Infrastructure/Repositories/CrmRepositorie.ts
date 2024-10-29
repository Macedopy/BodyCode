import { UserModel } from "../../DTOs/userModel";
import connectionToOracle from "../Configurations/connectionToOracle";

let connection;

export const findAllUsers = async(): Promise<UserModel[]> =>
{
        try
        {
            connection = await connectionToOracle.connect();
            const result = await connection.execute('SELECT * FROM person ORDER BY id ASC');
            const users = result.rows as UserModel[];
            connection.break
            return users;
        } catch
        {
            throw console.error("Error fetching users")
        }
}


export const findUserById = async (id: Number): Promise<UserModel | undefined> =>
{
            try
            {
                connection = await connectionToOracle.connect();

                const fetchUsers = await connection.execute('SELECT * FROM person WHERE id = :id', [id]);
                const user = fetchUsers.rows?.[0] as UserModel | undefined;
                connection.break
                return user;
            }catch (error)
            {
                console.error("Error fetching user by id ", error);
                throw error;
            }
};

export const createUser = async(userModel: UserModel) => 
    {
        try
        {
            connection = await connectionToOracle.connect();
            const query = `
                INSERT INTO person
                (id, name, age, nationality, qi, strength, agility)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    
            const values = [
                userModel.id,
                userModel.name,
                userModel.age,
                userModel.nationality,
                userModel.statistics.qi,
                userModel.statistics.strength,
                userModel.statistics.agility,
            ];
    
            const responseCreate = await connection.execute(query, values);
            connection.break
            return responseCreate;
        } catch(error)
        {
            throw console.error("Cannot create the user ", userModel, error)
        }
    }

export const deleteUser = async(id: Number) =>
{
    try
    {
        connection = await connectionToOracle.connect();
        const findUser = await findUserById(id);

        if(findUser)
            {
                await connection.execute('DELETE FROM person WHERE id = $1', [id]).then(() => 
                    {
                        return true;
                    });
                connection.break;
            }
    } catch(error)
    {
        console.error("User not found ", error);
        throw error;
    }

}

export const updateUser = async(id: number, userModel: UserModel)=>
    {
        try {
            connection = await connectionToOracle.connect();
            const existingUser = await findUserById(id);
            if (existingUser)
                {
                    existingUser.name = userModel.name;
                    existingUser.age = userModel.age;
                    existingUser.nationality = userModel.nationality;
                    existingUser.statistics.qi = userModel.statistics.qi;
                    existingUser.statistics.strength = userModel.statistics.strength;
                    existingUser.statistics.agility = userModel.statistics.agility;
                }
    
                const updatedUser: UserModel = {
                    ...existingUser!,
                    }
                };
        
                // Prepare update query
                const updateQuery =
                    `UPDATE person SET
                    name = $1,
                    age = $2,
                    nationality = $3,
                    qi = $4,
                    strength = $5,
                    agility = $6
                    WHERE id = $7`;
        
                const { name, age, nationality, statistics } = updatedUser;
                const { qi, strength, agility } = statistics || {};
        
                // Execute update query
                await client.query(updateQuery, [name, age, nationality, qi, strength, agility, id]);

            connection.break
            return client;
        } catch (error) {
            console.error("User not can be updated ", error);
            throw error;
        }
    }