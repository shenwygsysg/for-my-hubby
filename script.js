// g
let appData = {
    bgImage: "https://i.imgur.com/zBiuzeO.png",
    flowers: [
        "https://files.catbox.moe/rxo37y.png",
        "https://files.catbox.moe/m7phs1.png",
        "https://files.catbox.moe/53bl9j.png"
    ],
    bouquetImg: "https://files.catbox.moe/4x9xll.png",
    
    // bn
    birthdayLetter: {
        title: "Happy Birthday, My Love",
        message: "I created this special ocyank world just for you xixixix. Baby, thank you for being my constant warmth and joy.. I'm sorry for all my mistakes, I hope this year brings you as much happiness as you bring into my life every day.. I want you to live a long healthy life with me, I want to be there for you, till I die. Please let me be with you forever"
    },

    // 5
    songs: [
        { title: "Nine in the Afternoon", artist: "Panic! At The Disco", url: "https://files.catbox.moe/97lbcx.mp3", img: "https://files.catbox.moe/r0ke0u.png" },
        { title: "Just The Way You Are", artist: "Billy Joel", url: "https://files.catbox.moe/0llv4m.mp3", img: "https://files.catbox.moe/31h53t.png" },
        { title: "This Town", artist: "Niall Horan", url: "https://files.catbox.moe/g2a1yq.mp3", img: "https://files.catbox.moe/kapvlf.png" },
        { title: "Kahit Maputi Na Ang Buhok Ko", artist: "Rey Valera", url: "https://files.catbox.moe/kjlsq2.m4a", img: "https://files.catbox.moe/tnutb4.png" },
        { title: "Forevermore", artist: "Side A", url: "https://files.catbox.moe/3nonsg.m4a", img: "https://files.catbox.moe/rm6e9t.png" }
    ],

    fishImages: [
        "https://files.catbox.moe/xrgdzd.png",
        "https://files.catbox.moe/xk3slj.png",
        "https://files.catbox.moe/gdt3xr.png",
        "https://files.catbox.moe/jze18z.png",
        "https://files.catbox.moe/5cfwij.png",
        "https://files.catbox.moe/m78za5.png",
        "https://files.catbox.moe/efr8ni.png",
        "https://files.catbox.moe/d46ai0.png",
        "https://files.catbox.moe/zmn03w.png",
        "https://files.catbox.moe/gb4wvx.png",
    ],
    photos: [
        { url: "https://files.catbox.moe/ozzn5l.png", title: "You were always a sweet boy" },
        { url: "https://files.catbox.moe/xzmjng.png", title: "I love the way you seeing things" },
        { url: "https://files.catbox.moe/yz7ve0.png", title: "You just never failed to make me laugh" }, 
        { url: "https://files.catbox.moe/2cd3lz.png", title: "I want to give the world to you" }, 
        { url: "https://files.catbox.moe/pvdahp.png", title: "I want to love you forever" }, 
        { url: "https://files.catbox.moe/23bny6.png", title: "You've seen bad in me and still choose me" }, 
        { url: "https://files.catbox.moe/li1t8k.png", title: "You're always come to me" }, 
        { url: "https://files.catbox.moe/gxx0ke.png", title: "Please keep me with you forever" }, 
        { url: "https://files.catbox.moe/m7x9sp.png", title: "I love you so much" }, 
        { url: "https://files.catbox.moe/924fnr.png", title: "Let's grow old together." } 
    ]
};

// Ao
let currentAudio = null;
let playingIndex = null;

// Sj
function startExperience() {
    document.getElementById('welcome-modal').classList.add('hidden');
    openLetterModal();
    
    // Automatically start playing the first song on click
    if (appData.songs.length > 0) {
        togglePlaySong(0);
    }
}

