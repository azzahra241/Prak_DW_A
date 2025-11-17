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

// --- BAGIAN KODE BARU UNTUK AJAX ---

// Pilih elemen-elemen baru
const containerInspirasi = document.querySelector('#resep-container');
const loadingIndicator = document.querySelector('#loading-indicator');
const errorMessage = document.querySelector('#error-message');

// URL API (Ambil 12 resep dari kategori "Seafood")
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';

async function muatInspirasiResep() {
  try {
    // 1. Tampilkan loading, sembunyikan error
    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';

    // 2. Ambil data dari API
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Gagal mengambil data dari server.');
    }

    // 3. Ubah data menjadi JSON
    const data = await response.json();
    const resepArray = data.meals; // Ini adalah array berisi resep

    // 4. Sembunyikan loading
    loadingIndicator.style.display = 'none';

    // 5. Panggil fungsi untuk menampilkan data
    tampilkanResep(resepArray);

  } catch (error) {
    // 6. Tangani jika terjadi error
    console.error('Terjadi kesalahan:', error);
    loadingIndicator.style.display = 'none';
    errorMessage.textContent = 'Gagal memuat resep. Coba lagi nanti.';
    errorMessage.style.display = 'block';
  }
}

function tampilkanResep(resepArray) {
  // Bersihkan kontainer (jika ada data lama)
  containerInspirasi.innerHTML = '';

  // Loop (ulangi) untuk setiap resep di dalam array
  resepArray.forEach(resep => {
    // 1. Buat elemen-elemen HTML baru
    const kartuDiv = document.createElement('div');
    kartuDiv.className = 'kartu-resep'; // Beri kelas CSS

    const gambar = document.createElement('img');
    gambar.src = resep.strMealThumb; // Ambil URL gambar dari API
    gambar.alt = resep.strMeal;

    const judul = document.createElement('h3');
    judul.textContent = resep.strMeal; // Ambil nama resep dari API

    // 2. Susun elemen-elemen tersebut
    kartuDiv.appendChild(gambar);
    kartuDiv.appendChild(judul);

    // 3. Masukkan kartu yang sudah jadi ke dalam kontainer di halaman
    containerInspirasi.appendChild(kartuDiv);
  });
}

muatInspirasiResep();