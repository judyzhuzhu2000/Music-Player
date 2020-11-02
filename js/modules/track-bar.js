const TrackBar = (_ => {
    //state
    const state = {
        curentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    // Cache the DOM
    const trackBarFillEl = document.querySelector(".track-bar__fill");




    const getPercent = (current, full) => {
        return(current / full) * 100;
    }

    const setState = obj => {
        state.currentTrackTime = obj.currentTime;//Audio API
        state.fullTrackTime = obj.duration;//Audio API
        state.fillWidth = getPercent(state.currentTrackTime, state.fullTrackTime);
        render();
    }

    const render = _ => {
        trackBarFillEl.style.width = `${state.fillWidth}%`;
    }

    const init = _ => {
        render();
    }
    return {
        init,
        setState
    }
})();

export default TrackBar;