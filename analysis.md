# تحليل تدفق البيانات والمشاكل

## التدفق الحالي:
1. العميل يملأ نموذج RegistrationFormArabic
2. عند الضغط على "تقديم الطلب":
   - يُنشأ sessionId
   - يُستدعى createRegistration → يحفظ في جدول registration_data
   - يُستدعى createSession → يحفظ في جدول fazaa_sessions
   - يُوجه إلى صفحة الدفع /payment?sessionId=XXX
3. في صفحة Payment:
   - العميل يدخل بيانات البطاقة → updateSession → يحفظ في fazaa_sessions
   - العميل يدخل OTP → updateSession → يحفظ في fazaa_sessions
   - العميل يدخل PIN → updateSession → يحفظ في fazaa_sessions
4. في AdminPanel:
   - يُستدعى adminGetSessions → GET /api/admin/sessions
   - الخادم يعيد الجلسات من fazaa_sessions مع enrichment من registration_data

## المشاكل:

### مشكلة 1: عنوان التوصيل لا يظهر في AdminPanel
- registration_data يحتوي على: addressEmirate, addressDistrict, addressStreet, addressBuildingNumber
- الخادم في /api/admin/sessions يقوم بـ enrichment ويُعيد هذه الحقول
- لكن AdminPanel (PaymentSession interface + BookingDetailModal) لا يعرضها!

### مشكلة 2: district (المنطقة من الصفحة الرئيسية) غير موجود في PaymentSession
- fazaa_sessions يحتوي على district
- لكن AdminPanel يعرضها في الجدول الرئيسي فقط، وليس في الـ modal بشكل واضح

### مشكلة 3: واجهة AdminPanel - BookingDetailModal لا تعرض:
- district (المنطقة)
- addressEmirate (إمارة التوصيل)
- addressDistrict (منطقة التوصيل)
- addressStreet (الشارع)
- addressBuildingNumber (رقم المبنى)

### الحل:
1. إضافة هذه الحقول إلى PaymentSession interface في AdminPanel.tsx
2. عرضها في BookingDetailModal
3. التأكد من أن الخادم يرسلها بشكل صحيح
