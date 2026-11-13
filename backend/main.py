from schema import TaskCreate, TaskUpdate
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)

days = [{"id": 1, "title": "Day 1", "tasks": []}]


def find_day(day_id: int):
    for day in days:
        if day["id"] == day_id:
            return day
    raise HTTPException(status_code=404, detail="Day not found")


@app.get("/days")
def get_days():
    return days


@app.post("/days", status_code=201)
def add_day():
    used_ids = {day["id"] for day in days}

    for number in range(1, 8):
        if number not in used_ids:
            days.append({
                "id": number,
                "title": f"Day {number}",
                "tasks": [],
            })
            return days

    raise HTTPException(status_code=409, detail="The week is full")


@app.delete("/days/{day_id}")
def delete_day(day_id: int):
    days.remove(find_day(day_id))
    return days


@app.post("/days/{day_id}/tasks", status_code=201)
def add_task(day_id: int, data: TaskCreate):
    day = find_day(day_id)
    title = data.title.strip()

    if not title:
        raise HTTPException(status_code=400, detail="Enter a task title")

    day["tasks"].append({
        **data.model_dump(),
        "id": max((task["id"] for task in day["tasks"]), default=0) + 1,
        "title": title,
        "completed": False,
    })
    return days


@app.patch("/days/{day_id}/tasks/{task_id}")
def update_task(day_id: int, task_id: str, data: TaskUpdate):
    day = find_day(day_id)

    for task in day["tasks"]:
        if task["id"] == task_id:
            task.update(data.model_dump(exclude_none=True))
            return days

    raise HTTPException(status_code=404, detail="Task not found")


@app.delete("/days/{day_id}/tasks/{task_id}")
def delete_task(day_id: int, task_id: str):
    day = find_day(day_id)

    for task in day["tasks"]:
        if task["id"] == task_id:
            day["tasks"].remove(task)
            return days

    raise HTTPException(status_code=404, detail="Task not found")