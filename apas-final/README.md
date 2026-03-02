# 🚀 APAS - نظام تحليل المقذوفات الذكي

تطبيق ويب متقدم لمحاكاة حركة المقذوفات باستخدام فيزياء حقيقية وذكاء اصطناعي.

## ✨ المميزات

- ✅ **محاكاة فيزيائية دقيقة** - Runge-Kutta 4 و Euler integration
- ✅ **تحليل الصور بالذكاء الاصطناعي** - رفع صورة واستخراج معاملات المقذوف
- ✅ **دردشة ذكية** - استشارة خبير فيزياء AI
- ✅ **عرض 3D** - تصور المسار في الفضاء الثلاثي
- ✅ **رسوم بيانية تفاعلية** - تحليل الطاقة والسرعة
- ✅ **دعم لغات** - عربي، إنجليزي، فرنسي

## 🛠️ الأدوات المستخدمة

- **React 18** - واجهة المستخدم
- **Vite 4** - بناء المشروع
- **Three.js** - رسومات ثلاثية الأبعاد
- **Recharts** - الرسوم البيانية
- **Anthropic Claude API** - الذكاء الاصطناعي
- **Vercel** - النشر

## 📦 التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/YOUR-USERNAME/apas-final.git
cd apas-final

# تثبيت الاعتماديات
npm install

# تشغيل محلياً
npm run dev

# البناء للإنتاج
npm run build
```

## 🚀 النشر على Vercel

### 1. تحضير API Key
```bash
# اذهب إلى:
https://console.anthropic.com/account/keys

# أنشئ API Key جديد وانسخه
```

### 2. GitHub
```bash
# في المجلد
git init
git add .
git commit -m "APAS ready deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/apas-final.git
git push -u origin main
```

### 3. Vercel
1. اذهب إلى https://vercel.com
2. سجل دخول (أو Facebook/Google)
3. اضغط "New Project"
4. اختر GitHub repo "apas-final"
5. إلى Settings → Environment Variables:
   - **Name:** ANTHROPIC_API_KEY
   - **Value:** (الـ API Key من الخطوة 1)
6. اضغط Deploy ✅

## 🎮 الاستخدام

### المحاكاة
1. اضبط المعاملات (السرعة، الزاوية، الكتلة، إلخ)
2. اختر طريقة عددية (RK4 أو Euler)
3. اضغط "محاكاة"
4. شاهد النتائج

### تحليل الصورة
1. اضغط "رفع صورة"
2. اختر صورة مقذوف
3. سيحلل AI الصورة ويستخرج المعاملات

### الدردشة الذكية
- اسأل أي سؤال عن فيزياء المقذوفات
- AI سيجيب بناءً على المحاكاة الحالية

## 🔐 الأمان

⚠️ **مهم جداً:**
- لا تضع API Key في الكود أبداً
- استخدم Vercel Environment Variables فقط
- لا تشارك .env.local

## 📝 الترخيص

MIT - استخدم بحرية

## 📧 التواصل

أي مشاكل أو اقتراحات؟ افتح Issue على GitHub
