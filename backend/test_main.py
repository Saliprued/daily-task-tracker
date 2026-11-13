from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_spaces_only_title_does_not_add_task():
    day = client.get("/days").json()[0]
    before = len(day["tasks"])

    response = client.post(
        f"/days/{day['id']}/tasks",
        json={
            "title": "   ",
            "minutes": 30,
            "topic": "Study",
            "priority": "High",
        },
    )

    assert response.status_code == 400

    days = client.get("/days").json()
    updated_day = next(d for d in days if d["id"] == day["id"])

    assert len(updated_day["tasks"]) == before