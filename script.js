document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // --- PUSAT KUSTOMISASI: UBAH SEMUA KONTEN ANDA DI SINI ---
    // =========================================================================
    const config = {
        passcode: '061002',
        namaPanggilan: 'Sayang',
        ucapanPembuka: 'For My Dearest',

        // --- Atur Dua Foto Profil di Sini ---
        fotoProfil1: 'assets/foto-profil1.jpg', // Untuk layar password
        fotoProfil2: 'assets/foto-profil2.jpg', // Untuk di dalam tab profil

        chibiCharacters: [
            'assets/chibi1.png',
            'assets/chibi2.png',
            'assets/chibi3.png',
            'assets/chibi4.png',
        ],

        fileMusik: 'assets/musik-latar.mp3',
        fotoHeader: 'assets/foto-header.gif',
        kartuPos: 'assets/postcard.png',

        galeriFoto: [
            'assets/gallery1.jpg',
            'assets/gallery2.jpg',
            'assets/gallery3.jpg',
            'assets/gallery4.jpg',
            'assets/gallery5.jpg',
            'assets/gallery6.jpg',
            'assets/gallery7.jpg',
        ],

        header: {
            judul: (nama) => `Hi, Sayang!`,
            subjudul: '🌺I hope you’re always surrounded by love, positive energy, and sweet little things that make your life more colorful 🌷🌟💫'
        },
        profile: {
            judul: 'a little about u',
            deskripsi: `🌸You are the eldest daughter, a girl full of ambition and dreams. With a strong yet gentle heart, you always give your best in everything you do. She loves playing Roblox, both in good times and bad. For you, family is the greatest source of strength, guiding every step with love and devotion 🌷✨💖`
        },
        letter: {
            title: 'A Letter For You',
            paragraph1: 'Selamat ulang tahun, sayang! Hari ini adalah hari spesialmu, dan aku ingin kamu tahu betapa berartinya dirimu bagiku. Setiap momen bersamamu adalah anugerah yang tak ternilai.',
            
            subtitle1: 'My Wishes',
            paragraph2: 'Aku berdoa semoga kamu selalu diberikan kesehatan, kebahagiaan yang melimpah, dan semua impianmu dapat terwujud. Teruslah menjadi pribadi yang hebat dan inspiratif seperti sekarang.',

            subtitle2: 'Finally...',
            paragraph3: 'Jangan pernah lelah untuk tersenyum dan menyebarkan kebaikan. Terima kasih telah menjadi bagian terindah dalam hidupku.'
        }
    };
    // =========================================================================

    // --- Inisialisasi Aplikasi (Jangan diubah) ---
    const startScreen = document.getElementById('start-screen');
    const lockScreen = document.getElementById('lock-screen');
    const giftBoxContainer = document.getElementById('gift-box-container');
    const backgroundMusic = document.getElementById('background-music');
    let enteredPasscode = '';

    function spawnChibis(count = 8) {
        if (!config.chibiCharacters || config.chibiCharacters.length === 0) return;
        const container = document.getElementById('chibi-container');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const chibi = document.createElement('img');
            chibi.className = 'chibi-char';
            
            chibi.src = config.chibiCharacters[Math.floor(Math.random() * config.chibiCharacters.length)];
            const size = Math.random() > 0.5 ? '100px' : '60px';
            const startPos = Math.random() * 80 + 10;
            const duration = Math.random() * 8 + 10;
            const delay = Math.random() * 7;

            chibi.style.width = size;
            chibi.style.height = 'auto';
            chibi.style.left = `${startPos}%`;
            chibi.style.bottom = `-${size}`;
            chibi.style.animationDuration = `${duration}s`;
            chibi.style.animationDelay = `${delay}s`;
            
            container.appendChild(chibi);
        }
    }
    
    function animateStartTitle() {
        const startTitle = document.getElementById('start-title');
        startTitle.innerHTML = config.ucapanPembuka
            .split('')
            .map((char, index) => `<span style="animation-delay: ${index * 50}ms">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');
    }

    function populateContent() {
        animateStartTitle();
        // Mengatur foto profil yang berbeda
        document.getElementById('lock-screen-pic').src = config.fotoProfil1;
        document.getElementById('profile-content-pic').src = config.fotoProfil2;
        
        backgroundMusic.src = config.fileMusik;
        document.getElementById('header-banner-img').src = config.fotoHeader;
        document.getElementById('banner-title').textContent = config.header.judul(config.namaPanggilan);
        document.getElementById('banner-subtitle').textContent = config.header.subjudul;
        document.getElementById('profile-title').textContent = config.profile.judul;
        document.getElementById('profile-text').textContent = config.profile.deskripsi;
        document.getElementById('postcard').src = config.kartuPos;
        document.getElementById('dynamic-greeting').textContent = getDynamicGreeting();

        document.getElementById('letter-title').textContent = config.letter.title;
        document.getElementById('letter-paragraph1').textContent = config.letter.paragraph1;
        document.getElementById('letter-subtitle1').textContent = config.letter.subtitle1;
        document.getElementById('letter-paragraph2').textContent = config.letter.paragraph2;
        document.getElementById('letter-subtitle2').textContent = config.letter.subtitle2;
        document.getElementById('letter-paragraph3').textContent = config.letter.paragraph3;
    }

    function getDynamicGreeting() {
        const hour = new Date().getHours();
        if (hour < 11) return "Selamat Pagi!";
        if (hour < 15) return "Selamat Siang!";
        if (hour < 19) return "Selamat Sore!";
        return "Selamat Malam!";
    }
    
    startScreen.addEventListener('click', () => {
        startScreen.style.transition = 'opacity 0.5s, transform 0.5s';
        startScreen.style.opacity = '0';
        startScreen.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            startScreen.classList.remove('active');
            lockScreen.classList.add('active');
            backgroundMusic.play().catch(() => {});
        }, 500);
    });

    const passcodeDisplay = document.getElementById('passcode-display');
    const passcodeContainer = lockScreen.querySelector('.passcode-container');
    const passcodeGrid = lockScreen.querySelector('.passcode-grid');
    const passcodeValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

    passcodeValues.forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'passcode-btn';
        btn.innerHTML = `<span>${val}</span>`;
        btn.addEventListener('click', () => handlePasscode(val));
        passcodeGrid.appendChild(btn);
    });

    function handlePasscode(value) {
        if (value === 'C') enteredPasscode = '';
        else if (value === '⌫') enteredPasscode = enteredPasscode.slice(0, -1);
        else if (enteredPasscode.length < config.passcode.length) enteredPasscode += value;
        
        updatePasscodeDisplay();
        
        if (enteredPasscode.length === config.passcode.length) checkPasscode();
    }

    function updatePasscodeDisplay() {
        passcodeDisplay.innerHTML = '';
        for (let i = 0; i < config.passcode.length; i++) {
            const dotContainer = document.createElement('div');
            dotContainer.style.width = '25px';
            dotContainer.style.height = '25px';
            if (i < enteredPasscode.length) {
                const dot = document.createElement('div');
                dot.className = 'passcode-dot';
                dot.innerHTML = '❤️';
                dotContainer.appendChild(dot);
            }
            passcodeDisplay.appendChild(dotContainer);
        }
    }

    function checkPasscode() {
        if (enteredPasscode === config.passcode) {
            lockScreen.classList.remove('active');
            giftBoxContainer.classList.add('active');
            setTimeout(() => {
                giftBoxContainer.classList.add('open');
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
                spawnChibis();
            }, 800);
        } else {
            passcodeContainer.classList.add('shake');
            setTimeout(() => {
                passcodeContainer.classList.remove('shake');
                enteredPasscode = '';
                updatePasscodeDisplay();
            }, 500);
        }
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.tab-btn.active').classList.remove('active');
            btn.classList.add('active');
            document.querySelector('.tab-content.active').classList.remove('active');
            document.getElementById(`${btn.dataset.tab}-content`).classList.add('active');
        });
    });
    
    const galleryImage = document.getElementById('gallery-image');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImage.classList.add('fade-out');
        setTimeout(() => {
            galleryImage.src = config.galeriFoto[index];
            galleryImage.onload = () => {
                galleryImage.classList.remove('fade-out');
            };
        }, 500);
    }
    
    document.getElementById('next-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % config.galeriFoto.length;
        showImage(currentImageIndex);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + config.galeriFoto.length) % config.galeriFoto.length;
        showImage(currentImageIndex);
    });

    document.querySelectorAll('.letter-fold .letter-header').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('open');
        });
    });

    const heartsContainer = document.querySelector('.falling-hearts');
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = ['❤️', '💖', '✨', '💕', '🥰'][Math.floor(Math.random() * 5)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 7 + 8}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${Math.random() * 1 + 1.2}rem`;
        heartsContainer.appendChild(heart);
    }
    
    populateContent();
    if (config.galeriFoto.length > 0) {
        galleryImage.src = config.galeriFoto[0];
    }
});