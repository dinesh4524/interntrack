import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.seed import seed_database

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    seed_database()

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_demo_login():
    response = client.post("/auth/login", json={
        "email": "demo@interntrack.com",
        "password": "Demo@12345"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "demo@interntrack.com"

def test_opportunities_list():
    response = client.get("/opportunities")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert len(data["items"]) > 0

def test_eligibility_check():
    # Fetch first opportunity
    opps = client.get("/opportunities").json()["items"]
    first_opp_id = opps[0]["id"]

    response = client.post("/eligibility/check", json={
        "opportunity_id": first_opp_id,
        "branch": "Cyber Security",
        "cgpa": 8.48,
        "graduation_year": 2028,
        "skills": ["Python", "Linux", "Networking", "Cybersecurity"]
    })
    assert response.status_code == 200
    data = response.json()
    assert "match_percentage" in data
    assert "eligible" in data
    assert data["match_percentage"] > 70
