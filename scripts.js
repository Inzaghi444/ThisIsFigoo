document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const toQuizButton = document.getElementById('to-quiz');
    const backToMateriButton = document.getElementById('back-to-materi');
    const quizForm = document.getElementById('quiz-form');

    // Buat password dan username untuk login
    const correctUsernames = ['50423620', '50423683', '51423078', '51423243', '51423267', '50423864'];
    const correctPassword = '1IA21';

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // nyocokin apakah username password benar atau salah
        if (correctUsernames.includes(username) && password === correctPassword) {
            alert('Login successful!');
            document.getElementById('home').classList.add('hidden');
            document.getElementById('materi').classList.remove('hidden');
            document.querySelector('header nav ul').classList.remove('hidden');
        } else {
            alert('Invalid username or password');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            sections.forEach(section => section.classList.add('hidden'));
            target.classList.remove('hidden');
        });
    });

    toQuizButton.addEventListener('click', function() {
        sections.forEach(section => section.classList.add('hidden'));
        document.getElementById('quiz').classList.remove('hidden');
    });

    backToMateriButton.addEventListener('click', function() {
        quizForm.reset(); // Reset jawaban quiz kalo back ke materi
        backToMateriButton.classList.add('hidden');
        sections.forEach(section => section.classList.add('hidden'));
        document.getElementById('materi').classList.remove('hidden');
    });

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // cek apakah semua opsi sudah diisi
        const formData = new FormData(quizForm);
        const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']; // daftar semua pertanyaan
        const allOptionsChecked = questions.every(question => formData.has(question));

        if (!allOptionsChecked) {
            alert('Silakan isi semua opsi terlebih dahulu.');
            return; // akan memunculkan popup jika ada pertanyaab yang belum di jawab
        }

        // menentukan jawaban benarnya dan memulai score dari 0 
        let score = 0;
        const answers = {
            q1: 'b', 
            q2: 'c', 
            q3: 'a', 
            q4: 'c', 
            q5: 'a', 
            q6: 'b', 
            q7: 'b', 
            q8: 'a', 
            q9: 'c', 
            q10: 'd',
        };

        for (const [name, value] of formData.entries()) {
            if (value === answers[name]) {
                score++;
            }
        }

        alert('Your score: ' + score + '/10');
        backToMateriButton.classList.remove('hidden');
    });
});

