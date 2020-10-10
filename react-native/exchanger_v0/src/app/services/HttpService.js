import { getColorText } from "../common/utils/utils";

export default class HttpService {
    HEADERS = { "Content-Type": "application/json" };

    _apiBase = "";
    _apiBaseDev = "http://127.0.0.1.:3000/api/v0";
    
    _chat_id_jadaryaBot = "-1001243091960";
    _base_telegram_jadaryaBot = "https://api.telegram.org/bot988216202:AAHSpqEi_rLpAS9_rdY2_q_GAXXLFvFx__4/sendMessage";

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
        }
        return await res.json();
    }

    async sendMessageToTelegramBot(message) {
        try {
            return await this.request(
                this._base_telegram_jadaryaBot, 
                "POST",
                {
                    chat_id: this._chat_id_jadaryaBot,
                    text: message
                }
            );
        } catch (error) {
            console.log("error to send to bot a message", error);
            throw error;
        }
    }

    async sendPushMessage(message) {
        debugger;
        try {
            const result = await this.request(
                `${this._apiBaseDev}/messages/sendMessage`,
                "POST",
                message
           );
           return result;
        } catch (error) {
            console.log(getColorText("error to send a push message", error, "red"));
            //throw error;
        }
    }

    async request(url, method = "GET", data={}) {
        const config = { 
            method, 
            headers: this.HEADERS 
        };

        if (method === "POST" || method === "PATCH") {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(url, config);
        return await response.json();
    }
}
