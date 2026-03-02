#!/bin/bash OR PowerShell

# ⚡ الخطوات السريعة جداً (5 دقائق)

# 1️⃣ تأكد Node.js مثبت
node --version  # يجب يعرض v18+

# 2️⃣ نزل الـ dependencies
cd c:\Users\عبدالهادي\Desktop\apas-final
npm install

# 3️⃣ اختبر محلياً
npm run dev
# شوف: http://localhost:5173

# 4️⃣ Build للإنتاج
npm run build

# 5️⃣ GitHub (عد نسخ paste هذا بالضبط)
git init
git add .
git commit -m "APAS deployment ready"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/apas-final.git
git push -u origin main

# 6️⃣ Vercel
# الدخول في https://vercel.com
# اضغط New Project → اختر apas-final
# Settings → Environment Variables
# أضف: ANTHROPIC_API_KEY = sk-ant-xxx...
# Deploy!

# 7️⃣ شوف رابطك الحي ✅
# مثل: https://apas-final-xyz.vercel.app

echo "✅ Ready! Check Vercel dashboard for your live URL"
