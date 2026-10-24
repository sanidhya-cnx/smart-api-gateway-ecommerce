const axios = require("axios");

const getUserByEmail = async (email) => {

    try{
        const response = await axios.post(
        `${process.env.USER_SERVICE_URL}/users/internal/find-by-email`,
        {
            email
        },
        {
            headers: {
                "x-internal-secret": process.env.INTERNAL_SERVICE_SECRET || "internal-secret-key-123"
            }
        }
    );

    return response.data.data;
    }
    catch(error){
        if(error.response && error.response.status === 404){
            return null;
        }
        throw error;
    }

};

const getUserById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_URL}/users/${id}`
        );
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
};

const createUser = async (userData) => {
    try{
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/users/internal/create`,
            userData,
            {
                    headers: {
                        "x-internal-secret": process.env.INTERNAL_SERVICE_SECRET || "internal-secret-key-123"
                    }
            }
        );
            return response.data.data;
    }
    catch(error){
        console.error("Error creating user:", error.response.data.message);
        throw error.response.data.message;
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
};