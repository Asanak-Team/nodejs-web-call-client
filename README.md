# 📦 Web Call Client Node.js

یک کلاینت مدرن Node.js برای مدیریت تماس ها از طریق یک سرویس RESTful.

## 📌 ویژگی‌ها

- آپلود فایل صوتی به لیست فایل ها
- ایجاد تماس از طریق فایل صوتی (تک یا چند مقصده)
- ایجاد تماس برای کد های احراز هویت (OTP)
- دریافت گزارش وضعیت تماس ها
- دریافت اعتبار باقی مانده

---

## 📄 منابع و مستندات

- 🌐 [صفحه اصلی سرویس تماس آسا‌نک](https://callapi.asanak.com/)
- 🧾 [مستندات آنلاین کامل](https://callapi.asanak.com/docs/v1)
- 🚀 [مستندات آنلاین Postman](https://documenter.getpostman.com/view/21876448/2sB2qcDM5m)
- ⬇️ [دانلود فایل کالکشن Postman](https://callapi.asanak.com/docs/v1/Asanak_Call_API_Service.postman_collection.json)

---

## 🔧 نصب پکیج

در ترمینال خود اجرا کنید:

```bash
npm i asanak-web-call-client
```

## 🧪 نحوه استفاده

1- مقداردهی اولیه کلاینت:

```javascript
const AsanakWebCallClient = require('asanak-web-call-client');

const client = new AsanakWebCallClient('your-username', 'your-password');

```

### 1. افزودن فایل صوتی جدید
```javascript
client.uploadNewVoice('/path/file/voice.mp3')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 2. تماس از طریق فایل صوتی
```javascript
client.callByVoice('VOICE_FILE_ID', '09120000000')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 3. تماس OTP
```javascript
client.callByOtp(1234, '09120000000')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 4. استعلام وضعیت تماس ها
```javascript
client.msgStatus(['CALL_ID_1', 'CALL_ID_2'])
  .then(data => console.log(data['CALL_ID_1']['status']))
  .catch(error => console.error(error));
```

### 5. استعلام اعتبار باقی مانده
```javascript
client.getCredit()
  .then(data => console.log(data['credit']))
  .catch(error => console.error(error));
```   


## 📮 ارتباط با پشتیبانی
📞 <a target="_blank" href="https://asanak.com/call_to_asanak">۰۲١۶۴۰۶۳۱۸۰</a>
<br>
📨 <a href="mailto:info@asanak.ir">info@asanak.ir</a>
