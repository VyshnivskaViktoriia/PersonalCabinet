const marksData = {
    english: [
        { name: "Present Simple", mark: "4", date: "04.04.25", subject: "english"},
        { name: "Present Simple", mark: "4", date: "04.04.25", subject: "english"},
        { name: "Present Simple", mark: "4", date: "04.04.25", subject: "english" }
    ],
    math: [
        { name: "Math", mark: "3", date: "05.04.25", subject: "math" },
    ],
    informatics: [
        { name: "Inform", mark: "5", date: "06.05.25", subject: "informatics" },
    ]
};

const container = document.getElementById("marks-container");
const buttons = document.querySelectorAll(".subject-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const subject = button.getAttribute("data-subject");
        showMarks(subject);
    });
});

function showMarks(subject) {
    const items = marksData[subject] || [];
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>Оцінки відсутні.</p>";
        return;
    }

    const grouped = {};
    items.forEach(item => {
        if (!grouped[item.subject]) {
            grouped[item.subject] = [];
        }
        grouped[item.subject].push(item);
    });

    Object.keys(grouped).forEach(subject => {
        const table = document.createElement("table");
        table.classList.add("marks-table");

        const tableHead = document.createElement("thead");
        const trTableHead = document.createElement("tr");

        const thTopic = document.createElement("th");
        thTopic.textContent = "Тема";
        const thMarks = document.createElement("th");
        thMarks.textContent = "Оцінка";
        const thDate = document.createElement("th");
        thDate.textContent = "Дата";

        trTableHead.append(thTopic, thMarks, thDate);
        tableHead.appendChild(trTableHead);
        table.appendChild(tableHead);

        const tableBody = document.createElement("tbody");

        // Підрахунок суми оцінок
        let sumMarks = 0;
        const countMarks = grouped[subject].length;

        grouped[subject].forEach(item => {
            const tr = document.createElement("tr");

            const tdTopic = document.createElement("td");
            tdTopic.textContent = item.name;

            const tdMark = document.createElement("td");
            tdMark.textContent = item.mark;

            const tdDate = document.createElement("td");
            tdDate.textContent = item.date;

            tr.append(tdTopic, tdMark, tdDate);
            tableBody.appendChild(tr);

            sumMarks += Number(item.mark); // Додаємо оцінку до суми
        });

        table.appendChild(tableBody);

        // Створюємо футер для середнього балу
        const tfoot = document.createElement("tfoot");
        const trFoot = document.createElement("tr");

        const tdFootLabel = document.createElement("td");
        tdFootLabel.textContent = "Середня оцінка:";
        tdFootLabel.colSpan = 1; // займе 1 стовпець

        const tdFootValue = document.createElement("td");
        tdFootValue.textContent = (sumMarks / countMarks).toFixed(2); // 2 знаки після коми
        tdFootValue.colSpan = 2; // займе два стовпці

        trFoot.append(tdFootLabel, tdFootValue);
        tfoot.appendChild(trFoot);
        table.appendChild(tfoot);

        container.appendChild(table);
    });
}
