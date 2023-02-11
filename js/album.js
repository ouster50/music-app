function render() {
  let cardNode = document.querySelector(`.card`);
  let songsNode = document.querySelector(`.songs`)
  let search = new URLSearchParams(window.location.search);

  let ind = search.get(`i`);

  cardNode.innerHTML = `
      <div class="row">
        <div class="col-4">
          <img src="${albums[ind].img}" alt="" class="playlist-img img-fluid rounded-start">
        </div>
        <div class="col-8">
          <p class="card-text">
            <div class="card-body">
              <h5 class="card-title">${albums[ind].title}</h5>
              <p class="card-text">${albums[ind].description}</p>
              <p class="card-text"><small class="text-muted">${albums[ind].year}</small></p>
            </div>
          </p>
        </div>
      </div>`;

  for (let i = 0; i < songs[ind].names.length; i++) {
    let name = songs[ind].names[i];
    let author = songs[ind].authors[i];
    let _src = songs[ind].srcs[i];
    songsNode.innerHTML += `
    <li class="track list-group-item d-flex align-items-center">
    <audio class="audio" src="music/${_src}.mp3"></audio>
    <div class="row row-cols-3 p-2">
      <div class="col-2"><img class="play-pause-icon me-3" src="assets/play_icon.svg" alt="" class="me-3"></div>
      <div class="col-8">
        <div class="song-text ms-2">
          <p class="song-text name mb-0 mt-3">${name}</p>
          <p class="song-text author"><small class="muted">${author}</small></p>
        </div>
      </div>
      <div class="col-2 me-0">
        <div class="time-text"></div>
      </div>
    </div>
    </li>`;
  }
}

function setupAudio() {
  let trackNodes = document.querySelectorAll(`.track`);
  for (let i = 0; i < trackNodes.length; i++) {
    let node = trackNodes[i];

    let audio = node.querySelector(`.audio`);
    let image = node.querySelector(`.play-pause-icon`);
    let timeNode = node.querySelector(`.time-text`);
    let isPlaying = false;

    function updateProgress() {
      let tm = Math.floor(audio.currentTime);
      let hours = Math.floor(tm / 60);
      let minutes = tm - hours * 60;
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      timeNode.innerHTML = hours + `:` + minutes;
      if (isPlaying) {
        requestAnimationFrame(updateProgress);
      }
    }

    node.addEventListener(`click`, function() {
      if (isPlaying) {
        isPlaying = false;
        audio.pause();
        image.src = `assets/play_icon.svg`;
      } else {
        isPlaying = true;
        audio.play();
        updateProgress();
        image.src = `assets/pause_icon.svg`;
      }
    })
  }
}

render();
setupAudio();
