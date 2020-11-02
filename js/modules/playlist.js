import { songsList } from "data/songs.js";
import PlayInfo from "play-info.js";
import TrackBar from "track-bar.js";

const Playlist = (_ => {
    //data or state
    let songs = songsList;
    let currentPlayingIndex = 0;
    let currentSong = new Audio(songs[currentPlayingIndex].url);


    //currentSong.currentTime = 255;

    //Cache the DOM
    const playlistEl = document.querySelector(".playlist")


    const flip = _ => {
      togglePlayPause();
      render();
    }
    const changeAudioSrc = _ => {
      currentSong.src = songs[currentPlayingIndex].url;
    }

    const togglePlayPause = _ => {
      return currentSong.paused ? currentSong.play() : currentSong.pause();
    }

    const mainPlay = clickedIndex => {
      if(currentPlayingIndex === clickedIndex) {
        //toggle play or pause;
        togglePlayPause();
      } else {
        currentPlayingIndex = clickedIndex;
        changeAudioSrc();
        togglePlayPause();
      }
      PlayInfo.setState({
        songsLength:songs.length,
        isPlaying:!currentSong.paused
      });
    }


    const playNext = _ => {
      if(songs[currentPlayingIndex + 1]) {
        currentPlayingIndex++;
        changeAudioSrc();
        togglePlayPause();
        render();
      }

    }
    const listener = _ => {
          //1. get the index of li tag
          //2. change the currentPlayingIndex to index of the li tag
          //3. play or pause
          //4. If not the same song, then change the src to that new song after changing
               //currentPlayingIndex.
          playlistEl.addEventListener("click", function(event) {
            if(event.target && event.target.matches(".fa")) {
              const listElem = event.target.parentNode.parentNode;
              //console.log(listElem.parentElement.children);
              const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
              //console.log(listElemIndex);
              mainPlay(listElemIndex);
              render();
            }
          })


          currentSong.addEventListener("timeupdate",_ => {
            TrackBar.setState(currentSong);
          } )


          currentSong.addEventListener("ended",_=> {
            // play next;
            playNext();
          })
      }


    const render = _ => {
        let markup = ``;

        const toggleIcon = itemIndex => {
          if(currentPlayingIndex === itemIndex) {
            return currentSong.paused ? 'fa-play' : 'fa-pause';
          } else {
            return 'fa-play';
          }


        }
        songs.forEach((songObj, index) => {
            markup += `<li class="playlist__song ${index === currentPlayingIndex ? 'playlist__song--active': ''}">
            <div class="play-pause">
              <i class="fa ${toggleIcon(index)} pp-icon"></i>
            </div>
            <div class="playlist__song-details">
              <span class="playlist__song-name">${songObj.title}</span>
              <br>
              <span class="playlist__song-artist">${songObj.artist}</span>
            </div>
            <div class="playlist__song-duration">
              ${songObj.time}
            </div>
          </li>`;
        })

        playlistEl.innerHTML = markup;
    }

    const init = _ => {
      render();
      listener();
      PlayInfo.setState({
        songsLength: songs.length,
        isPlaying: !currentSong.paused
      });
  }
    return {
        init: init,
        flip: flip
    }
})();
export default Playlist;
