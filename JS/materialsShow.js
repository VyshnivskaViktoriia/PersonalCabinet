const materialsData = {
    english: [
        { name: "Лекція 1", file: "./TestSecond.pdf", type: "Лекції" },
        { name: "Лекція 2", file: "./test.txt", type: "Лекції" },
        { name: "Лекція 3", file: "materials/english2.pdf", type: "Лекції" },
        { name: "ДЗ 1", file: "materials/english_hw1.pdf", type: "Домашнє завдання" },
        { name: "Тема 1", file: "materials/inf_tasks.pdf", type: "Задачі" },
        { name: "Тема 1", file: "materials/inf_tasks.pdf", type: "Підготовка" }
    ],
    math: [
        { name: "Лекція 1", file: "materials/math1.pdf", type: "Лекції" }
    ],
    informatics: [
        { name: "Тема 1", file: "materials/inf_tasks.pdf", type: "Задачі" },
        { name: "test", file: "materials/test.txt", type: "Інше" }
    ]
};

const container = document.getElementById("materials-container");
const buttons = document.querySelectorAll(".subject-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const subject = button.getAttribute("data-subject");
        showMaterials(subject);
    });
});

function showMaterials(subject) {
    const items = materialsData[subject] || [];
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>Матеріали відсутні.</p>";
        return;
    }

    // Групуємо по типу
    const grouped = {};
    items.forEach(item => {
        if (!grouped[item.type]) {
            grouped[item.type] = [];
        }
        grouped[item.type].push(item);
    });

    // Для кожного типу створюємо секцію
    Object.keys(grouped).forEach(type => {
        const section = document.createElement("div");
        section.classList.add("materials-section");

        // Назва секції
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = type;
        section.appendChild(sectionTitle);

        // Контейнер-сітка карток
        const grid = document.createElement("div");
        grid.classList.add("materials-container");

        grouped[type].forEach(item => {
            const panel = document.createElement("div");
            panel.classList.add("lesson-container");

            const heading = document.createElement("h3");
            heading.textContent = item.name;

            const viewLink = document.createElement("a");
            viewLink.href = item.file;
            viewLink.target = "_blank";
            viewLink.textContent = "Відкрити";
            viewLink.classList.add("download-btn");

            const downloadBtn = document.createElement("a");
            downloadBtn.href = item.file;
            downloadBtn.setAttribute("download", "");
            downloadBtn.textContent = "⬇   Завантажити";
            downloadBtn.classList.add("download-btn");

            panel.appendChild(heading);
            panel.appendChild(viewLink);
            panel.appendChild(downloadBtn);
            grid.appendChild(panel);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });
}