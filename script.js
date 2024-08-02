document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');

    // Populate year select with options
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const yearDiv = document.createElement('div');
        yearDiv.className = 'select-item';
        yearDiv.textContent = i;
        yearDiv.dataset.value = i;
        yearSelect.appendChild(yearDiv);
    }

    // Populate month select with options
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'select-item';
        monthDiv.textContent = month;
        monthDiv.dataset.value = index + 1;
        monthSelect.appendChild(monthDiv);
    });

    let selectedYear = null;
    let selectedMonth = null;

    const enableConfirmButton = () => {
        if (selectedYear && selectedMonth) {
            confirmBtn.disabled = false;
        } else {
            confirmBtn.disabled = true;
        }
    };

    const smoothScroll = (container, targetPosition, duration) => {
        const start = container.scrollTop;
        const change = targetPosition - start;
        const increment = 20;

        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            container.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    };

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const scrollToCenter = (container, item) => {
        const containerHeight = container.clientHeight;
        const itemHeight = item.clientHeight;

        // Get the top offset of the item relative to the container
        const itemTop = item.offsetTop - container.offsetTop;

        // Calculate the middle of the container and the item
        const containerMiddle = containerHeight / 2;
        const itemMiddle = itemHeight / 2;

        // Calculate the scroll position to center the item
        const scrollPosition = itemTop - containerMiddle + itemMiddle;

        smoothScroll(container, scrollPosition, 500); // 500ms for 0.5 second
    };


    yearSelect.addEventListener('click', (e) => {
        if (e.target.classList.contains('select-item')) {
            document.querySelectorAll('#yearSelect .select-item').forEach(item => item.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedYear = e.target.dataset.value;
            enableConfirmButton();
            scrollToCenter(yearSelect, e.target);
        }
    });

    monthSelect.addEventListener('click', (e) => {
        if (e.target.classList.contains('select-item')) {
            document.querySelectorAll('#monthSelect .select-item').forEach(item => item.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedMonth = e.target.dataset.value;
            enableConfirmButton();
            scrollToCenter(monthSelect, e.target);
        }
    });

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        // Clear active selections
        document.querySelectorAll('.select-item').forEach(item => item.classList.remove('selected'));
        selectedYear = null;
        selectedMonth = null;
        enableConfirmButton();
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedYear && selectedMonth) {
            alert(`Selected Year: ${selectedYear}, Selected Month: ${selectedMonth}`);
            popup.style.display = 'none';
        } else {
            alert('Please select both a year and a month.');
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});
