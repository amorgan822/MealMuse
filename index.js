// import { JSConfetti } from 'js-confetti'

// toggle debug mode
debugMode = true;

// toggle db mode
dbMode = false;

// Select current user
userName = "Joanna"

backDish = false;

// const canvas = document.querySelector('#confetti');

// const jsConfetti = new JSConfetti();

// Function to toggle circle on homepage upon task completion
function toggleCircle(circle) {
    if (!circle.classList.contains('clicked')) {
        var checkmark = circle.querySelector('i');
        checkmark.classList.toggle('show');
        circle.classList.toggle('clicked'); // Toggle the 'clicked' class

        // jsConfetti.addConfetti();
        makeItRain();

        if (dbMode) {
            updateUserPoints("Joanna", 5)

            // toggle completed status for circle in database
            updateTaskStatus(circle.dataset.name, 1)
        }

    } else if (debugMode) { // special debug mode case - allows tasks to be unchecked
        var checkmark = circle.querySelector('i');
        checkmark.classList.toggle('show');
        circle.classList.toggle('clicked'); // Toggle the 'clicked' class

        if (dbMode) {
            updateUserPoints("Joanna", -5)
            updateTaskStatus(circle.dataset.name, 0)
        }
    }
}

// function to complete recipe on any page
function toggleComplete(button) {
    if (!button.classList.contains('clicked')) {
        button.classList.toggle('clicked'); // Toggle the 'clicked' class
        button.innerHTML = "completed";

        if (dbMode) {
            updateUserPoints("Joanna", 5)
            // toggle completed status for circle in database
            updateTaskStatus(button.dataset.name, 1)
        }

    } else if (debugMode) { // special debug mode case - allows tasks to be unchecked
        button.classList.toggle('clicked'); // Toggle the 'clicked' class
        button.innerHTML = "complete";

        if (dbMode) {
            updateUserPoints("Joanna", -5)
            updateTaskStatus(button.dataset.name, 0)
        }
    }
}

// /* function for checks on load page */
document.addEventListener('DOMContentLoaded', function () {
    // Display current username
    const users = document.querySelectorAll('.userText');
    users.forEach(user => {
        user.innerHTML = userName;
    });

    if (dbMode) {
        // Display current user's points
        updateUserPointsToUserBar()
        updateCompleteStates();
        updateAllTaskPoints();
    }
});


// DATABASE INTERACTIONS

//USER

// Function to get user by name
function findUserByName(name) {
    return fetch(`http://localhost:3000/users?name=${name}`)
        .then(response => response.json())
        .catch(error => console.error('Error finding user:', error));
}

// Function to get user's points
function getUserPoints(name) {
    return fetch(`http://localhost:3000/users?name=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            if (users.length > 0) {
                return users[0].points; // Return points of the first matching user
            } else {
                throw new Error('User not found');
            }
        })
        .catch(error => {
            console.error('Error finding user:', error);
            throw error; // Rethrow the error to propagate it further if needed
        });
}

// Function to add to or subtract from user's points
function updateUserPoints(name, pointsToAdd) {
    // Fetch user by name to get their current points
    return fetch(`http://localhost:3000/users?name=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            if (users.length > 0) {
                const user = users[0];
                const userId = user.id;
                const currentPoints = user.points;
                const newPoints = currentPoints + pointsToAdd;

                // Construct patch object with new points
                const patchData = { points: newPoints };

                // Update user's points in the database using PATCH request
                return fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(patchData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update user points');
                        }
                        return response.json();
                    });
            } else {
                throw new Error('User not found');
            }
        }).then(() => {
            // display user points to user bar
            updateUserPointsToUserBar()
        })
        .catch(error => {
            console.error('Error updating user points:', error);
            throw error; // Rethrow the error to propagate it further if needed
        });
}

