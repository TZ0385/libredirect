import youtubeHelper from "../../assets/javascripts/helpers/youtube.js";
import commonHelper from "../../assets/javascripts/helpers/common.js";

let disableInvidiousElement = document.getElementById("disable-invidious");
let invidiousDarkModeElement = document.getElementById("invidious-dark-mode");
let persistInvidiousPrefsElement = document.getElementById("persist-invidious-prefs");
let invidiousVolumeElement = document.getElementById("invidious-volume");
let invidiousPlayerStyleElement = document.getElementById("invidious-player-style");
let invidiousSubtitlesElement = document.getElementById("invidious-subtitles");
let invidiousAutoplayElement = document.getElementById("invidious-autoplay");
let useFreeTubeElement = document.getElementById("use-freetube");
let invidiousAlwaysProxyElement = document.getElementById("always-proxy");
let invidiousOnlyEmbeddedVideoElement = document.getElementById("only-embed");
let invidiousVideoQualityElement = document.getElementById("video-quality");
let invidiousVolumeValueElement = document.querySelector("#volume-value");

youtubeHelper.init().then(() => {
    disableInvidiousElement.checked = !youtubeHelper.getDisableInvidious();
    invidiousDarkModeElement.checked = youtubeHelper.getInvidiousDarkMode();
    persistInvidiousPrefsElement.checked = youtubeHelper.getPersistInvidiousPrefs();
    invidiousVolumeElement.value = youtubeHelper.getInvidiousVolume();
    invidiousVolumeValueElement.textContent = youtubeHelper.getInvidiousVolume() ? `${youtubeHelper.getInvidiousVolume()}%` : " - ";
    invidiousPlayerStyleElement.value = youtubeHelper.getInvidiousPlayerStyle() || "";
    invidiousSubtitlesElement.value = youtubeHelper.getInvidiousSubtitles() || "";
    useFreeTubeElement.checked = youtubeHelper.getUseFreeTube();
    invidiousOnlyEmbeddedVideoElement.checked = youtubeHelper.getInvidiousOnlyEmbeddedVideo();
    invidiousAlwaysProxyElement.checked = youtubeHelper.getInvidiousAlwaysProxy();
    invidiousVideoQualityElement.value = youtubeHelper.getInvidiousVideoQuality() || "";
    invidiousAutoplayElement.checked = youtubeHelper.getInvidiousAutoplay();
});


disableInvidiousElement.addEventListener("change",
    (event) => youtubeHelper.setDisableInvidious(!event.target.checked)
);

invidiousDarkModeElement.addEventListener("change",
    (event) => youtubeHelper.setInvidiousDarkMode(event.target.checked)
);

persistInvidiousPrefsElement.addEventListener("change",
    (event) => youtubeHelper.setPersistInvidiousPrefs(event.target.checked)
);

invidiousVolumeElement.addEventListener("input",
    commonHelper.debounce(() => {
        youtubeHelper.setInvidiousVolume(invidiousVolumeElement.value);
        console.info("youtubeHelper.invidiousVolume:", youtubeHelper.getInvidiousVolume());
        invidiousVolumeValueElement.textContent = `${invidiousVolumeElement.value}%`;
    }, 1)
);

invidiousPlayerStyleElement.addEventListener("change",
    (event) => youtubeHelper.setInvidiousPlayerStyle(event.target.options[invidiousPlayerStyleElement.selectedIndex].value)
);

invidiousSubtitlesElement.addEventListener("input",
    commonHelper.debounce(() => {
        youtubeHelper.setInvidiousSubtitles(invidiousSubtitlesElement.value)
    }, 500)
);

invidiousAutoplayElement.addEventListener("change",
    (event) => youtubeHelper.setInvidiousAutoplay(event.target.checked)
);


useFreeTubeElement.addEventListener("change",
    (event) => youtubeHelper.setUseFreeTube(event.target.checked)
);

invidiousAlwaysProxyElement.addEventListener("change",
    (event) => youtubeHelper.setInvidiousAlwaysProxy(event.target.checked)
);

invidiousOnlyEmbeddedVideoElement.addEventListener("change",
    (event) => youtubeHelper.setInvidiousOnlyEmbeddedVideo(event.target.checked)
);

invidiousVideoQualityElement.addEventListener("change",
    (event) => youtubeHelper.setInvidiousVideoQuality(event.target.options[invidiousVideoQualityElement.selectedIndex].value)
);