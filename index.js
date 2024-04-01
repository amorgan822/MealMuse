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

// /* function for checking if task has alread been */
// document.addEventListener('DOMContentLoaded', function() {
//     // Function to fetch the state of the circle from the database
//     function fetchCircleStateFromDatabase(circleName) {
//         // Assume you have an API endpoint to fetch the circle state by name
//         return fetch(`http://localhost:3000/circles?name=${circleName}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Extract the clicked state from the fetched data
//                 return data.clicked; // Assuming 'clicked' is a boolean field indicating whether the circle has been clicked
//             })
//             .catch(error => {
//                 console.error('Error fetching circle state:', error);
//                 throw error;
//             });
//     }

//     // Function to apply the circle state to the corresponding circle element
//     function applyCircleState(circle, isClicked) {
//         if (isClicked) {
//             circle.classList.add('clicked'); // Add 'clicked' class if the circle has been clicked
//         }
//     }

//     // Select all circle elements
//     const circles = document.querySelectorAll('.circle');

//     // Iterate over each circle element and fetch its state from the database
//     circles.forEach(circle => {
//         const circleName = circle.dataset.name; // Assuming you have a 'data-name' attribute on each circle element containing the circle name
//         fetchCircleStateFromDatabase(circleName)
//             .then(isClicked => {
//                 applyCircleState(circle, isClicked); // Apply the fetched state to the circle element
//             })
//             .catch(error => {
//                 console.error('Error processing circle:', error);
//             });
//     });
// });
