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
    const contactNavBtn = document.getElementById('contact-btn');
    const contactSection = document.getElementById('contact-section');

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
          'https://n8n.coennection.xyz/webhook/78370055-b625-4e34-9040-9c40c0cbf64c',
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

// Smooth-scroll behavior for Contact Us nav button
const contactBtn = document.getElementById('contact-btn');
if (contactBtn && contactSection) {
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Section 3: Accordion + dynamic image swapping + responsive repositioning
const section3 = document.querySelector('.section-3');
if (section3) {
  const headers       = section3.querySelectorAll('.accordion__header');
  const panes         = section3.querySelectorAll('.accordion__pane');
  const imgContainer  = section3.querySelector('#section3-img-container');
  const imgElem       = imgContainer.querySelector('img');

  // TODO: replace with your real image URLs, one per accordion item
  const sources = [
    './beachlaptop.avif',
    './beachlaptop.avif',
    './beachlaptop.avif',
    './beachlaptop.avif',
    './beachlaptop.avif',
    './beachlaptop.avif'
  ];

  // Remember desktop placement
  const originalParent      = imgContainer.parentNode;
  const originalNextSibling = imgContainer.nextElementSibling;

  // Find initial active accordion index
  let activeIndex = Array.from(panes).findIndex(p => p.classList.contains('active'));
  if (activeIndex < 0) activeIndex = 0;

  function updateImage(idx) {
    imgElem.src = sources[idx];
    if (window.innerWidth < 992) {
      // Mobile: move under active pane
      const activePane = panes[idx];
      if (imgContainer.parentNode !== activePane) {
        imgContainer.remove();
        activePane.appendChild(imgContainer);
      }
    } else {
      // Desktop: restore to left column
      if (imgContainer.parentNode !== originalParent) {
        imgContainer.remove();
        originalParent.insertBefore(imgContainer, originalNextSibling);
      }
    }
  }

  // Initial render
  updateImage(activeIndex);

  // Wire up clicks
  headers.forEach((h, i) => {
    h.addEventListener('click', () => {
      const wasOpen = panes[i].classList.contains('active');
      panes.forEach(p => p.classList.remove('active'));
      headers.forEach(h2 =>
        h2.querySelector('.accordion__icon').style.transform = 'rotate(0deg)'
      );
      if (!wasOpen) {
        panes[i].classList.add('active');
        h.querySelector('.accordion__icon').style.transform = 'rotate(180deg)';
        activeIndex = i;
      }
      updateImage(activeIndex);
    });
  });

  // Reposition on resize
  window.addEventListener('resize', () => updateImage(activeIndex));
}

    // Function to show the survey
    function showSurvey() {
        // Hide the hero section
        contactNavBtn.style.display = 'none';
        backButton.style.display    = 'inline-block';
                
        document.querySelector('.hero__body').style.display = 'none'; // Hides the hero section
        document.querySelector('.hero__video-container').style.display = 'none'; // Hides the video container

        // Hide other content sections
        document.querySelectorAll('.cta-block').forEach(s => {
            s.style.display = 'none'; // Hides other sections
        });

        // Show the survey container
        document.getElementById('survey-container').style.display = 'block';

        // Toggle button visibility
        contactNavBtn.style.display = 'none'; // Hide the Take Survey button
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
        contactNavBtn.style.display = 'inline-block'; // Show the Take Survey button
    });

    
});