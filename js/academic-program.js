    // Show mobile academic program only on mobile devices
    function handleparent() {
        var mobileDiv = document.getElementById('docs-mobile');
        var desktopDiv = document.getElementById('DOCS');
        if (window.innerWidth <= 768) {
            if (mobileDiv) mobileDiv.style.display = 'block';
            if (desktopDiv) desktopDiv.style.display = 'none';
        } else {
            if (mobileDiv) mobileDiv.style.display = 'none';
            if (desktopDiv) desktopDiv.style.display = 'block';
        }
    }
    window.addEventListener('DOMContentLoaded', handleparent);
    window.addEventListener('resize', handleparent);

    // --- Dynamic Drive Link Filling for Mobile Docs (no toggle, both links shown) ---
    const driveLinks = {
        ICSD: {
            S1: { cours: 'https://drive.google.com/drive/folders/1s6WzmSmZupyTijVJXxNJ2evNexHmldBE', exams: 'https://drive.google.com/drive/folders/1EJgxWve_cVwK2iYFO1LMiDLkMHzqJwjV' },
            S2: { cours: 'https://drive.google.com/drive/folders/1TkcKIJuG4mnC7v-Xj2XSHLtfABXpEs6j', exams: 'https://drive.google.com/drive/folders/1Tn1phwAC5Cn8kae5WFg8JR5xmban2G29' },
            S3: { cours: 'https://drive.google.com/drive/folders/1gTFkn1POwgFOWeLyEa6wqY4IxCOYEVmE', exams: null },
            S4: { cours: 'https://drive.google.com/drive/folders/122BL0x6QllGCk92Cq5Mnib3kYgYg2R3l', exams: null },
            S5: { cours: 'https://drive.google.com/drive/folders/1c0jMGlwn-9-_v4jQK9dinR5nT5F-8rkQ', exams: null }
        },
        IIN: {
            S1: { cours: 'https://drive.google.com/drive/folders/1Z6rM5CBs_etFk5b3AyancgFVt_x0r0oN', exams: null },
            S2: { cours: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6', exams: null },
            S3: { cours: 'https://drive.google.com/drive/folders/1D43HzgMLvWOYYgbOQ5d5r3ntnix6FGEW', exams: null },
            S4: { cours: 'https://drive.google.com/drive/folders/16126Y86_nLcMBHNvi2iVv60OLjuUk43_', exams: null },
            S5: { cours: 'https://drive.google.com/drive/folders/1Dxx8ARjbQsBlYCoYkuOGatnWZDUbe-6e', exams: null }
        },
        ISSIC: {
            S1: { cours: 'https://drive.google.com/drive/folders/1qFXZPEVXIKbER_0aRXz8v_bsrr2UZqQ-', exams: null },
            S2: { cours: 'https://drive.google.com/drive/folders/15gn__tOlxPRHbLdLVU-jS5B7yxw0SS7F', exams: null },
            S3: { cours: 'https://drive.google.com/drive/folders/1VaJJBNPK66IGq9hHrsFESGft_fQ0twUF', exams: null },
            S4: { cours: 'https://drive.google.com/drive/folders/16tvltamZoOuKuFHPPyMSq_VDiXkpBvzC', exams: null },
            S5: { cours: 'https://drive.google.com/drive/folders/16gm1w3qYYWNmAQ1Kkl955fhBta_BDdjm', exams: null }
        },
        ISITD: {
            S1: { cours: 'https://drive.google.com/drive/folders/1Z6rM5CBs_etFk5b3AyancgFVt_x0r0oN', exams: null },
            S2: { cours: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6', exams: null },
            S3: { cours: 'https://drive.google.com/drive/folders/1gIAvUKHR-yoauqHUZDJNXGEOHirEcldZ', exams: null },
            S4: { cours: 'https://drive.google.com/drive/folders/1p4lo9cpbIH1chuCyK2mufnsa7d34oaF8', exams: null },
            S5: { cours: 'https://drive.google.com/drive/folders/1gWdRBG5M52R_e23-C-Ibpn7kdKzIDqWF', exams: null }
        }
    };

    let selectedMajor = 'ICSD';
    let selectedSemestre = 'S1';

    function updateLinks() {
        const coursLink = document.getElementById('cours-link');
        const examsLink = document.getElementById('exams-link');
        const data = driveLinks[selectedMajor][selectedSemestre];
        // Cours & TP
        if (data && data.cours) {
            coursLink.href = data.cours;
            coursLink.style.pointerEvents = '';
            coursLink.style.opacity = '1';
        } else {
            coursLink.href = '#';
            coursLink.style.pointerEvents = 'none';
            coursLink.style.opacity = '0.4';
        }
        // Exams
        if (data && data.exams) {
            examsLink.href = data.exams;
            examsLink.style.pointerEvents = '';
            examsLink.style.opacity = '1';
        } else {
            examsLink.href = '#';
            examsLink.style.pointerEvents = 'none';
            examsLink.style.opacity = '0.4';
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const filiereSelect = document.querySelector('.filiere-mobile-select');
        filiereSelect.addEventListener('change', function() {
            selectedMajor = filiereSelect.value;
            updateLinks();
        });
        const semestreSelect = document.querySelector('.semestre-mobile-select');
        semestreSelect.addEventListener('change', function() {
            selectedSemestre = semestreSelect.value;
            updateLinks();
        });
        updateLinks();
    });

    // Show mobile academic program only on mobile devices
    function handleAcademicProgramMobile() {
        var mobileDiv = document.getElementById('Academic-Program-mobile');
        var desktopDiv = document.getElementById('Academic-Program');
        if (window.innerWidth <= 768) {
            if (mobileDiv) mobileDiv.style.display = 'block';
            if (desktopDiv) desktopDiv.style.display = 'none';
        } else {
            if (mobileDiv) mobileDiv.style.display = 'none';
            if (desktopDiv) desktopDiv.style.display = 'block';
        }
    }
    window.addEventListener('DOMContentLoaded', handleAcademicProgramMobile);
    window.addEventListener('resize', handleAcademicProgramMobile);