"""Backend API tests for Devishiv Hospital."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://care-hub-lucknow.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
def test_root_ok(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert "Devishiv" in data.get("message", "")


# ---------- Doctors ----------
def test_doctors_returns_five(session):
    r = session.get(f"{API}/doctors")
    assert r.status_code == 200
    data = r.json()
    docs = data["doctors"]
    assert len(docs) == 5
    names = [d["name"] for d in docs]
    expected = [
        "Dr. Renu Lakhtakia",
        "Dr. Sanjai Srivastava",
        "Dr. Sanjay Lakhtakia",
        "Dr. Ashutosh Mishra",
        "Dr. Ranjan Kumar",
    ]
    for n in expected:
        assert n in names


def test_doctor_credentials(session):
    r = session.get(f"{API}/doctors")
    docs = {d["name"]: d for d in r.json()["doctors"]}
    assert docs["Dr. Renu Lakhtakia"]["credentials"] == "MBBS, MD, MRCOG (London)"
    assert docs["Dr. Sanjai Srivastava"]["credentials"] == "MS, DNB, MCh (Gastro Surgery, SGPGI)"
    assert docs["Dr. Sanjay Lakhtakia"]["credentials"] == "MD (Medicine)"
    assert docs["Dr. Ashutosh Mishra"]["credentials"] == "MBBS, DCH"
    assert docs["Dr. Ranjan Kumar"]["credentials"] == "MBBS, MS (Orthopaedics)"


# ---------- Contact ----------
def test_contact_create_and_persist(session):
    payload = {
        "name": "TEST_Contact User",
        "phone": "9999988888",
        "email": "test_contact@example.com",
        "message": "This is a test message from automated tests."
    }
    r = session.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data and len(data["id"]) > 0

    # Verify persistence via GET
    r2 = session.get(f"{API}/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert any(i["id"] == data["id"] for i in items)


def test_contact_invalid_email(session):
    payload = {
        "name": "Bad Email",
        "phone": "9999988888",
        "email": "not-an-email",
        "message": "Bad email test"
    }
    r = session.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_contact_missing_email(session):
    payload = {
        "name": "No Email",
        "phone": "9999988888",
        "message": "missing email"
    }
    r = session.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_contact_missing_name(session):
    r = session.post(f"{API}/contact", json={
        "phone": "9999988888", "email": "a@b.com", "message": "ok ok"
    })
    assert r.status_code == 422


# ---------- Appointments ----------
def test_appointment_create_and_persist(session):
    payload = {
        "patient_name": "TEST_Patient",
        "phone": "9999988888",
        "email": "test_pt@example.com",
        "doctor": "Dr. Renu Lakhtakia",
        "date": "2026-06-15",
        "time_slot": "10:00 AM",
        "reason": "Routine check"
    }
    r = session.post(f"{API}/appointments", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["patient_name"] == payload["patient_name"]
    assert data["doctor"] == payload["doctor"]
    assert data["status"] == "pending"
    assert "id" in data

    # Verify persistence
    r2 = session.get(f"{API}/appointments")
    assert r2.status_code == 200
    assert any(a["id"] == data["id"] for a in r2.json())


def test_appointment_missing_doctor(session):
    payload = {
        "patient_name": "TEST_Patient2",
        "phone": "9999988888",
        "date": "2026-06-15",
        "time_slot": "10:00 AM",
    }
    r = session.post(f"{API}/appointments", json=payload)
    assert r.status_code == 422


def test_appointment_missing_required(session):
    r = session.post(f"{API}/appointments", json={"patient_name": "x"})
    assert r.status_code == 422


def test_appointment_optional_email_none(session):
    payload = {
        "patient_name": "TEST_NoEmail",
        "phone": "9999988888",
        "doctor": "Dr. Ashutosh Mishra",
        "date": "2026-07-15",
        "time_slot": "11:00 AM",
    }
    r = session.post(f"{API}/appointments", json=payload)
    assert r.status_code == 200, r.text
