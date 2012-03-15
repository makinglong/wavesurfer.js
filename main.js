(function (globals, exports) {
    'use strict';

    var WaveSurfer = globals.WaveSurfer;

    var webAudio = Object.create(WaveSurfer.WebAudio);

    webAudio.init();

    var waveDrawer = Object.create(WaveSurfer.Drawer);
    waveDrawer.init(
        document.querySelector('#wave'),
        webAudio,
        {
            color: 'rgba(100, 0, 250, 0.5)',
            cursor: document.querySelector('#wave-cursor'),
            continuous: true
        }
    );
	waveDrawer.loop();
    waveDrawer.bindClick();

    var rtaDrawer = Object.create(WaveSurfer.Drawer);
    rtaDrawer.init(
        document.querySelector('#rta'),
        webAudio,
        { color: 'rgba(0, 100, 150, 0.7)' }
    );
    rtaDrawer.loop(webAudio.waveform);


    /* Load file via drag'n'drop. */
    var reader = new globals.FileReader();
    reader.addEventListener('load', function (e) {
        webAudio.loadData(e.target.result, function () {
            waveDrawer.drawBuffer(webAudio.currentBuffer);
        });
    }, false);


    document.addEventListener('drop', function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        file && reader.readAsArrayBuffer(file);
    }, false);


    /* Play/pause on spacebar. */
    document.addEventListener('keypress', function (e) {
        if (32 === e.keyCode) { // spacebar
            e.preventDefault();
            webAudio.paused ? webAudio.play() : webAudio.pause();
        }
    }, false);

    /* Exports */
    exports.webAudio = webAudio;
}(this, this));