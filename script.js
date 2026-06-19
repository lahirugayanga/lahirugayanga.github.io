// Auto-build language filters from the repo cards (excludes the ghost card).
(function () {
    const grid = document.getElementById('repoGrid');
    const cards = [...grid.querySelectorAll('.repo:not([data-keep])')];
    const filters = document.getElementById('filters');

    // Tally languages
    const counts = {};
    cards.forEach(c => {
        const l = c.dataset.lang || 'Other';
        counts[l] = (counts[l] || 0) + 1;
    });

    const makeChip = (label, count, value, pressed) => {
        const b = document.createElement('button');
        b.className = 'filter';
        b.type = 'button';
        b.dataset.filter = value;
        b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        b.innerHTML = label + (count != null ? ' <span class="count">' + count + '</span>' : '');
        return b;
    };

    filters.appendChild(makeChip('All', cards.length, 'all', true));
    Object.keys(counts).sort().forEach(lang => {
        filters.appendChild(makeChip(lang, counts[lang], lang, false));
    });

    filters.addEventListener('click', e => {
        const btn = e.target.closest('.filter');
        if (!btn) return;
        filters.querySelectorAll('.filter').forEach(f => f.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        const f = btn.dataset.filter;
        cards.forEach(c => {
            c.hidden = !(f === 'all' || c.dataset.lang === f);
        });
    });

    document.getElementById('year').textContent = new Date().getFullYear();
})();
