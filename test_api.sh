#!/bin/bash

BASE_URL="https://fazaa-ae.up.railway.app"

echo "=== 1. Login ==="
TOKEN=$(curl -s -X POST "$BASE_URL/api/admin/login" -H "Content-Type: application/json" -d '{"password":"Fazaa 2026"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "Token: $TOKEN"

echo ""
echo "=== 2. Verify Token ==="
curl -s "$BASE_URL/api/admin/verify" -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo ""
echo "=== 3. Get Stats ==="
curl -s "$BASE_URL/api/admin/stats" -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo ""
echo "=== 4. Get All Sessions ==="
curl -s "$BASE_URL/api/admin/sessions" -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo ""
echo "=== 5. Test Registration Lookup (FAZ-test005) ==="
curl -s "$BASE_URL/api/admin/sessions/FAZ-test005" -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
