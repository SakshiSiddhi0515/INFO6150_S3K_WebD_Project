import { Component } from '@angular/core';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  function goToMusicGallery() {
    window.location.href = "musicGallery.html";
}

var audio1 = document.getElementById("myAudio1");
var audio2 = document.getElementById("myAudio2");
var audio3 = document.getElementById("myAudio3");
var audio4 = document.getElementById("myAudio4");

function playSong1() {
    // var audio = document.getElementById("myAudio1");
    audio1.play();
    audio2.pause();
    audio3.pause();
    audio4.pause();
  }

  function playSong2() {
    // var audio = document.getElementById("myAudio2");
    audio2.play();
    audio1.pause();
    audio3.pause();
    audio4.pause();
  }

  function playSong3() {
    // var audio = document.getElementById("myAudio3");
    audio3.play();
    audio1.pause();
    audio2.pause();
    audio4.pause();
  }

  function playSong4() {
    // var audio = document.getElementById("myAudio4");
    audio4.play();
    audio1.pause();
    audio2.pause();
    audio3.pause();
  }

  const songForm = document.getElementById('song-form');
  const songGrid = document.getElementById('song-grid');
  
  // Event listener for the form submission
  songForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const songName = document.getElementById('song-name').value;
    const artistName = document.getElementById('artist-name').value;
    const fileInput = document.getElementById('song-file');
    const file = fileInput.files[0];
  
    // Create a FormData object with the song name, artist name, and file
    const formData = new FormData();
    formData.append('songName', songName);
    formData.append('artistName', artistName);
    formData.append('file', file);
  
    // Send a POST request to the server to upload the file
    fetch('/upload-song', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('Song uploaded successfully');
        // Reload the song grid after the upload is complete
        loadSongGrid();
      } else {
        console.error('Error uploading song');
      }
    });
  });
  
  // Function to load the song grid from the server
  function loadSongGrid() {
    fetch('/get-songs')
      .then(response => response.json())
      .then(songs => {
        songGrid.innerHTML = ''; // Clear the song grid
        songs.forEach(song => {
          const songCard = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${song.name}</h5>
                  <p class="card-text">${song.artist}</p>
                  <audio src="${song.path}" controls></audio>
                </div>
              </div>
            </div>
          `;
          songGrid.insertAdjacentHTML('beforeend', songCard); // Add the song card to the song grid
        });
      });
  }
  
  // Load the song grid when the page is first loaded
  loadSongGrid();
  
}
