document.addEventListener('DOMContentLoaded', function() {
    // Обновление времени в реальном времени
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    // ФИКСИРОВАННЫЙ уровень угрозы (без анимации)
    const threatMeter = document.querySelector('.meter-bar');
    if (threatMeter) {
        const threatValue = document.querySelector('.threat-value');
        
        // Устанавливаем фиксированные значения
        const fixedThreatLevel = 74;
        threatMeter.style.width = fixedThreatLevel + '%';
        if (threatValue) threatValue.textContent = fixedThreatLevel + '%';
        
        // Устанавливаем цвет в зависимости от уровня
        if (fixedThreatLevel > 80) {
            threatMeter.style.background = 'linear-gradient(90deg, #333333, #ff0000)';
        } else if (fixedThreatLevel > 70) {
            threatMeter.style.background = 'linear-gradient(90deg, #333333, #ff9900)';
        } else {
            threatMeter.style.background = 'linear-gradient(90deg, #333333, #666666)';
        }
    }
    
    // Поиск
    const searchInput = document.querySelector('.nav-search input');
    const searchButton = document.querySelector('.nav-search button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            if (searchInput.value.trim()) {
                alert(`Поиск: "${searchInput.value}"\nРезультаты будут отображены в консоли.`);
                console.log(`Поиск выполнен: "${searchInput.value}"`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                alert(`Поиск: "${this.value}"\nРезультаты будут отображены в консоли.`);
                console.log(`Поиск выполнен: "${this.value}"`);
            }
        });
    }
    
    // Эффект наведения на строки таблицы
    const tableRows = document.querySelectorAll('.data-table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#1a1a1a';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Плавная прокрутка к разделам
    const tocLinks = document.querySelectorAll('.content-toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Эффект мигания статуса
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.opacity = statusIndicator.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000);
    }
    
    // Генератор новых дел
    const generateBtn = document.getElementById('generate-case');
    const generatedContent = document.getElementById('generated-content');
    
    if (generateBtn && generatedContent) {
        const cases = [
            {
                number: "GK-247-92",
                date: "Новая",
                location: "Подземные туннели",
                description: "Обнаружены следы незаконной деятельности. Требуется расследование."
            },
            {
                number: "GK-247-93",
                date: "Новая",
                location: "Заброшенный завод",
                description: "Подозрительная активность в ночное время. Возможна лаборатория."
            },
            {
                number: "GK-247-94",
                date: "Новая",
                location: "Порт Готэма",
                description: "Контрабанда высокотехнологичного оборудования. Причастны коррумпированные чиновники."
            },
            {
                number: "GK-247-95",
                date: "Новая",
                location: "Университет Готэма",
                description: "Исчезновение профессора биохимии. Возможна связь с новым токсином."
            },
            {
                number: "GK-247-96",
                date: "Новая",
                location: "Финансовый район",
                description: "Кибератака на банковские системы. Следы ведут к известному хакеру."
            }
        ];
        
        generateBtn.addEventListener('click', function() {
            // Очищаем предыдущий контент
            generatedContent.innerHTML = '';
            
            // Выбираем случайное дело
            const randomCase = cases[Math.floor(Math.random() * cases.length)];
            
            // Создаем элемент для нового дела
            const caseElement = document.createElement('div');
            caseElement.className = 'generated-case';
            caseElement.innerHTML = `
                <div><strong>${randomCase.number}</strong> | ${randomCase.date}</div>
                <div><i class="fas fa-map-marker-alt"></i> ${randomCase.location}</div>
                <div>${randomCase.description}</div>
            `;
            
            // Добавляем анимацию
            caseElement.style.opacity = '0';
            caseElement.style.transform = 'translateY(20px)';
            
            generatedContent.appendChild(caseElement);
            
            // Анимация появления
            setTimeout(() => {
                caseElement.style.opacity = '1';
                caseElement.style.transform = 'translateY(0)';
                caseElement.style.transition = 'all 0.5s ease';
            }, 100);
            
            // Добавляем кнопку закрытия
            const closeBtn = document.createElement('button');
            closeBtn.className = 'filter-btn';
            closeBtn.style.marginTop = '10px';
            closeBtn.innerHTML = '<i class="fas fa-times"></i> Удалить дело';
            closeBtn.addEventListener('click', function() {
                caseElement.style.opacity = '0';
                caseElement.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (caseElement.parentNode) {
                        caseElement.remove();
                    }
                }, 500);
            });
            
            caseElement.appendChild(closeBtn);
        });
    }
    
    // ========== СИСТЕМА ДОЖДЯ ==========
    const rainContainer = document.getElementById('rain-container');
    if (rainContainer) {
        let rainIntensity = 30; // Количество капель
        let rainSpeed = 1.5; // Скорость падения
        let wind = 0.3; // Сила ветра
        
        // Создание капель дождя
        function createRaindrop() {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            
            // Случайная позиция
            const startX = Math.random() * 100;
            const startY = -20;
            
            // Случайная скорость
            const speed = 1 + Math.random() * 2;
            const size = 15 + Math.random() * 15;
            const opacity = 0.2 + Math.random() * 0.4;
            
            // Применение стилей
            raindrop.style.left = startX + 'vw';
            raindrop.style.top = startY + 'px';
            raindrop.style.height = size + 'px';
            raindrop.style.opacity = opacity;
            raindrop.style.animationDuration = (speed * rainSpeed) + 's';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            
            // Добавление ветра
            raindrop.style.transform = `translateX(${wind * 50}px)`;
            
            // Добавление в контейнер
            rainContainer.appendChild(raindrop);
            
            // Создание волны при "падении" капли
            setTimeout(() => {
                createRipple(startX, startY + 100);
            }, speed * rainSpeed * 1000);
            
            // Удаление капли после анимации
            setTimeout(() => {
                if (raindrop.parentNode) {
                    raindrop.remove();
                }
            }, speed * rainSpeed * 1000 + 1000);
            
            return raindrop;
        }
        
        // Создание волн от капель
        function createRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            ripple.style.left = x + 'vw';
            ripple.style.top = y + 'px';
            
            rainContainer.appendChild(ripple);
            
            // Удаление волны после анимации
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        }
        
        // Запуск дождя
        function startRain() {
            // Создаём начальные капли
            for (let i = 0; i < rainIntensity; i++) {
                setTimeout(() => createRaindrop(), i * 100);
            }
            
            // Постоянное создание новых капель
            setInterval(() => {
                if (Math.random() > 0.3) { // 70% шанс создать новую каплю
                    createRaindrop();
                }
            }, 100);
        }
        
        // Контроль интенсивности дождя
        function setRainIntensity(intensity) {
            rainIntensity = intensity;
        }
        
        // Контроль скорости дождя
        function setRainSpeed(speed) {
            rainSpeed = speed;
        }
        
        // Контроль ветра
        function setWind(force) {
            wind = force;
        }
        
        // Старт дождя
        startRain();
        
        // Смена погоды по таймеру (опционально)
        let weatherTimer = setInterval(() => {
            // Случайное изменение интенсивности
            const newIntensity = 20 + Math.random() * 40;
            setRainIntensity(newIntensity);
            
            // Случайное изменение скорости
            const newSpeed = 0.8 + Math.random() * 1.5;
            setRainSpeed(newSpeed);
            
            // Случайное изменение ветра
            const newWind = -0.5 + Math.random() * 1;
            setWind(newWind);
            
            console.log(`Погода изменена: Интенсивность ${Math.round(newIntensity)}%, Скорость x${newSpeed.toFixed(1)}, Ветер ${newWind > 0 ? '+' : ''}${newWind.toFixed(1)}`);
        }, 30000); // Меняем каждые 30 секунд
        
        // Управление дождём через консоль (для разработки)
        window.rainControl = {
            setIntensity: setRainIntensity,
            setSpeed: setRainSpeed,
            setWind: setWind,
            stop: function() {
                clearInterval(weatherTimer);
                rainContainer.innerHTML = '';
            },
            start: function() {
                startRain();
                weatherTimer = setInterval(() => {
                    const newIntensity = 20 + Math.random() * 40;
                    setRainIntensity(newIntensity);
                    const newSpeed = 0.8 + Math.random() * 1.5;
                    setRainSpeed(newSpeed);
                    const newWind = -0.5 + Math.random() * 1;
                    setWind(newWind);
                }, 30000);
            }
        };
        
        // Консольные команды для управления дождём
        console.log('%c🌧️ СИСТЕМА ДОЖДЯ АКТИВИРОВАНА', 'color: #00ffff; font-weight: bold;');
        console.log('%cДоступные команды:', 'color: #cccccc;');
        console.log('%crainControl.setIntensity(50) - установить интенсивность', 'color: #999999;');
        console.log('%crainControl.setSpeed(2) - установить скорость', 'color: #999999;');
        console.log('%crainControl.setWind(0.5) - установить ветер', 'color: #999999;');
        console.log('%crainControl.stop() - остановить дождь', 'color: #999999;');
        console.log('%crainControl.start() - запустить дождь', 'color: #999999;');
    }
    
    // Консольное сообщение
    console.log('%c⚡ GOTHAM KNIGHT DATABASE ⚡', 'font-family: "Orbitron"; font-size: 20px; color: #ffffff; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);');
    console.log('%cСистема активна. Уровень безопасности: МАКСИМУМ', 'color: #00ff00; font-family: "Share Tech Mono";');
    console.log('%cПогодные условия: ДОЖДЬ. Интенсивность: 30%', 'color: #00ffff; font-family: "Share Tech Mono";');
});