// [n
function renderPlaylist() {
    const container = document.getElementById('playlist-container');
    if (!container) return;
    container.innerHTML = '';
    
    appData.songs.forEach((song, idx) => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-3 rounded-2xl bg-sky-950/50 border border-cyan-400/30 hover:bg-sky-900/60 transition-colors';
        
        item.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-sky-900 overflow-hidden flex items-center justify-center font-bold text-cyan-200 text-xs shadow-xs border border-cyan-400/40">
                    <img src="${song.img}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/100x100/0284c7/fff?text=Song'">
                </div>
                <div>
                    <h5 class="text-xs font-bold text-white">${song.title}</h5>
                    <p class="text-[10px] text-cyan-200 font-medium">${song.artist}</p>
                </div>
            </div>
            <button onclick="togglePlaySong(${idx})" id="play-btn-${idx}" class="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-xs shadow-md hover:bg-cyan-300 transition-all transform active:scale-95 font-bold">
                <i class="fa-solid fa-play"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

function togglePlaySong(index) {
    const song = appData.songs[index];
    const btn = document.getElementById(`play-btn-${index}`);
    
    if (playingIndex === index && currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            currentAudio.pause();
            if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        if (playingIndex !== null) {
            const prevBtn = document.getElementById(`play-btn-${playingIndex}`);
            if (prevBtn) prevBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    currentAudio = new Audio(song.url);
    currentAudio.play().then(() => {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        playingIndex = index;
    }).catch(e => {
        console.log("Audio playback error:", e);
    });

    currentAudio.onended = () => {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playingIndex = null;
    };
}

// lm
function openLetterModal() {
    document.getElementById('letter-title-text').innerText = appData.birthdayLetter.title;
    document.getElementById('letter-body-text').innerText = appData.birthdayLetter.message;
    document.getElementById('letter-modal').classList.remove('hidden');
}

function closeLetterModal() {
    document.getElementById('letter-modal').classList.add('hidden');
}

function updateSeaBackground() {
    const bgLayer = document.getElementById('bg-pond-layer');
    if (appData.bgImage && appData.bgImage.trim() !== '') {
        bgLayer.style.background = `linear-gradient(rgba(14, 165, 233, 0.35), rgba(6, 182, 212, 0.45)), url('${appData.bgImage.trim()}')`;
        bgLayer.style.backgroundSize = 'cover';
        bgLayer.style.backgroundPosition = 'center';
    } else {
        bgLayer.style.background = 'linear-gradient(180deg, #38bdf8 0%, #0284c7 40%, #0369a1 100%)';
    }
}

function initBgFishSchool() {
    const container = document.getElementById('bg-fish-school');
    container.innerHTML = '';
    
    const fishLinks = appData.fishImages.length > 0 ? appData.fishImages : [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&auto=format&fit=crop&q=80"
    ];
    
    for (let i = 0; i < 36; i++) {
        const fishImgUrl = fishLinks[i % fishLinks.length];
        const fish = document.createElement('div');
        fish.className = 'bg-swimming-fish';
        
        const img = document.createElement('img');
        img.src = fishImgUrl;
        img.className = 'w-24 sm:w-36 h-auto object-contain mix-blend-multiply opacity-90 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]';
        img.onerror = () => { img.src = 'https://placehold.co/120x60/38bdf8/fff?text=Fish'; };
        
        fish.appendChild(img);
        
        const topPos = Math.random() * 92 + 2;
        const duration = Math.random() * 35 + 45;
        const delay = Math.random() * -60;
        const scale = Math.random() * 0.4 + 0.7;
        
        fish.style.top = `${topPos}%`;
        fish.style.setProperty('--swim-y', `${(Math.random() - 0.5) * 140}px`);
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationDelay = `${delay}s`;
        fish.style.transform = `scale(${scale})`;
        
        container.appendChild(fish);
    }
}

function renderCoverFlowers() {
    const container = document.getElementById('cover-flowers-container');
    container.innerHTML = '';
    appData.flowers.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'w-12 h-12 rounded-full object-cover border-2 border-cyan-200 shadow-md animate-float';
        container.appendChild(img);
    });
    
    const bImg = document.getElementById('bouquet-banner-img');
    if (bImg) bImg.src = appData.bouquetImg;
}

function renderGallery() {
    const container = document.getElementById('images-gallery-row');
    container.innerHTML = '';
    appData.photos.slice(0, 5).forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'flex-shrink-0 w-16 h-16 rounded-full border-2 border-cyan-300 shadow-lg overflow-hidden bg-sky-950 cursor-pointer hover:scale-105 transition-transform';
        div.onclick = () => openPhotoModal(idx, item.title);
        
        const img = document.createElement('img');
        img.src = item.url;
        img.className = 'w-full h-full object-cover';
        div.appendChild(img);
        container.appendChild(div);
    });
}

