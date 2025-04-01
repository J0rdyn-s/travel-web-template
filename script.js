const startDate = new Date('2025-04-11');
const endDate = new Date('2025-04-21');
const today = new Date();
const scrollContainer = document.getElementById('dayScroll');

const dayList = [];
let activeIndex = 0;

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const i = dayList.length;
  const dateStr = d.toISOString().split('T')[0];
  const label = `Day ${i}`;
  const block = document.createElement('div');
  block.className = 'day-block';
  block.textContent = label;
  block.dataset.date = dateStr;
  block.dataset.index = i;
  scrollContainer.insertBefore(block, scrollContainer.lastElementChild);

  if (d.toDateString() === today.toDateString()) {
    activeIndex = i;
  }

  dayList.push({ label, dateStr });
}

const updateActive = () => {
  const blocks = document.querySelectorAll('.day-block');
  blocks.forEach((el, i) => {
    el.classList.toggle('active', i === activeIndex);
  });
};

let scrollTimeout;
scrollContainer.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const blocks = document.querySelectorAll('.day-block');
    let closest = 0;
    let minDist = Infinity;
    const centerY = window.innerHeight / 2;

    blocks.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - centerY);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    activeIndex = closest;
    updateActive();
  }, 100);
});

updateActive();

// Scroll to today or first item on load
window.onload = () => {
  const blocks = document.querySelectorAll('.day-block');
  blocks[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};