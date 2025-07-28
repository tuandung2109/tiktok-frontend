import axios from 'axios';

const httpRequest = axios.create({
    baseURL: '${process.env.REACT_APP_API_BASE}/', // ⚠️ GÁN TRỰC TIẾP PORT BACKEND Ở ĐÂY
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
