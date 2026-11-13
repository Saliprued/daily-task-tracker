from typing import Literal
from pydantic import BaseModel, Field

class TaskCreate(BaseModel):
    title: str 
    minutes: int = Field(gt=0)
    topic: str = Field(min_length=1)
    priority: Literal["High", "Medium", "Low"] = "Medium"


class TaskUpdate(BaseModel):
    minutes: int | None = Field(default=None, gt=0)
    completed: bool | None = None