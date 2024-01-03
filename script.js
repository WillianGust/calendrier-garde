// Função para verificar se a data é um dia da mãe
function isMomsDay(date) {
  const dayOfWeek = date.getDay();
  const weekNumber = Math.floor((date.getDate() - 1) / 7);

  if (dayOfWeek === 1 || dayOfWeek === 2) {
    // Segunda ou Terça-feira, pertencendo à semana da mãe
    return true;
  } else if (dayOfWeek === 3 || dayOfWeek === 4) {
    // Quarta ou Quinta-feira, pertencendo à semana do pai
    return false;
  } else if (dayOfWeek === 0) {
    // Domingo, pertencendo à semana da mãe
    return weekNumber % 2 === 1;
  } else if (dayOfWeek >= 5 && weekNumber % 2 === 1) {
    // Sexta ou Sábado pertencendo à semana da mãe
    return true;
  } else {
    return false;
  }
}

// Restante do código permanece inalterado...

// Função para gerar o calendário para um determinado ano
function generateCalendar(year) {
  const calendarContainer = document.getElementById("calendarContainer");
  calendarContainer.innerHTML = ""; // Limpar o conteúdo anterior

  for (let month = 0; month < 12; month++) {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-responsive");

    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "mt-3");
    table.style.width = "100%";

    const caption = document.createElement("caption");
    const monthYearString = new Date(year, month, 1).toLocaleDateString("fr", {
      month: "short",
      year: "2-digit",
    });
    caption.textContent = monthYearString;

    const headerRow = table.insertRow();

    // Adiciona uma célula para mesclar com colspan
    const monthYearCell = document.createElement("th");
    monthYearCell.classList.add("text-center", "month-year-cell");
    monthYearCell.textContent = monthYearString;
    monthYearCell.setAttribute("colspan", "7"); // Mescla com as 7 colunas do cabeçalho
    headerRow.appendChild(monthYearCell);

    // Adiciona a segunda linha para os dias da semana
    const dayOfWeekRow = table.insertRow();
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      dayOfWeekRow.appendChild(th);
    });

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 7; j++) {
        const cell = row.insertCell();
        cell.classList.add("p-2", "text-center");
        if (i === 0 && j < firstDay.getDay()) {
          cell.textContent = "";
        } else if (dayCounter <= daysInMonth) {
          const currentDate = new Date(year, month, dayCounter);
          cell.textContent = dayCounter;
          if (isMomsDay(currentDate)) {
            cell.classList.add("momsDay");
          }
          dayCounter++;
        }
      }
    }

    tableContainer.appendChild(table);
    calendarContainer.appendChild(tableContainer);
  }
}


// Função chamada quando o seletor de ano é alterado
function updateCalendar() {
  const yearSelector = document.getElementById("yearSelector");
  const selectedYear = parseInt(yearSelector.value);
  generateCalendar(selectedYear);
}

// Inicializa o calendário com o ano atual
updateCalendar();

function printCalendar() {
  const calendarContainer = document.getElementById("calendarContainer");
  const printContent = document.createElement("div");
  printContent.innerHTML = `
    <h1>Calendário Anual</h1>
    <div style="overflow-x: auto;">${calendarContainer.innerHTML}</div>
  `;

  const printWindow = window;

  printWindow.document.write(`
    <html>
      <head>
        <title>Calendário Anual</title>
        <style>
          @page { size: letter landscape; margin: 10mm; }
        </style>
      </head>
      <body onload="window.print();">
        ${printContent.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
}
