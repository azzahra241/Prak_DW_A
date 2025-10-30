console.log("Halo dari script.js! file berhasil terhubung")
// Memilih elemen input (sumber data)
const inputNamaResep = document.querySelector('#recipe-name');

// Memilih elemen pratinjau (target perubahan)
const judulPratinjau = document.querySelector('article header h1');

// Uji coba di console
console.log(inputNamaResep);
console.log(judulPratinjau);

inputNamaResep.addEventListener('input', function() {
    console.log("🍳 Pengguna sedang mengetik!");
});

inputNamaResep.addEventListener('input', function() {
    // 1. Ambil nilai yang ada di input
    const teksInputan = inputNamaResep.value;
    
    // 2. Setel teks pratinjau = teks inputan
    judulPratinjau.textContent = teksInputan;
});

const inputWaktuPersiapan = document.querySelector('#prep-time');
const waktuPratinjau = document.querySelector('article header time');

inputWaktuPersiapan.addEventListener('input', function() {
    const waktuInputan = inputWaktuPersiapan.value;
    
    if (waktuInputan === "" || waktuInputan === "0") {
        waktuPratinjau.textContent = "-- menit";
    } else {
        waktuPratinjau.textContent = waktuInputan + " menit";
        waktuPratinjau.setAttribute('datetime', `PT${waktuInputan}M`);
    }
});

const inputDeskripsi = document.querySelector('#description');
const deskripsiPratinjau = document.querySelector('#preview-desc');
inputDeskripsi.addEventListener('input', function() {
    const deskripsiInputan = inputDeskripsi.value;
    
    if (deskripsiInputan === "") {
        deskripsiPratinjau.textContent = "Deskripsi resep Anda akan muncul di sini...";
    } else {
        deskripsiPratinjau.textContent = deskripsiInputan;
    }
});

const inputKesulitan = document.querySelector('#difficulty');
const kesulitanMeter = document.querySelector('#preview-difficulty');
const kesulitanText = document.querySelector('#preview-difficulty-text');

inputKesulitan.addEventListener('input', function() {
    const nilaiKesulitan = inputKesulitan.value;
    
    kesulitanMeter.setAttribute('value', nilaiKesulitan);
    
    let textKesulitan = "";
    switch(nilaiKesulitan) {
        case "1":
            textKesulitan = "Sangat Mudah";
            break;
        case "2":
            textKesulitan = "Mudah";
            break;
        case "3":
            textKesulitan = "Sedang";
            break;
        case "4":
            textKesulitan = "Sulit";
            break;
        case "5":
            textKesulitan = "Sangat Sulit";
            break;
    }
    
    kesulitanText.textContent = textKesulitan;
});
