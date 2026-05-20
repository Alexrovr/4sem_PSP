class Api {
    /**
     * GET запрос через fetch (async/await)
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>} - Данные в формате JSON
     */
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json(); // Десериализация JSON
        } catch (error) {
            console.error("GET ошибка:", error);
            return null;
        }
    }

    /**
     * POST запрос через fetch (async/await)
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise<any>} - Ответ сервера
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return {
                data: response.ok ? await response.json() : null,
                status: response.status
            };
        } catch (error) {
            console.error("POST ошибка:", error);
            return { data: null, status: 500 };
        }
    }
}

export const api = new Api();
