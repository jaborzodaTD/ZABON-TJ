/* ==========================================================================
   ZABON LANGUAGE ACADEMY — SINGLE PAGE APPLICATION (SPA) ENGINE
   Author: JABORZODA FAYZALI
   ========================================================================== */

class ZabonApp {
    constructor() {
        this.data = window.ZABON_DATA;
        this.state = {
            currentView: 'home',
            uiLang: localStorage.getItem('zabon_lang') || 'ru',
            theme: localStorage.getItem('zabon_theme') || 'light',
            streak: parseInt(localStorage.getItem('zabon_streak')) || 1,
            xp: parseInt(localStorage.getItem('zabon_xp')) || 150,
            completedLessons: JSON.parse(localStorage.getItem('zabon_completed')) || [],
            favorites: JSON.parse(localStorage.getItem('zabon_favs')) || [],
            currentLessonStep: 0,
            activeCourseId: 'tg-a1',
            flashcardIndex: 0
        };

        this.init();
    }

    init() {
        this.applyTheme(this.state.theme);
        this.applyUiLanguage(this.state.uiLang);
        this.bindEvents();
        this.updateHeaderStats();
        this.renderCourses('all');
        this.renderDictionary();
        this.renderGrammar();
        this.renderAchievements();
        this.loadFlashcard(0);
        this.renderQuiz();
    }

