// JavaScript code to toggle the visibility of the navigation menu
document.addEventListener('DOMContentLoaded', function () {
    let navigation = document.querySelector('.toggle-menu');
    let navigating = false;
    let navBar = document.querySelector('header nav ul');
    let header = document.querySelector('header'); // Select the header element

    navigation.addEventListener('click', function () {
        navigating = !navigating;
        navBar.classList.toggle('show');
        header.classList.toggle('dark-bg');

        if (navigating) {
            navigation.innerHTML = 'X';
        } else {
            navigation.innerHTML = '&#9776;';
        }
    });

    // Add a scroll event listener to the window object
    window.addEventListener('scroll', function () {
        // Check if the scroll position is greater than 50px
        if (window.scrollY > 50) {
            // If it is, add the 'dark-bg' class to the header element
            header.classList.add('dark-bg');
        } else {
            // Otherwise, remove the 'dark-bg' class from the header element
            header.classList.remove('dark-bg');
        }
    });

    // Select all the links in the navigation menu
    // let links = document.querySelectorAll('.nav-link');
    // links.forEach(function (link) {
    //     // Add a click event listener to each link
    //     link.addEventListener('click', function () {
    //         // Remove the 'show' class from the navigation menu
    //         // navBar.classList.remove('show');
    //         // header.classList.remove('dark-bg');
    //         // navigation.innerHTML = '&#9776;';

    //         links.forEach(function (el) {
    //             el.classList.remove('active');
    //         });
    //         this.classList.add('active');
    //     });
    // }

});

// document.querySelector('.toggle-menu').addEventListener('click', function () {
//     console.log("Navigation clicked");
//     document.querySelector('nav ul').classList.toggle('show');
// });