// Function to display user points
function updateUserPointsToUserBar() {
    getUserPoints(userName).then(points => {

        const pointList = document.querySelectorAll('.userPoints');
        pointList.forEach(num => {
            num.innerHTML = points;
        });
    }).catch(e => {
        if (e.message == "Failed to fetch") {
            updateUserPointsToUserBar()
        }
    });
}

//TASKS

// Function to get the current status of the task
function getTaskStatus(name) {
    // Assume you have an API endpoint to fetch the circle state by name
    return fetch(`http://localhost:3000/tasks?name=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => {
            if (tasks.length > 0) {
                return tasks[0].status; // Return status of first matching task
            } else {
                throw new Error('Task not found');
            }
        })
        .catch(error => {
            console.error('Error fetching task status:', error);
            throw error;
        });
}

// Function to update the current status of the task
function updateTaskStatus(name, bool) {
    // Assume you have an API endpoint to fetch the circle state by name
    return fetch(`http://localhost:3000/tasks?name=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => {
            if (tasks.length > 0) {
                const task = tasks[0];
                const taskId = task.id;
                const patchData = { status: bool };

                // Update status of task in the database using PATCH request
                return fetch(`http://localhost:3000/tasks/${taskId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(patchData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update user points');
                        }
                        return response.json();
                    });
            } else {
                throw new Error('Task not found');
            }
        })
        .catch(error => {
            console.error('Error fetching task status:', error);
            throw error;
        });
}

// Function to get the points of the task
function getTaskPoints(name) {
    // Assume you have an API endpoint to fetch the circle state by name
    return fetch(`http://localhost:3000/tasks?name=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => {
            if (tasks.length > 0) {
                return tasks[0].points; // Return points of first matching task
            } else {
                throw new Error('Task not found');
            }
        })
        .catch(error => {
            console.error('Error fetching task status:', error);
            throw error;
        });
}

// Function to display user points
function updateAllTaskPoints() {
    const pointList = document.querySelectorAll('.taskPts');

    pointList.forEach(taskElement => {
        getTaskPoints(taskElement.dataset.name).then(points => {
            taskElement.innerHTML = points;
        }).catch(e => {
            if (e.message == "Failed to fetch") {
                updateUserPointsToUserBar()
            }
        });

    });





}

// Function to apply circle and complete states
function updateCompleteStates() {
    // Select all circle elements
    const circles = document.querySelectorAll('.circle');

    // Select all complete elements
    const completes = document.querySelectorAll('.complete');

    // Iterate over each circle element and fetch its state from the database

    circles.forEach(circle => {
        const task = circle.dataset.name; // Assuming you have a 'data-name' attribute on each circle element containing the circle name
        getTaskStatus(task)
            .then(isClicked => {
                applyCircleState(circle, isClicked); // Apply the fetched state to the circle element
            })
            .catch(error => {
                console.error('Error processing circle:', error);
            });
    });

    completes.forEach(complete => {
        const task = complete.dataset.name; // Assuming you have a 'data-name' attribute on each circle element containing the circle name
        getTaskStatus(task)
            .then(isClicked => {
                applyCompleteState(complete, isClicked); // Apply the fetched state to the circle element
            })
            .catch(error => {
                console.error('Error processing circle:', error);
            });
    });
}

//HELPER FUNCTIONS
// Function to apply the circle state to the corresponding circle element
function applyCircleState(circle, isClicked) {
    if (isClicked) {
        circle.classList.add('clicked'); // Add 'clicked' class if the circle has been clicked
        var checkmark = circle.querySelector('i');
        checkmark.classList.toggle('show');
    }
}

function applyCompleteState(complete, isClicked) {
    if (isClicked) {
        complete.classList.add('clicked'); // Add 'clicked' class if the circle has been clicked
        complete.innerHTML = "completed"
    }
}

function makeItRain() {
    // var end = Date.now() + (2 * 1000);

    function frame() {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.6 },
        });
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.6 },
        });

        // if (Date.now() < end) {
        //     requestAnimationFrame(frame);
        // }
    };
    frame();
}