    bindEvents() {
        // Navigation Switcher
        document.querySelectorAll('[data-target]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                this.navigateTo(target);
            });
        });

        // Language Switcher
        const langSelect = document.getElementById('ui-lang-select');
        langSelect.value = this.state.uiLang;
        langSelect.addEventListener('change', (e) => {
            this.setUiLanguage(e.target.value);
        });

        // Dark/Light Theme Toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
        });
    }

    navigateTo(viewId) {
        this.state.currentView = viewId;
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(btn => btn.classList.remove('active'));

        const targetSec = document.getElementById(`view-${viewId}`);
        if (targetSec) targetSec.classList.add('active');

        document.querySelectorAll(`[data-target="${viewId}"]`).forEach(btn => btn.classList.add('active'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    applyTheme(theme) {
        this.state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zabon_theme', theme);
        const icon = document.querySelector('.theme-icon');
        if (icon) icon.innerText = theme === 'light' ? '🌙' : '☀️';
    }

    setUiLanguage(lang) {
        this.state.uiLang = lang;
        localStorage.setItem('zabon_lang', lang);
        this.applyUiLanguage(lang);
    }

    applyUiLanguage(lang) {
        const dict = this.data.i18n[lang] || this.data.i18n['ru'];
        document.querySelectorAll('.i18n').forEach(el => {
            const key = el.getAttribute('data-key');
            if (dict[key]) el.innerText = dict[key];
        });
    }

    updateHeaderStats() {
        document.getElementById('streak-count').innerText = this.state.streak;
        document.getElementById('xp-count').innerText = this.state.xp;
        document.getElementById('prog-streak').innerText = this.state.streak;
        document.getElementById('prog-xp').innerText = this.state.xp;
        document.getElementById('prog-lessons').innerText = this.state.completedLessons.length;
        document.getElementById('prog-words').innerText = this.data.dictionary.length;
    }

    addXP(amount) {
        this.state.xp += amount;
        localStorage.setItem('zabon_xp', this.state.xp);
        this.updateHeaderStats();
    }

    /* Speech Synthesis (TTS) */
    speakText(text, langCode) {
        if (!('speechSynthesis' in window)) {
            alert('Ваш браузер не поддерживает синтез речи.');
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode === 'tg' ? 'ru-RU' : (langCode === 'ru' ? 'ru-RU' : 'en-US');
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    /* Courses & Lesson Engine */
    renderCourses(filterLang) {
        const container = document.getElementById('courses-list');
        container.innerHTML = '';

        const list = filterLang === 'all' 
            ? this.data.courses 
            : this.data.courses.filter(c => c.lang === filterLang);

        list.forEach(c => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <span class="tag" style="color:var(--primary);font-weight:700;">${c.level}</span>
                <h3 style="margin:10px 0;">${c.title}</h3>
                <p style="color:var(--text-muted);font-size:14px;margin-bottom:16px;">${c.description}</p>
                <button class="btn btn-primary btn-block" onclick="window.zabonApp.startLesson('${c.id}')">Пройти курс →</button>
            `;
            container.appendChild(card);
        });
    }

    filterCoursesByLang(lang) {
        this.navigateTo('courses');
        this.renderCourses(lang);
    }

    startLesson(courseId) {
        this.state.activeCourseId = courseId;
        this.state.currentLessonStep = 0;
        this.navigateTo('lesson');
        this.renderLessonStep();
    }

    renderLessonStep() {
        const lesson = this.data.lessons[this.state.activeCourseId] || this.data.lessons['tg-a1'];
        const step = lesson.steps[this.state.currentLessonStep];
        
        document.getElementById('lesson-step-num').innerText = this.state.currentLessonStep + 1;
        document.getElementById('lesson-total-steps').innerText = lesson.steps.length;
        
        const progressPct = ((this.state.currentLessonStep + 1) / lesson.steps.length) * 100;
        document.getElementById('lesson-progress-bar').style.width = `${progressPct}%`;

        const body = document.getElementById('lesson-card-body');
        body.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <span class="badge-accent" style="color:var(--primary)">СЛОВО / ФРАЗА</span>
                <h2 style="font-size:36px; margin: 16px 0; color: var(--primary);">${step.word}</h2>
                <div style="font-size:20px; margin-bottom:10px;">🇹🇯 <strong>${step.tg}</strong></div>
                <div style="font-size:18px; color:var(--text-muted); margin-bottom:20px;">🇷🇺 ${step.ru}</div>
                <button class="btn btn-outline" onclick="window.zabonApp.speakText('${step.tg}', '${step.audioLang}')">🔊 Озвучить</button>
                <div style="margin-top:24px; padding:16px; background-color:var(--bg); border-radius:var(--radius-sm)">
                    <strong>Пример:</strong> <em>"${step.example}"</em>
                </div>
            </div>
        `;
    }

    nextLessonStep() {
        const lesson = this.data.lessons[this.state.activeCourseId] || this.data.lessons['tg-a1'];
        if (this.state.currentLessonStep < lesson.steps.length - 1) {
            this.state.currentLessonStep++;
            this.renderLessonStep();
        } else {
            this.addXP(30);
            if (!this.state.completedLessons.includes(this.state.activeCourseId)) {
                this.state.completedLessons.push(this.state.activeCourseId);
                localStorage.setItem('zabon_completed', JSON.stringify(this.state.completedLessons));
            }
            alert('🎉 Урок успешно завершён! Вам начислено +30 XP!');
            this.navigateTo('courses');
        }
    }

    prevLessonStep() {
        if (this.state.currentLessonStep > 0) {
            this.state.currentLessonStep--;
            this.renderLessonStep();
        }
    }

    /* Dictionary Engine */
    renderDictionary(category = 'all', searchQuery = '') {
        const container = document.getElementById('dictionary-list');
        container.innerHTML = '';

        let list = this.data.dictionary;
        if (category === 'fav') {
            list = list.filter(item => this.state.favorites.includes(item.id));
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(item => item.en.toLowerCase().includes(q) || item.ru.toLowerCase().includes(q) || item.tg.toLowerCase().includes(q));
        }

        list.forEach(item => {
            const isFav = this.state.favorites.includes(item.id);
            const card = document.createElement('div');
            card.className = 'dict-card';
            card.innerHTML = `
                <button class="fav-btn" onclick="window.zabonApp.toggleFavorite(${item.id})">${isFav ? '❤️' : '🤍'}</button>
                <div class="word-title">${item.en}</div>
                <div class="phonetic">${item.phonetic}</div>
                <div class="translations">
                    <p>🇷🇺 ${item.ru}</p>
                    <p>🇹🇯 ${item.tg}</p>
                </div>
                <p style="font-size:12px; color:var(--text-muted); margin-top:10px;"><em>"${item.example}"</em></p>
                <button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="window.zabonApp.speakText('${item.en}', 'en')">🔊 Audio</button>
            `;
            container.appendChild(card);
        });
    }

    filterDictionary() {
        const q = document.getElementById('dict-search').value;
        this.renderDictionary('all', q);
    }

    setDictCategory(cat, btnEl) {
        document.querySelectorAll('.dict-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
        this.renderDictionary(cat);
    }

    toggleFavorite(id) {
        if (this.state.favorites.includes(id)) {
            this.state.favorites = this.state.favorites.filter(favId => favId !== id);
        } else {
            this.state.favorites.push(id);
        }
        localStorage.setItem('zabon_favs', JSON.stringify(this.state.favorites));
        this.renderDictionary();
    }

    /* Flashcards Engine */
    loadFlashcard(index) {
        const item = this.data.dictionary[index] || this.data.dictionary[0];
        document.getElementById('fc-word-front').innerText = item.en;
        document.getElementById('fc-word-ru').innerText = item.ru;
        document.getElementById('fc-word-tg').innerText = item.tg;
        document.getElementById('fc-example').innerText = `"${item.example}"`;
        document.getElementById('flashcard').classList.remove('flipped');
    }

    rateFlashcard(level) {
        if (level === 'easy') this.addXP(10);
        this.state.flashcardIndex = (this.state.flashcardIndex + 1) % this.data.dictionary.length;
        this.loadFlashcard(this.state.flashcardIndex);
    }

    /* Offline AI Translator Engine */
    performTranslation() {
        const input = document.getElementById('trans-input').value.trim();
        const from = document.getElementById('trans-from').value;
        const to = document.getElementById('trans-to').value;
        const outputBox = document.getElementById('trans-output');

        if (!input) {
            outputBox.innerText = 'Пожалуйста, введите текст...';
            return;
        }

        // Direct dictionary match lookup fallback
        const found = this.data.dictionary.find(item => 
            item.en.toLowerCase() === input.toLowerCase() ||
            item.ru.toLowerCase() === input.toLowerCase() ||
            item.tg.toLowerCase() === input.toLowerCase()
        );

        if (found) {
            outputBox.innerText = found[to] || found['en'];
        } else {
            outputBox.innerText = `[Перевод ZABON Engine]: ${input}`;
        }
    }

    swapTranslatorLangs() {
        const from = document.getElementById('trans-from');
        const to = document.getElementById('trans-to');
        const tmp = from.value;
        from.value = to.value;
        to.value = tmp;
    }

    /* Speech Recognition Engine */
    toggleSpeechRecognition() {
        const btn = document.getElementById('mic-btn');
        const status = document.getElementById('speech-status');

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Ваш браузер не поддерживает Web Speech API.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';

        btn.innerText = '🔴 Слушаю... Говорите';
        status.innerText = 'Говорите в микрофон на английском языке...';

        recognition.start();

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            btn.innerText = '🎙️ Нажмите и говорите';
            status.innerText = `Распознано: "${transcript}"`;
            
            const chat = document.getElementById('speaking-chat');
            chat.innerHTML += `<div class="chat-bubble user"><strong>You:</strong> ${transcript}</div>`;
            
            setTimeout(() => {
                chat.innerHTML += `<div class="chat-bubble bot"><strong>AI Tutor:</strong> Excellent pronunciation! Keep going.</div>`;
            }, 800);
        };

        recognition.onerror = () => {
            btn.innerText = '🎙️ Нажмите и говорите';
            status.innerText = 'Ошибка распознавания. Попробуйте еще раз.';
        };
    }

    /* Quiz Engine */
    renderQuiz() {
        const container = document.getElementById('quiz-card-container');
        const q = this.data.quizzes[0];

        container.innerHTML = `
            <h3>${q.question}</h3>
            <div style="display:flex; flex-direction:column; gap:12px; margin-top:20px;">
                ${q.options.map((opt, idx) => `
                    <button class="btn btn-outline" style="text-align:left;" onclick="window.zabonApp.checkQuizAnswer(${idx}, ${q.correct})">${opt}</button>
                `).join('')}
            </div>
        `;
    }

    checkQuizAnswer(selected, correct) {
        if (selected === correct) {
            alert('✅ Правильно! +20 XP');
            this.addXP(20);
        } else {
            alert('❌ Неправильный ответ. Попробуйте снова!');
        }
    }

    /* Grammar Engine */
    renderGrammar() {
        const container = document.getElementById('grammar-list');
        container.innerHTML = '';

        this.data.grammar.forEach(g => {
            const card = document.createElement('div');
            card.className = 'grammar-card';
            card.innerHTML = `
                <span class="badge-accent">${g.lang}</span>
                <h3 style="margin:12px 0;">${g.title}</h3>
                <p style="color:var(--text-muted); font-size:14px;">${g.content}</p>
            `;
            container.appendChild(card);
        });
    }

    /* Achievements Engine */
    renderAchievements() {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';

        this.data.achievements.forEach(a => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML = `
                <div style="font-size:32px; margin-bottom:8px;">${a.icon}</div>
                <h4>${a.title}</h4>
                <p style="font-size:12px; color:var(--text-muted);">${a.desc}</p>
            `;
            container.appendChild(card);
        });
    }
}

// Global App Initialization
window.addEventListener('DOMContentLoaded', () => {
    window.zabonApp = new ZabonApp();

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log('ZABON Service Worker Registered'))
            .catch(err => console.error('SW Registration Failed:', err));
    }
});
