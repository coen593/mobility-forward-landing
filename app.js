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

 // ─── Contact form + reCAPTCHA v3 ─────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  // wait for the reCAPTCHA library to finish loading
  grecaptcha.ready(() => {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        // 1) Execute reCAPTCHA v3 and get the token
        const token = await grecaptcha.execute(
          '6Leur1QrAAAAAN2JmDO5Fvoy2cayo4C6nYcDZE6D', 
          { action: 'submit' }
        );

        // 2) Build payload from form fields
        const formData = new FormData(contactForm);
        const payload = {};
        formData.forEach((value, key) => {
          payload[key] = value;
        });
        payload['g-recaptcha-response'] = token;

        // 3) Send to your n8n webhook
        const response = await fetch(
          'https://n8n.coennection.xyz/webhook-test/78370055-b625-4e34-9040-9c40c0cbf64c',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        // 4) Success feedback
        alert('Thank you! Your message has been sent.');
        contactForm.reset();

      } catch (err) {
        console.error('Contact form error:', err);
        alert('Oops—something went wrong. Please try again.');
      }
    });
  });
}

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

    // Section 3 Accordion logic
    const section3Headers = document.querySelectorAll('.section-3 .accordion__header');
    const section3Panes   = document.querySelectorAll('.section-3 .accordion__pane');
    section3Headers.forEach((header, i) => {
      header.addEventListener('click', () => {
        const isOpen = section3Panes[i].classList.contains('active');
        section3Panes.forEach(p => p.classList.remove('active'));
        section3Headers.forEach(h => h.querySelector('.accordion__icon').style.transform = 'rotate(0deg)');
        if (!isOpen) {
          section3Panes[i].classList.add('active');
          header.querySelector('.accordion__icon').style.transform = 'rotate(180deg)';
        }
      });
    });
});