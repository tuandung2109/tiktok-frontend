import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const result = await httpRequest.get('users/search', {
            params: { q, type },
        });

        console.log('📦 Kết quả API:', result); // In dữ liệu trả về từ API
        return result; // ✅ Không cần .data vì đã lấy sẵn ở httpRequest.js
    } catch (error) {
        console.error('❌ API error:', error);
        return [];
    }
};
