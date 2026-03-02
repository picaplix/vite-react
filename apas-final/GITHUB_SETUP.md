# 📤 خطوات الرفع على GitHub

## ✅ الخطوة 1: تنزيل Git (اختياري - قد يكون مثبتاً)

```bash
# تحقق إذا كان Git مثبتاً
git --version

# إذا لم يكن مثبتاً، نزل من:
https://git-scm.com/download/win
```

## ✅ الخطوة 2: إنشاء حساب GitHub

1. اذهب إلى https://github.com
2. اضغط "Sign up"
3. اختر اسم مستخدم (يفضل: عبدالهادي أو مشابه)
4. أدخل البريد الإلكتروني
5. أنشئ كلمة مرور قوية
6. أكمل التحقق من البريد

## ✅ الخطوة 3: إنشاء Repository جديد

1. سجل دخول إلى GitHub
2. اضغط علامة + (أعلى اليمين)
3. اختر "New repository"
4. **اسم:** apas-final
5. **الوصف:** AI Projectile Analysis System
6. اختر "Public" (عام)
7. **لا** تختر "Initialize with README" (عندنا ملف README بالفعل)
8. اضغط "Create repository"

ستشوف صفحة مع أوامر - انسخ الـ URL (مثل: https://github.com/USERNAME/apas-final.git)

## ✅ الخطوة 4: رفع الملفات

افتح PowerShell في المشروع:

```bash
# انتقل للمجلد
cd c:\Users\عبدالهادي\Desktop\apas-final

# تهيئة Git
git init

# أضف كل الملفات
git add .

# احفظ التغييرات (Commit)
git commit -m "Initial commit: APAS ready for Vercel"

# غير اسم الفرع (Branch) إلى main
git branch -M main

# أضف العنوان البعيد (Remote)
# استبدل USERNAME باسم مستخدمك GitHub
git remote add origin https://github.com/USERNAME/apas-final.git

# رفع الملفات
git push -u origin main
```

## ✅ الخطوة 5: التحقق

1. اذهب إلى https://github.com/USERNAME/apas-final
2. يجب تشوف كل ملفاتك (src, api, package.json, إلخ)
3. افتح .env.local - لن تعرضها GitHub (محمية! ✅)

## 🎉 خلاص! الآن جاهز للنشر على Vercel

اذهب إلى VERCEL_SETUP.md للخطوة التالية.

## ❓ مشاكل شائعة

### "authentication failed"
- تأكد من اسم المستخدم وكلمة المرور على GitHub
- قد تحتاج token بدل الـ password:
  1. اذهب Settings → Developer settings → Personal access tokens
  2. أنشئ token جديد
  3. استخدمه بدل الـ password

### "fatal: Not a git repository"
```bash
# تأكد أنك في المجلد الصحيح
cd c:\Users\عبدالهادي\Desktop\apas-final
git status  # يجب يعرض status
```

### "origin already exists"
```bash
git remote remove origin
# ثم جرب git remote add origin مجدداً
```
