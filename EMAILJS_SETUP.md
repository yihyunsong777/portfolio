# EmailJS 설정 가이드

연락하기 폼이 실제로 이메일을 전송하도록 EmailJS를 설정하는 방법입니다.

## 1. EmailJS 계정 생성 및 설정

1. **EmailJS 가입**
   - https://www.emailjs.com/ 접속
   - 무료 계정 생성 (월 200통 무료)

2. **이메일 서비스 추가**
   - Dashboard → Email Services
   - "Add New Service" 클릭
   - Gmail, Outlook 등 원하는 이메일 서비스 선택
   - 연결 설정 완료
   - **Service ID** 복사해두기 (예: `service_xxxxx`)

3. **이메일 템플릿 생성**
   - Dashboard → Email Templates
   - "Create New Template" 클릭
   - 템플릿 설정:
     - **Subject**: `포트폴리오 문의: {{from_name}}`
     - **Content**:
       ```
       이름: {{from_name}}
       이메일: {{from_email}}
       
       메시지:
       {{message}}
       
       ---
       이 메시지는 포트폴리오 웹사이트의 연락하기 폼을 통해 전송되었습니다.
       ```
   - 저장 후 **Template ID** 복사해두기 (예: `template_xxxxx`)

4. **Public Key 확인**
   - Dashboard → Account → General
   - **Public Key** 복사해두기 (예: `xxxxxxxxxxxxx`)

## 2. 코드에 설정 적용

`script.js` 파일을 열어서 다음 값들을 교체하세요:

```javascript
// 1. EmailJS 초기화 부분 (약 50번째 줄)
emailjs.init("YOUR_PUBLIC_KEY"); // 여기에 Public Key 입력

// 2. Contact Form Handling 부분 (약 70번째 줄)
const serviceID = 'YOUR_SERVICE_ID'; // 여기에 Service ID 입력
const templateID = 'YOUR_TEMPLATE_ID'; // 여기에 Template ID 입력
```

## 3. 테스트

1. 웹사이트의 연락하기 폼에 테스트 메시지 입력
2. 전송 버튼 클릭
3. 설정한 이메일 주소로 메시지가 도착하는지 확인

## 주의사항

- 무료 플랜은 월 200통까지 무료입니다
- Public Key는 클라이언트 사이드에 노출되어도 안전합니다 (EmailJS에서 권장하는 방식)
- 이메일 서비스 연결 시 보안 설정을 확인하세요

## 문제 해결

- 이메일이 오지 않는 경우: EmailJS Dashboard의 Logs 탭에서 전송 상태 확인
- 오류가 발생하는 경우: 브라우저 콘솔(F12)에서 에러 메시지 확인

