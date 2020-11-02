import Playlist from "./playlist.js";

const PlayInfo = (_ => {
    // let songsLength = 0;
    // let isPlaying = false;

    //creat an object include 2 variables
    const state = {
        songsLength: 0,
        isPlaying: false
    }

    //Cache the DOM

    const playerCountEl = document.querySelector(".player__count");
    const playerTriggleEl = document.querySelector(".player__trigger");


    //put state object into a seatState function, when we call it outside of this module
    const setState = obj => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }


    const render = _ => {
        playerCountEl.innerHTML = state.songsLength;
        //if is playing button shows pause,otherwise shows play
        playerTriggleEl.innerHTML = state.isPlaying ? 'Pause' : 'play';
    }

    const listener = _ => {
        playerTriggleEl.addEventListener("click", _ => {
            // 1. change our own (playinfo's) state
            state.isPlaying = state.isPlaying ? false : true;
            // 2. render it
            render();
            // 3. toggle the playpause song functionality
            Playlist.flip();
        })
    }

    const init = _ => {
        render();
        listener();
    }

    return {
        init: init,
        setState: setState
    }
})();

export default PlayInfo;