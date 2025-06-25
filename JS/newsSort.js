const newsData = {
    important: [
        { 
            title: "Важливе оголошення", 
            content: "Заміна! 1 пара - 25 квітня. Всі студенти повинні бути присутніми.",
            date: "24.04.2024",
            category: "important",
            link: null
        },
        { 
            title: "Перенесення занять", 
            content: "Перенесена 2 пара - 26 квітня. Оновлений розклад доступний в розділі 'Розклад занять'.",
            date: "23.04.2024",
            category: "important",
            link: "timetable.html"
        },
        { 
            title: "Екзаменаційна сесія", 
            content: "Нагадування про початок екзаменаційної сесії. Перевірте розклад екзаменів.",
            date: "22.04.2024",
            category: "important",
            link: null
        }
    ],
    schedule: [
        { 
            title: "Оновлення розкладу", 
            content: "Внесено зміни до розкладу занять на наступний тиждень. Перегляньте оновлення.",
            date: "21.04.2024",
            category: "schedule",
            link: "timetable.html"
        },
        { 
            title: "Заміна викладача", 
            content: "Заміна викладача на заняттях з математики. Деталі в розкладі.",
            date: "20.04.2024",
            category: "schedule",
            link: "timetable.html"
        },
        { 
            title: "Додаткові заняття", 
            content: "Заплановані додаткові заняття з інформатики. Розклад уточнюється.",
            date: "19.04.2024",
            category: "schedule",
            link: null
        }
    ],
    general: [
        { 
            title: "Загальна інформація", 
            content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            date: "18.04.2024",
            category: "general",
            link: null
        },
        { 
            title: "Новини університету", 
            content: "Оновлення про роботу університету та загальні новини для студентів.",
            date: "17.04.2024",
            category: "general",
            link: null
        },
        { 
            title: "Студентське життя", 
            content: "Інформація про майбутні події та активності для студентів.",
            date: "16.04.2024",
            category: "general",
            link: null
        }
    ]
};

const container = document.getElementById("news-container");
const buttons = document.querySelectorAll(".category-btn");

// Add click event listeners to category buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");
        
        const category = button.getAttribute("data-category");
        showNews(category);
    });
});

function showNews(category) {
    container.innerHTML = "";

    if (category === "all") {
        // Show all news grouped by category
        Object.keys(newsData).forEach(cat => {
            const items = newsData[cat];
            if (items.length > 0) {
                createNewsSection(cat, items);
            }
        });
    } else {
        // Show news for specific category
        const items = newsData[category] || [];
        if (items.length === 0) {
            container.innerHTML = "<p style='text-align: center; color: var(--color-text);'>Оголошення відсутні.</p>";
            return;
        }
        createNewsSection(category, items);
    }
}

function createNewsSection(category, items) {
    const section = document.createElement("div");
    section.classList.add("news-section");

    // Section title
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = getCategoryTitle(category);
    section.appendChild(sectionTitle);

    // News grid
    const grid = document.createElement("div");
    grid.classList.add("news-grid");

    items.forEach(item => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-item", item.category);

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("div");
        date.classList.add("news-date");
        date.textContent = item.date;

        const content = document.createElement("p");
        content.textContent = item.content;

        newsCard.appendChild(date);
        newsCard.appendChild(title);
        newsCard.appendChild(content);

        if (item.link) {
            const link = document.createElement("a");
            link.href = item.link;
            link.classList.add("news-link");
            link.textContent = "Детальніше";
            newsCard.appendChild(link);
        }

        grid.appendChild(newsCard);
    });

    section.appendChild(grid);
    container.appendChild(section);
}

function getCategoryTitle(category) {
    const titles = {
        "important": "Важливо",
        "schedule": "Розклад",
        "general": "Загальні"
    };
    return titles[category] || category;
}

// Initialize with all news
showNews("all"); 