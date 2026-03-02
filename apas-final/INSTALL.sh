#!/usr/bin/env bash
# Install dependencies locally (optional)
# This is only needed for local development
# Vercel will install dependencies automatically during build

cd "$(dirname "$0")" || exit 1

echo "🔨 تثبيت dependencies محلياً..."
echo ""
echo "نزل Node.js من: https://nodejs.org"
echo ""

# تحقق من Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت!"
    echo "✅ نزل من: https://nodejs.org"
    exit 1
fi

echo "✓ Node version: $(node -v)"
echo "✓ NPM version: $(npm -v)"
echo ""

# نزل dependencies
echo "⏳ تنزيل dependencies... (قد يأخذ دقائق)"
npm install

echo ""
if [ -d "node_modules" ]; then
    echo "✅ Dependencies نزلت بنجاح!"
    echo ""
    echo "🚀 الآن محاولة محلية:"
    echo "   npm run dev"
    echo ""
    echo "يفتح التطبيق على: http://localhost:5173"
else
    echo "❌ حصلت مشكلة في التثبيت"
    echo "✅ لكن لا تقلق - Vercel سينزلها تلقائياً"
    exit 1
fi
