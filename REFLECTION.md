# Daily Task Tracker Reflection

I created this tool to help me organize my main daily tasks for the week. I used the React template provided in Phase 1 of the frontend development assignment and adjusted some CSS styles to change its appearance.

## Request journey

When I add a task, React collects the form values and sends them as JSON to FastAPI through a POST request. The backend validates the data, adds the task, and returns the updated days. React then uses setDays to update the screen. When the application opens, useEffect sends a GET request to /days to load the planner.

## Props versus state

State stores information that changes, such as the days, form inputs, loading status, and which task form is open. Props pass data and functions from a parent component to a child component. For example, TaskCard receives a task and functions such as onToggle and onDelete through props.

## Frontend versus backend validation

The frontend uses isValidTask to check that the title and topic are not blank and that the time is a positive integer. If the input is invalid, the form shows an error message and does not send the request.

The backend validates the request again because data can also come from tools such as Postman. For example, the task endpoint returns a 400 response for an empty or spaces-only title without adding a task.

## One bug I worked on

In App.jsx, saveChange called setError, but the error state was missing. This could stop an action before the request reached the backend. The fix was to add const [error, setError] = useState("") and display the error message when a request failed.

## Refresh versus backend restart

Refreshing the browser resets React state and sends GET /days again. The tasks appear again because they are still stored in the running backend. Restarting the backend resets the data stored in Python memory, so added tasks disappear.