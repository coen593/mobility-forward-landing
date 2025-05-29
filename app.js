// videoControl.js

var video = document.getElementById('my-video');

// Function to play the video
function playVideo() {
    video.play();
}

// Start playing the video initially
playVideo();

document.addEventListener('DOMContentLoaded', function() {
    const surveyButtons = document.querySelectorAll('.survey-btn');
    const backButton = document.getElementById('back-btn');
    const surveyButton = document.getElementById('survey-btn');
    // Function to show the survey
    function showSurvey() {
        // Hide the hero section
        document.querySelector('.hero__body').style.display = 'none'; // Hides the hero section
        document.querySelector('.hero__video-container').style.display = 'none'; // Hides the video container

        // Hide other content sections
        document.querySelectorAll('.cta-block').forEach(s => {
            s.style.display = 'none'; // Hides other sections
        });

        // Show the survey container
        document.getElementById('survey-container').style.display = 'block';

        // Toggle button visibility
        surveyButton.style.display = 'none'; // Hide the Take Survey button
        backButton.style.display = 'inline-block'; // Show the Back button
    }

    surveyButtons.forEach(button =>{
        button.addEventListener('click', showSurvey);
    })

    backButton.addEventListener('click', function() {
        // Show the hero section and other content again
        document.querySelector('.hero__body').style.display = 'block'; // Show the hero section
        document.querySelector('.hero__video-container').style.display = 'block'; // Show the video container

        // Show other content sections
        document.querySelectorAll('.cta-block').forEach(s => {
            s.style.display = 'block'; // Show other sections
        });

        // Hide the survey container
        document.getElementById('survey-container').style.display = 'none'; // Hide the survey

        // Toggle button visibility
        backButton.style.display = 'none'; // Hide the Back button
        surveyButton.style.display = 'inline-block'; // Show the Take Survey button
    });
});