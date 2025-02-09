console.log("Welcome To Spotify");

// Initialize Variables
let songs = [
  {
    songName: "Tum Bin Jaoon Kaha",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Meri Bheegi Bheegi Si",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Agar Tum Na Hote",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Chalte Chalte",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Dil Aisa Kisine Mera Toda",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Ek Ajnabee Haseena",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Isse Pehle Ke Yaad Tu Aaye",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Ke Pag Ghunghroo",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Saagar Jaisi Aankhonwali",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Neele Neele Ambar",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

let previous = document.querySelector("#previous");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let gif = document.querySelector("#gif");
let barTimeStart = document.querySelector("#bar-time-start");
let barTimeEnd = document.querySelector("#bar-time-end");
let myProgressBar = document.querySelector("#myProgressBar");
let bottomTitle = document.querySelector(".bottom-title");
let allPlay = document.querySelectorAll(".all-play");
let allImage = document.querySelectorAll("img");

let songIndex = Math.floor(Math.random() * 10);
let totalDuration;
let totalMinute;
let totalSecond;
let currentDuration = 1;
let currentMinute;
let currentSecond;
let intervalId;
let titleTrack = songIndex;

let currentSong = new Audio(`${songs[songIndex].filePath}`);

// Calculate Durations
const durationOfEachSongs = (currentSong, endTime) => {
  currentSong.addEventListener("loadedmetadata", () => {
    bottomTitle.textContent = songs[songIndex].songName;
    totalDuration = Math.floor(currentSong.duration);
    myProgressBar.max = totalDuration;
    totalMinute = Math.floor(totalDuration / 60);
    totalSecond = Math.floor(totalDuration % 60);
    if (totalDuration < 10) {
      endTime.textContent = `00:0${totalSecond}`;
    } else if (totalDuration < 60) {
      endTime.textContent = `00:${totalSecond}`;
    } else if (totalDuration < 600) {
      if (totalSecond < 10) {
        endTime.textContent = `0${totalMinute}:0${totalSecond}`;
      } else {
        endTime.textContent = `0${totalMinute}:${totalSecond}`;
      }
    } else {
      if (totalSecond < 10) {
        endTime.textContent = `${totalMinute}:0${totalSecond}`;
      } else {
        endTime.textContent = `${totalMinute}:${totalSecond}`;
      }
    }
  });
  currentSong.load();
};

durationOfEachSongs(currentSong, barTimeEnd);

const addColor = () => {
  allPlay.forEach((playElement) => {
    let playId = playElement.getAttribute("id");
    if (playId == songIndex) {
      playElement.classList.remove("fa-play-circle");
      playElement.classList.add("fa-pause-circle");
      playElement.style.transition = " all 0.3s linear";
      playElement.classList.add("add-color");
    }
  });
  title.forEach((playTitle) => {
    let titleId = playTitle.getAttribute("myAttribute");
    if (titleId == songIndex) {
      playTitle.style.transition = " all 0.3s linear";
      playTitle.classList.add("add-color");
    }
  });
  durationPlay.forEach((playDuration) => {
    let durationId = playDuration.getAttribute("myAttribute");
    if (durationId == songIndex) {
      playDuration.style.transition = " all 0.3s linear";
      playDuration.classList.add("add-color");
    }
  });
  allImage.forEach((eachImage) => {
    let imageId = eachImage.getAttribute("myAttribute");
    if (imageId == songIndex) {
      eachImage.classList.add("add-animation");
      eachImage.style.transition = " all 0.3s linear";
    }
  });
};
const removeColor = () => {
  allPlay.forEach((playElement) => {
    let playId = playElement.getAttribute("id");
    if (playId == songIndex) {
      playElement.classList.remove("fa-pause-circle");
      playElement.classList.add("fa-play-circle");
      playElement.style.transition = " all 0.3s linear";
      playElement.classList.remove("add-color");
    }
  });
  title.forEach((playTitle) => {
    let titleId = playTitle.getAttribute("myAttribute");
    if (titleId == songIndex) {
      playTitle.style.transition = " all 0.3s linear";
      playTitle.classList.remove("add-color");
    }
  });
  durationPlay.forEach((playDuration) => {
    let durationId = playDuration.getAttribute("myAttribute");
    if (durationId == songIndex) {
      playDuration.style.transition = " all 0.3s linear";
      playDuration.classList.remove("add-color");
    }
  });
  allImage.forEach((eachImage) => {
    let imageId = eachImage.getAttribute("myAttribute");
    if (imageId == songIndex) {
      eachImage.style.transition = " all 0.3s linear";
      eachImage.classList.remove("add-animation");
    }
  });
};

// Handle Play/Pause Click
const handlePlayPause = (playSong) => {
  playSong.addEventListener("click", () => {
    if (currentSong.paused || currentSong.currentTime <= 0) {
      addColor();
      bottomTitle.textContent = songs[songIndex].songName;
      currentSong.play();
      playSong.classList.remove("fa-play-circle");
      playSong.classList.add("fa-pause-circle");
      gif.style.opacity = "1";
      updateCurrentDuration();
    } else {
      removeColor();
      clearInterval(intervalId);
      currentSong.pause();
      playSong.classList.remove("fa-pause-circle");
      playSong.classList.add("fa-play-circle");
      gif.style.opacity = "0";
    }
  });
};

handlePlayPause(play);

// Update Progress Bar
const updateCurrentDuration = () => {
  intervalId = setInterval(() => {
    if (currentDuration >= totalDuration) {
      clearInterval(intervalId);
      currentDuration = 0;
      if (songIndex >= 0 && songIndex < songs.length - 1) {
        removeColor();
        bottomTitle.textContent = songs[++titleTrack].songName;
        let newAudio = new Audio(`${songs[++songIndex].filePath}`);
        durationOfEachSongs(newAudio, barTimeEnd);
        updateCurrentDuration();
        newAudio.play();
        currentSong = newAudio;
        addColor();
      } else {
        removeColor();
        titleTrack = 0;
        songIndex = 0;
        bottomTitle.textContent = songs[titleTrack].songName;
        let newAudio = new Audio(`${songs[songIndex].filePath}`);
        durationOfEachSongs(newAudio, barTimeEnd);
        updateCurrentDuration();
        newAudio.play();
        currentSong = newAudio;
        addColor();
      }
    }
    myProgressBar.value = currentDuration;
    currentMinute = Math.floor(currentDuration / 60);
    currentSecond = Math.floor(currentDuration % 60);
    if (currentDuration < 10) {
      barTimeStart.textContent = `00:0${currentSecond}`;
    } else if (currentDuration < 60) {
      barTimeStart.textContent = `00:${currentSecond}`;
    } else if (currentDuration < 600) {
      if (currentSecond < 10) {
        barTimeStart.textContent = `0${currentMinute}:0${currentSecond}`;
      } else {
        barTimeStart.textContent = `0${currentMinute}:${currentSecond}`;
      }
    } else {
      if (currentSecond < 10) {
        barTimeStart.textContent = `${currentMinute}:0${currentSecond}`;
      } else {
        barTimeStart.textContent = `${currentMinute}:${currentSecond}`;
      }
    }
    currentDuration++;
  }, 1000);
};

myProgressBar.addEventListener("input", () => {
  currentDuration = myProgressBar.value;
  currentSong.currentTime = myProgressBar.value;
  currentMinute = Math.floor(currentDuration / 60);
  currentSecond = Math.floor(currentDuration % 60);
  if (currentDuration < 10) {
    barTimeStart.textContent = `00:0${currentSecond}`;
  } else if (currentDuration < 60) {
    barTimeStart.textContent = `00:${currentSecond}`;
  } else if (currentDuration < 600) {
    if (currentSecond < 10) {
      barTimeStart.textContent = `0${currentMinute}:0${currentSecond}`;
    } else {
      barTimeStart.textContent = `0${currentMinute}:${currentSecond}`;
    }
  } else {
    if (currentSecond < 10) {
      barTimeStart.textContent = `${currentMinute}:0${currentSecond}`;
    } else {
      barTimeStart.textContent = `${currentMinute}:${currentSecond}`;
    }
  }
});

// Set The Title and Duration
let title = document.querySelectorAll(".title");
let titleIndex = 0;
title.forEach((titleSong) => {
  titleSong.textContent = songs[titleIndex++].songName;
});

let durationIndex = 0;
let durationPlay = document.querySelectorAll(".duration-play");
durationPlay.forEach((songsDuration) => {
  let newAudio = new Audio(`${songs[durationIndex++].filePath}`);
  newAudio.addEventListener("loadedmetadata", () => {
    let totalDuration = Math.floor(newAudio.duration);
    totalMinute = Math.floor(totalDuration / 60);
    totalSecond = Math.floor(totalDuration % 60);
    if (totalDuration < 10) {
      songsDuration.textContent = `00:0${totalSecond}`;
    } else if (totalDuration < 60) {
      songsDuration.textContent = `00:${totalSecond}`;
    } else if (totalDuration < 600) {
      if (totalSecond < 10) {
        songsDuration.textContent = `0${totalMinute}:0${totalSecond}`;
      } else {
        songsDuration.textContent = `0${totalMinute}:${totalSecond}`;
      }
    } else {
      if (totalSecond < 10) {
        songsDuration.textContent = `${totalMinute}:0${totalSecond}`;
      } else {
        songsDuration.textContent = `${totalMinute}:${totalSecond}`;
      }
    }
  });
  newAudio.load();
});

// Play Next or Previous Song
next.addEventListener("click", () => {
  if (titleTrack < songs.length - 1) {
    removeColor();
    clearInterval(intervalId);
    currentDuration = 0;
    myProgressBar.value = 0;
    currentSong.pause();
    play.classList.remove("fa-play-circle");
    play.classList.add("fa-pause-circle");
    gif.style.opacity = "1";
    bottomTitle.textContent = songs[++titleTrack].songName;
    let newAudio = new Audio(`${songs[++songIndex].filePath}`);
    durationOfEachSongs(newAudio, barTimeEnd);
    updateCurrentDuration();
    newAudio.play();
    currentSong = newAudio;
    addColor();
  } else {
    removeColor();
    clearInterval(intervalId);
    currentDuration = 0;
    myProgressBar.value = 0;
    currentSong.pause();
    play.classList.remove("fa-play-circle");
    play.classList.add("fa-pause-circle");
    gif.style.opacity = "1";
    titleTrack = 0;
    songIndex = 0;
    bottomTitle.textContent = songs[titleTrack].songName;
    let newAudio = new Audio(`${songs[songIndex].filePath}`);
    durationOfEachSongs(newAudio, barTimeEnd);
    updateCurrentDuration();
    newAudio.play();
    currentSong = newAudio;
    addColor();
  }
});

previous.addEventListener("click", () => {
  if (titleTrack > 0) {
    removeColor();
    clearInterval(intervalId);
    currentDuration = 0;
    myProgressBar.value = 0;
    currentSong.pause();
    play.classList.remove("fa-play-circle");
    play.classList.add("fa-pause-circle");
    gif.style.opacity = "1";
    bottomTitle.textContent = songs[--titleTrack].songName;
    let newAudio = new Audio(`${songs[--songIndex].filePath}`);
    durationOfEachSongs(newAudio, barTimeEnd);
    updateCurrentDuration();
    newAudio.play();
    currentSong = newAudio;
    addColor();
  } else {
    removeColor();
    clearInterval(intervalId);
    currentDuration = 0;
    myProgressBar.value = 0;
    currentSong.pause();
    play.classList.remove("fa-play-circle");
    play.classList.add("fa-pause-circle");
    gif.style.opacity = "1";
    titleTrack = songs.length - 1;
    songIndex = songs.length - 1;
    bottomTitle.textContent = songs[titleTrack].songName;
    let newAudio = new Audio(`${songs[songIndex].filePath}`);
    durationOfEachSongs(newAudio, barTimeEnd);
    updateCurrentDuration();
    newAudio.play();
    currentSong = newAudio;
    addColor();
  }
});

// Play Each Song
let songList = document.querySelector(".song-list");
songList.addEventListener("click", (e) => {
  if (e.target.classList.contains("all-play")) {
    let songId = e.target.getAttribute("id");
    if (
      (currentSong.paused && currentDuration >= 0 && songId != songIndex) ||
      songId != songIndex
    ) {
      removeColor();
      songIndex = songId;
      titleTrack = songIndex;
      clearInterval(intervalId);
      currentDuration = 0;
      myProgressBar.value = 0;
      currentSong.pause();
      play.classList.remove("fa-play-circle");
      play.classList.add("fa-pause-circle");
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      gif.style.opacity = "1";
      bottomTitle.textContent = songs[titleTrack].songName;
      let newAudio = new Audio(`${songs[songIndex].filePath}`);
      durationOfEachSongs(newAudio, barTimeEnd);
      updateCurrentDuration();
      newAudio.play();
      currentSong = newAudio;
      addColor();
    } else if (currentSong.paused && currentDuration >= 0) {
      currentSong.play();
      play.classList.remove("fa-play-circle");
      play.classList.add("fa-pause-circle");
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      gif.style.opacity = "1";
      updateCurrentDuration();
      addColor();
    } else {
      removeColor();
      clearInterval(intervalId);
      currentSong.pause();
      play.classList.remove("fa-pause-circle");
      play.classList.add("fa-play-circle");
      e.target.classList.remove("fa-pause-circle");
      e.target.classList.add("fa-play-circle");
      gif.style.opacity = "0";
    }
  }
});