function renderMemoriesBoard() {
    const container = document.getElementById('memories-grid');
    container.innerHTML = '';
    
    appData.photos.forEach((photoObj, idx) => {
        const card = document.createElement('div');
        const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1', '-rotate-3', 'rotate-2', '-rotate-1'];
        const rot = rotations[idx % rotations.length];
        
        card.className = `bg-white text-slate-900 p-3 pb-5 rounded-xl shadow-2xl transform ${rot} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center relative border border-slate-200`;
        card.onclick = () => openPhotoModal(idx, photoObj.title);
        
        card.innerHTML = `
            <div class="absolute -top-3 w-5 h-5 rounded-full bg-rose-500 border-2 border-white shadow-lg flex items-center justify-center text-[9px] text-white font-bold z-10">♥</div>
            <div class="w-full h-36 sm:h-40 bg-slate-100 rounded-lg overflow-hidden mb-3 shadow-inner">
                <img src="${photoObj.url}" class="w-full h-full object-cover">
            </div>
            <div class="w-full text-center">
                <span class="text-xs font-bold text-slate-800 font-serif block">${photoObj.title}</span>
                <span class="text-[10px] text-rose-500 font-bold uppercase tracking-widest mt-0.5 block">Malang</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function switchView(target) {
    const cover = document.getElementById('cover-view');
    const pond = document.getElementById('pond-view');
    const memories = document.getElementById('memories-view');
    
    [cover, pond, memories].forEach(v => {
        v.classList.remove('flex', 'opacity-100');
        v.classList.add('hidden', 'opacity-0');
    });

    ['cover', 'pond', 'memories'].forEach(tab => {
        const el = document.getElementById(`tab-${tab}`);
        if(el) el.className = "bg-sky-950/60 text-slate-300 px-3.5 py-1.5 rounded-t-lg hover:bg-sky-900 cursor-pointer flex items-center space-x-2 transition-all";
    });

    if (target === 'cover') {
        cover.classList.remove('hidden');
        cover.classList.add('flex', 'opacity-100');
        document.getElementById('tab-cover').className = "bg-cyan-900/80 text-cyan-200 px-3.5 py-1.5 rounded-t-lg border-t border-x border-cyan-400/40 flex items-center space-x-2 shadow-xs cursor-pointer";
    } else if (target === 'pond') {
        pond.classList.add('flex', 'opacity-100');
        pond.classList.remove('hidden');
        document.getElementById('tab-pond').className = "bg-cyan-900/80 text-cyan-200 px-3.5 py-1.5 rounded-t-lg border-t border-x border-cyan-400/40 flex items-center space-x-2 shadow-xs cursor-pointer";
    } else if (target === 'memories') {
        memories.classList.add('flex', 'opacity-100');
        memories.classList.remove('hidden');
        document.getElementById('tab-memories').className = "bg-cyan-900/80 text-cyan-200 px-3.5 py-1.5 rounded-t-lg border-t border-x border-cyan-400/40 flex items-center space-x-2 shadow-xs cursor-pointer";
    }
}

function openPhotoModal(index, titleText) {
    document.getElementById('lightbox-img').src = appData.photos[index].url;
    document.getElementById('lightbox-title').innerText = titleText || 'Memory Snapshot';
    document.getElementById('photo-modal').classList.remove('hidden');
}

function closePhotoModal() { 
    document.getElementById('photo-modal').classList.add('hidden'); 
}

let mapScale = 1;
function zoomMap(direction) {
    mapScale += direction * 0.15;
    if (mapScale < 0.9) mapScale = 0.9;
    if (mapScale > 1.4) mapScale = 1.4;
    document.getElementById('map-viewport').style.transform = `scale(${mapScale})`;
    document.getElementById('map-viewport').style.transition = 'transform 0.3s ease';
}

window.onload = function() {
    updateSeaBackground();
    renderCoverFlowers();
    renderGallery();
    renderMemoriesBoard();
    renderPlaylist(); 
    initBgFishSchool(); 
};
