import axios from 'axios';

// Получить список звонков
export const getList = async (token) => {
    return await axios.post(
        "https://api.skilla.ru/mango/getList",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
};

// Получить запись звонка
export const getRecord = async (token, recordId, partnershipId) => {
    return await axios.get(
        `https://api.skilla.ru/mango/getRecord?record=${recordId}&partnership_id=${partnershipId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
                "Content-Transfer-Encoding": "binary",
                "Content-Disposition": `filename="record.mp3"`
            },
            responseType: 'blob'
        }
    );
};
