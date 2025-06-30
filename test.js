const AsanakSmsClient = require('./src/index');
const logger = require('./src/logger');

const sms = new AsanakSmsClient('username', 'password', 'https://sms.asanak.ir', logger);

async function run() {
    try {
        const res = await sms.sendSms('9821XXX', '09120000000', 'این یک متن پیامک تستی می باشد');
        console.log('Response:', res);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

run();
