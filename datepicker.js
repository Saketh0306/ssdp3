class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.div = document.getElementById(id);
    this.currentDate = new Date();
    this.selectedDate = this.currentDate;
  }

  render(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Create the calendar header
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    for (const dayOfWeek of daysOfWeek) {
      const headerCell = document.createElement('th');
      headerCell.textContent = dayOfWeek;
      headerRow.appendChild(headerCell);
    }
    header.appendChild(headerRow);

    // Create the calendar body
    const body = document.createElement('tbody');
    for (let i = 0; i < 6; i++) {
      const bodyRow = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        const bodyCell = document.createElement('td');
        const day = i * 7 + j + 1;
        const date = new Date(year, month, day);

        // Determine if the day is in the current month
        if (date.getMonth() === month) {
          bodyCell.textContent = day;
          bodyCell.classList.add('current-month');

          // Add a click listener to select the date
          bodyCell.addEventListener('click', () => {
            this.selectedDate = date;
            this.callback(this.id, this.selectedDate);
          });
        } else {
          // Display days from other months in a dimmed fashion
          bodyCell.textContent = day;
          bodyCell.classList.add('other-month');
        }

        bodyRow.appendChild(bodyCell);
      }
      body.appendChild(bodyRow);
    }

    // Create the calendar footer
    const footer = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    const previousMonthButton = document.createElement('td');
    previousMonthButton.innerHTML = '&lt;';
    previousMonthButton.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render(this.currentDate);
    });
    footerRow.appendChild(previousMonthButton);

    const nextMonthButton = document.createElement('td');
    nextMonthButton.innerHTML = '&gt;';
    nextMonthButton.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render(this.currentDate);
    });
    footerRow.appendChild(nextMonthButton);
    footer.appendChild(footerRow);

    // Clear the contents of the date picker div and append the new calendar
    this.div.innerHTML = '';
    this.div.appendChild(header);
    this.div.appendChild(body);
    this.div.appendChild(footer);

    // Update the calendar's title
    this.div.querySelector('caption').textContent = `${monthNames[month]} ${year}`;
  }
}
