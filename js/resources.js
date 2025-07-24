// Resources page JavaScript functionality

// Function to open YouTube videos with fallback handling
function openYouTubeVideo(youtubeUrl) {
  console.log('openYouTubeVideo called with URL:', youtubeUrl);
  
  // Extract video ID from YouTube URL
  const videoId = extractYouTubeVideoId(youtubeUrl);
  if (!videoId) {
    console.error('Could not extract video ID from URL:', youtubeUrl);
    // Fallback to direct link
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    return;
  }
  
  // Try to open embedded video, with fallback to direct link
  openEmbeddedVideoWithFallback(videoId, youtubeUrl);
}

// Function to extract YouTube video ID from URL
function extractYouTubeVideoId(url) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to open embedded YouTube video with fallback
function openEmbeddedVideoWithFallback(videoId, originalUrl) {
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  const videoTitle = document.getElementById('videoTitle');
  
  // Set title based on video ID
  const titles = {
    'tcF62_Xhf1s': 'Getting Started with AI',
    'Ik2rAKROVbI': 'Building ML Pipelines',
    'MiiANxRHSv4': 'Data Visualization Tutorial'
  };
  videoTitle.textContent = titles[videoId] || 'Video Tutorial';
  
  // Create container with both embed attempt and fallback
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  videoContainer.innerHTML = `
    <div class="text-center mb-4">
      <p class="text-gray-600 mb-4">Loading video...</p>
      <div id="embedContainer">
        <iframe 
          id="youtubeEmbed"
          width="100%" 
          height="400" 
          src="${embedUrl}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          class="rounded-lg"
          onload="handleEmbedSuccess()"
          onerror="handleEmbedError('${originalUrl}')">
        </iframe>
      </div>
      <div id="fallbackContainer" class="hidden">
        <div class="bg-gray-100 rounded-lg p-8 text-center">
          <div class="mb-4">
            <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-2xl">!</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Video Embed Blocked</h3>
            <p class="text-gray-600 mb-4">Due to security settings, the video cannot be embedded. Click below to watch on YouTube.</p>
            <a href="${originalUrl}" target="_blank" rel="noopener,noreferrer" 
               class="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
              ▶ Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Set a timeout to check if embed loaded successfully
  setTimeout(() => {
    checkEmbedStatus(originalUrl);
  }, 3000);
}

// Function to handle successful embed loading
function handleEmbedSuccess() {
  console.log('YouTube embed loaded successfully');
  const loadingText = document.querySelector('#videoContainer p');
  if (loadingText) loadingText.style.display = 'none';
}

// Function to handle embed errors
function handleEmbedError(originalUrl) {
  console.log('YouTube embed failed, showing fallback');
  showFallback(originalUrl);
}

// Function to check embed status and show fallback if needed
function checkEmbedStatus(originalUrl) {
  const iframe = document.getElementById('youtubeEmbed');
  if (iframe) {
    try {
      // Try to access iframe content to see if it loaded
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (!iframeDoc || iframeDoc.body.innerHTML === '') {
        showFallback(originalUrl);
      } else {
        const loadingText = document.querySelector('#videoContainer p');
        if (loadingText) loadingText.style.display = 'none';
      }
    } catch (e) {
      // Cross-origin restrictions mean embed is working
      const loadingText = document.querySelector('#videoContainer p');
      if (loadingText) loadingText.style.display = 'none';
    }
  }
}

// Function to show fallback option
function showFallback(originalUrl) {
  const embedContainer = document.getElementById('embedContainer');
  const fallbackContainer = document.getElementById('fallbackContainer');
  const loadingText = document.querySelector('#videoContainer p');
  
  if (embedContainer) embedContainer.style.display = 'none';
  if (fallbackContainer) fallbackContainer.classList.remove('hidden');
  if (loadingText) loadingText.style.display = 'none';
}

// Keep the existing modal functionality for potential future use
function openVideoModal(videoSrc, title) {
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');
  const videoTitle = document.getElementById('videoTitle');
  
  if (videoSource) videoSource.src = videoSrc;
  if (videoTitle) videoTitle.textContent = title;
  if (videoPlayer) videoPlayer.load(); // Reload the video element
  modal.classList.remove('hidden');
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  
  // Clear the iframe to stop the video
  if (videoContainer) videoContainer.innerHTML = '';
  modal.classList.add('hidden');
  
  // Restore body scrolling
  document.body.style.overflow = 'auto';
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Close modal when clicking outside the video container
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeVideoModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });

  // Add hover effects to video thumbnails
  const thumbnails = document.querySelectorAll('.video-thumbnail');
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    thumbnail.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});