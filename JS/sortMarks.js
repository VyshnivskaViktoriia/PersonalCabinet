const tableBody = document.querySelector('.marks-table tbody');

    const arrows = {
        subject: document.getElementById('arrow-subject'),
        grade: document.getElementById('arrow-grade')
    };

    const sortDirections = {
        subject: true, // true = ascending
        grade: true
    };

    function resetArrows(exceptKey) {
        for (let key in arrows) {
            if (key !== exceptKey) {
                arrows[key].textContent = '▼';
            }
        }
    }

    function sortTableByColumn(columnIndex, isNumeric, sortKey) {
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            let valA = a.children[columnIndex].textContent.trim();
            let valB = b.children[columnIndex].textContent.trim();

            if (isNumeric) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            } else {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return sortDirections[sortKey] ? -1 : 1;
            if (valA > valB) return sortDirections[sortKey] ? 1 : -1;
            return 0;
        });

        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));

        // оновити стрілку
        arrows[sortKey].textContent = sortDirections[sortKey] ? '▲' : '▼';
        resetArrows(sortKey);

        sortDirections[sortKey] = !sortDirections[sortKey];
    }

    document.getElementById('sort-subject').addEventListener('click', () => {
        sortTableByColumn(0, false, 'subject');
    });

    document.getElementById('sort-grade').addEventListener('click', () => {
        sortTableByColumn(1, true, 'grade');
    });

    // візуальні підказки
    document.getElementById('sort-subject').style.cursor = 'pointer';
    document.getElementById('sort-grade').style.cursor = 'pointer';