const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class AsanakWebCallClient {
    constructor(username, password, baseUrl = "https://callapi.asanak.com", logger = console) {
        this.username = username;
        this.password = password;
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        this.logger = logger;
    }

    async uploadNewVoice(filePath) {
        const url = `${this.baseUrl}/v1/upload/voice`;
        const form = new FormData();
        form.append('username', this.username);
        form.append('password', this.password);
        form.append('file', fs.createReadStream(filePath));

        try {
            const response = await axios.post(url, form, { headers: form.getHeaders() });
            return this._processResponse(response.data);
        } catch (e) {
            this._logError('Upload voice', e);
            throw new Error(`Upload failed: ${e.message}`);
        }
    }

    async callByVoice(voiceId, destination) {
        return this._sendRequest('/v1/call/voice-file', { voice_id: voiceId, destination });
    }

    async callByOtp(code, destination) {
        return this._sendRequest('/v1/call/otp', { code, destination });
    }

    async callStatus(callIds) {
        if (Array.isArray(callIds)) {
            callIds = callIds.join(',');
        }
        return this._sendRequest('/v1/report/callstatus', { call_ids: callIds });
    }

    async getCredit() {
        return this._sendRequest('/v1/report/credit', {});
    }

    async _sendRequest(endpoint, payload) {
        const url = `${this.baseUrl}${endpoint}`;
        payload.username = this.username;
        payload.password = this.password;

        try {
            const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
            return this._processResponse(response.data);
        } catch (e) {
            this._logError(`Call API: ${endpoint}`, e);
            throw new Error(`Request failed: ${e.message}`);
        }
    }

    _processResponse(data) {
        if (!data.success) {
            throw new Error(data.error || "bad request error.");
        }
        return data;
    }

    _logError(context, error) {
        if (this.logger && typeof this.logger.error === 'function') {
            this.logger.error(`${context} error`, error);
        }
    }
}

module.exports = WebCallClient;
