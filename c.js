document.addEventListener("DOMContentLoaded", function () {
    // Elements Selection
    const taskContainer = document.getElementById("taskContainer");
    const activityLog = document.getElementById("activityLog");
    const assignedTasks = document.getElementById("assignedTasks");
    const taskCount = document.getElementById("taskCount");
    const clearHistory = document.getElementById("clearHistory");
    const colorChangeBtn = document.getElementById("colorChangeBtn");
    const mainBody = document.getElementById("mainBody");

    let colors = ["bg-gray-100", "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-red-100"];
    let currentIndex = 0;

    // Background Color Change
    function changeBackgroundColor() {
        mainBody.classList.remove(...colors);
        currentIndex = (currentIndex + 1) % colors.length;
        mainBody.classList.add(colors[currentIndex]);
    }

    // Task Completion Handler
    function completeTask(event) {
        if (event.target.classList.contains("complete-btn")) {
            if (!event.target.classList.contains("bg-gray-300")) {
                event.target.classList.replace("bg-blue-500", "bg-gray-300");
                event.target.innerText = "Completed";

                let taskName = event.target.closest("div").querySelector("h2").innerText;
                logActivity(`Task Completed: <b>${taskName}</b> at ${new Date().toLocaleTimeString()}`);

                updateTaskCounters();
            }
        }
    }

    // Update Task Counters
    function updateTaskCounters() {
        let currentTasks = parseInt(assignedTasks.innerText) || 0;
        let completedCount = parseInt(taskCount.innerText) || 0;

        if (currentTasks > 0) {
            assignedTasks.innerText = currentTasks - 1;
        }
        taskCount.innerText = completedCount + 1;
    }

    // Log Activity
    function logActivity(message) {
        let logEntry = document.createElement("p");
        logEntry.classList.add("text-gray-600", "mt-2");
        logEntry.innerHTML = message;
        activityLog.appendChild(logEntry);
    }

    // Clear Activity Log
    function clearActivityLog() {
        activityLog.innerHTML = "<p class='text-gray-400'>No activity yet...</p>";
    }

    // Event Listeners
    colorChangeBtn.addEventListener("click", changeBackgroundColor);
    taskContainer.addEventListener("click", completeTask);
    clearHistory.addEventListener("click", clearActivityLog);
});
