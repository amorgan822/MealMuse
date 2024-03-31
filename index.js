// JavaScript code to toggle the visibility of the navigation menu
function toggleCircle(circle) {
    if (!circle.classList.contains('clicked')) {
        var checkmark = circle.querySelector('i');
        checkmark.classList.toggle('show');
        circle.classList.toggle('clicked'); // Toggle the 'clicked' class
        console.log(updateUserPoints("Joanna", 5));
    }
}


// Function to find user by name
function findUserByName(name) {
    return fetch(`http://localhost:3000/users?name=${name}`)
        .then(response => response.json())
        .catch(error => console.error('Error finding user:', error));
}

// Function to find user by name
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
        })
        .catch(error => {
            console.error('Error updating user points:', error);
            throw error; // Rethrow the error to propagate it further if needed
        });
}
