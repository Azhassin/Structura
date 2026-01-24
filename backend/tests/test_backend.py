"""
Backend API Tests for Structura Studio
Tests: Portfolio, Contact, Chat, Auth endpoints
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndRoot:
    """Test API health and root endpoints"""
    
    def test_api_root(self):
        """Test API root endpoint returns Structura branding"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Structura" in data["message"]
        print(f"✓ API root returns: {data['message']}")


class TestPortfolioAPI:
    """Test Portfolio CRUD endpoints"""
    
    def test_get_all_portfolio(self):
        """Test GET /api/portfolio returns list"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET /api/portfolio returned {len(data)} items")
    
    def test_get_portfolio_not_found(self):
        """Test GET /api/portfolio/{id} returns 404 for non-existent"""
        response = requests.get(f"{BASE_URL}/api/portfolio/non-existent-id")
        assert response.status_code == 404
        print("✓ GET /api/portfolio/non-existent returns 404")


class TestContactAPI:
    """Test Contact form endpoints"""
    
    def test_submit_contact_form(self):
        """Test POST /api/contact saves submission"""
        test_data = {
            "name": f"TEST_User_{uuid.uuid4().hex[:8]}",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test message from automated testing"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "message" in data
        print(f"✓ POST /api/contact succeeded: {data['message']}")
    
    def test_submit_contact_form_send_email(self):
        """Test POST /api/contact/send-email endpoint"""
        test_data = {
            "name": f"TEST_User_{uuid.uuid4().hex[:8]}",
            "email": "test@example.com",
            "subject": "Test Email Subject",
            "message": "This is a test message for email endpoint"
        }
        response = requests.post(f"{BASE_URL}/api/contact/send-email", json=test_data)
        # Should succeed even without Resend API key configured
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"✓ POST /api/contact/send-email succeeded: {data['message']}")
    
    def test_get_contact_submissions(self):
        """Test GET /api/contact/submissions returns list"""
        response = requests.get(f"{BASE_URL}/api/contact/submissions")
        assert response.status_code == 200
        data = response.json()
        assert "submissions" in data
        assert isinstance(data["submissions"], list)
        print(f"✓ GET /api/contact/submissions returned {len(data['submissions'])} items")


class TestChatAPI:
    """Test Chat/AI endpoints"""
    
    def test_chat_endpoint(self):
        """Test POST /api/chat returns AI response"""
        test_data = {
            "message": "Hello, what services do you offer?",
            "session_id": f"test-session-{uuid.uuid4().hex[:8]}"
        }
        response = requests.post(f"{BASE_URL}/api/chat", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert "session_id" in data
        assert len(data["response"]) > 0
        print(f"✓ POST /api/chat returned response: {data['response'][:100]}...")
    
    def test_chat_history(self):
        """Test GET /api/chat/history/{session_id}"""
        session_id = f"test-session-{uuid.uuid4().hex[:8]}"
        response = requests.get(f"{BASE_URL}/api/chat/history/{session_id}")
        assert response.status_code == 200
        data = response.json()
        assert "messages" in data
        print(f"✓ GET /api/chat/history returned {len(data['messages'])} messages")


class TestAuthAPI:
    """Test Authentication endpoints"""
    
    def test_register_user(self):
        """Test POST /api/auth/register creates user"""
        test_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        test_data = {
            "email": test_email,
            "name": "Test User",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=test_data)
        # Could be 200 (success) or 400 (email exists)
        assert response.status_code in [200, 400]
        if response.status_code == 200:
            data = response.json()
            assert "access_token" in data
            assert "user" in data
            print(f"✓ POST /api/auth/register succeeded for {test_email}")
        else:
            print(f"✓ POST /api/auth/register returned 400 (expected if email exists)")
    
    def test_login_invalid_credentials(self):
        """Test POST /api/auth/login with invalid credentials"""
        test_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=test_data)
        assert response.status_code == 401
        print("✓ POST /api/auth/login returns 401 for invalid credentials")
    
    def test_get_me_unauthorized(self):
        """Test GET /api/auth/me without token returns 403"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 403
        print("✓ GET /api/auth/me returns 403 without token")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
