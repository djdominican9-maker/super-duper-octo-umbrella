// --- FUNCIÓN PARA EL PAGO POR PAYPAL ---
function buyBeat(beatName, price) {
    const myPayPalEmail = "djdominican9@gmail.com"; 
    const baseUrl = "https://www.paypal.com/cgi-bin/webscr";
    const params = new URLSearchParams({
        cmd: "_xclick",
        business: myPayPalEmail,
        item_name: "Licencia de Beat: " + beatName,
        amount: price,
        currency_code: "USD",
        no_shipping: "1",
        lc: "ES"
    });
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
}

const songs = [
    { name: "Ay Timbora", color: "#ff0000", file: "Ay Timbora FJ BEAST.mp3" },
    { name: "DEMECIA", color: "#8a2be2", file: "DEMECIA.mp3" },
    { name: "Don't Lie", color: "#00eeff", file: "Don't Lie - FJ BEAST.mp3" },
    { name: "MAMI YO QUIERO", color: "#ff69b4", file: "NIKO - MAMI YO QUIERO.mp3" },
    { name: "DESDE ALMA", color: "#0044ff", file: "NIKO - DESDE ALMA.mp3" },
    { name: "WANT YOU", color: "#ffff00", file: "NIKO WANT YOU.mp3" },
    { name: "PROFUNDO", color: "#00ff88", file: "PROFUNDO.mp3" },
    { name: "ECOS DE CRISTAL", color: "#ffffff", file: "Ecos de Cristal.mp3" }
];

const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
let currentTrackIndex = 0;

function loadTrack(index) {
    currentTrackIndex = index;
    const song = songs[index];
    document.documentElement.style.setProperty('--accent', song.color);
    document.documentElement.style.setProperty('--bg-body-accent', song.color + "44");
    audioPlayer.src = song.file;
    document.getElementById('active-track-name').innerText = song.name;
    document.getElementById('album-cover').style.backgroundImage = `url('caratula.jpeg')`;
    document.getElementById('vinyl-label').style.backgroundImage = `url('caratula.jpeg')`;
    document.querySelectorAll('.track-item').forEach((item, i) => item.classList.toggle('active', i === index));
}

function playSong(index) {
    loadTrack(index);
    audioPlayer.play();
    playBtn.innerText = "II";
    document.getElementById('vinyl-disk').classList.add('spinning');
}

playBtn.onclick = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerText = "II";
        document.getElementById('vinyl-disk').classList.add('spinning');
    } else {
        audioPlayer.pause();
        playBtn.innerText = "▶";
        document.getElementById('vinyl-disk').classList.remove('spinning');
    }
};

const listUI = document.getElementById('track-list-ui');
songs.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'track-item';
    li.innerText = `${i+1}. ${s.name}`;
    li.onclick = () => playSong(i);
    listUI.appendChild(li);
});

document.getElementById('next-btn').onclick = () => playSong((currentTrackIndex + 1) % songs.length);
document.getElementById('prev-btn').onclick = () => playSong((currentTrackIndex - 1 + songs.length) % songs.length);
document.getElementById('volume-slider').oninput = (e) => audioPlayer.volume = e.target.value / 100;

audioPlayer.ontimeupdate = () => {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        document.getElementById('progress-bar').style.width = progress + "%";
    }
};

function showSection(section) {
    const overlays = document.querySelectorAll('.overlay');
    const hero = document.getElementById('section-inicio');
    overlays.forEach(o => o.style.display = 'none');
    
    if (section === 'inicio') {
        hero.style.display = 'block';
        document.body.style.overflowY = 'auto';
    } else {
        hero.style.display = 'none';
        document.getElementById(`overlay-${section}`).style.display = 'flex';
        document.body.style.overflowY = 'hidden';
    }
}

document.addEventListener('mousemove', e => {
    document.body.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
    document.body.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
});

// Inicialización
showSection('inicio');
loadTrack(0);