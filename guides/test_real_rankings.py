#!/usr/bin/env python3
"""
Quick test script to verify DataForSEO API integration works correctly.
Tests a single keyword to ensure real rankings are being fetched.
"""

import os
import sys
import base64
import requests
from pathlib import Path

# Add parent directory to path to import from google_ranking_tracker
sys.path.insert(0, str(Path(__file__).parent))

# Configuration
WEBSITE_URL = "https://customsportslockers.com/"
LOCATION_NAME = "United States"
LANGUAGE_CODE = "en"

def test_single_keyword():
    """Test checking a single keyword to verify API works."""
    
    # Get credentials
    login = os.getenv("DATAFORSEO_LOGIN")
    password = os.getenv("DATAFORSEO_PASSWORD")
    
    if not login or not password:
        print("❌ ERROR: DataForSEO credentials not found!")
        print("\nSet environment variables:")
        print("  export DATAFORSEO_LOGIN='your_login'")
        print("  export DATAFORSEO_PASSWORD='your_password'")
        return False
    
    print("✅ Credentials found")
    print(f"   Login: {login[:10]}...")
    print()
    
    # Test keyword
    test_keyword = "hockey lockers"
    print(f"🔍 Testing keyword: '{test_keyword}'")
    print(f"🌐 Website: {WEBSITE_URL}")
    print(f"📍 Location: {LOCATION_NAME}")
    print()
    
    # API endpoint
    api_url = "https://api.dataforseo.com/v3/serp/google/organic/live/advanced"
    
    # Basic authentication
    credentials = f"{login}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/json"
    }
    
    # Prepare payload
    payload = [{
        "keyword": test_keyword,
        "location_name": LOCATION_NAME,
        "language_code": LANGUAGE_CODE,
        "depth": 100,
        "device": "desktop",
        "os": "windows"
    }]
    
    try:
        print("📡 Sending API request...")
        response = requests.post(api_url, json=payload, headers=headers)
        
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check response structure
            if isinstance(data, list) and len(data) > 0:
                response_obj = data[0]
                
                if "tasks" in response_obj and len(response_obj["tasks"]) > 0:
                    task = response_obj["tasks"][0]
                    
                    if "result" in task and len(task["result"]) > 0:
                        result = task["result"][0]
                        
                        if "items" in result:
                            items = result["items"]
                            print(f"   ✅ Found {len(items)} SERP items")
                            
                            # Extract domain
                            domain = WEBSITE_URL.replace("https://", "").replace("http://", "").replace("www.", "").rstrip("/")
                            
                            # Find our ranking
                            found = False
                            for item in items:
                                if item.get("type") == "organic":
                                    item_domain = item.get("domain", "").lower()
                                    item_url = item.get("url", "").lower()
                                    
                                    if domain.lower() in item_domain or domain.lower() in item_url:
                                        rank = item.get("rank_absolute")
                                        print()
                                        print("=" * 60)
                                        print(f"🎉 SUCCESS! Found your site ranking:")
                                        print(f"   Position: #{rank}")
                                        print(f"   Domain: {item.get('domain')}")
                                        print(f"   URL: {item.get('url')}")
                                        print(f"   Title: {item.get('title', 'N/A')}")
                                        print("=" * 60)
                                        found = True
                                        break
                            
                            if not found:
                                print()
                                print("⚠️  Your site not found in top 100 results")
                                print("   Showing top 5 results:")
                                organic_count = 0
                                for item in items:
                                    if item.get("type") == "organic":
                                        organic_count += 1
                                        print(f"   #{item.get('rank_absolute')}: {item.get('domain')} - {item.get('title', 'N/A')[:60]}")
                                        if organic_count >= 5:
                                            break
                            
                            return True
                        else:
                            print("   ⚠️  No 'items' found in result")
                    else:
                        print("   ⚠️  No 'result' found in task")
                else:
                    print("   ⚠️  No 'tasks' found in response")
            else:
                print("   ⚠️  Unexpected response format")
                print(f"   Response: {str(data)[:500]}")
        else:
            print(f"   ❌ API Error: {response.status_code}")
            print(f"   Response: {response.text[:500]}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
    
    return False

if __name__ == "__main__":
    print("=" * 60)
    print("DataForSEO API Integration Test")
    print("=" * 60)
    print()
    
    success = test_single_keyword()
    
    print()
    if success:
        print("✅ API integration is working correctly!")
        print("   You can now run: python guides/google_ranking_tracker.py")
    else:
        print("❌ API integration test failed")
        print("   Check your credentials and try again")
    print()
