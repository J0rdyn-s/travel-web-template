function dayPicker() {
  return {
    days: [],
    activeIndex: 0,
    init() {
      const start = new Date('2025-04-11');
      const end = new Date('2025-04-21');
      const today = new Date();

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const i = this.days.length;
        const dateStr = d.toISOString().split('T')[0];
        this.days.push({ label: `Day ${i}`, date: dateStr });

        if (d.toDateString() === today.toDateString()) {
          this.activeIndex = i;
        }
      }

      this.$nextTick(() => {
        this.scrollToActive();
      });
    },
    onScroll() {
      const blocks = this.$refs.scrollContainer.querySelectorAll('div.snap-center');
      const centerY = window.innerHeight / 2;
      let closest = 0;
      let minDist = Infinity;

      blocks.forEach((el, i) => {
        if (i === 0 || i === blocks.length - 1) return; // skip spacer
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - centerY);
        if (dist < minDist) {
          minDist = dist;
          closest = i - 1;
        }
      });

      this.activeIndex = closest;
    },
    scrollToActive() {
      const el = this.$refs.scrollContainer.querySelectorAll('div.snap-center')[this.activeIndex + 1];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
}