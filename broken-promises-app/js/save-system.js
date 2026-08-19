// ============================================================
//  СИСТЕМА СОХРАНЕНИЯ (3 слота)
// ============================================================
var SaveSystem = {
    slots: [1, 2, 3],
    currentSlot: null,

    getSlotKey: function(slot) {
        return 'save_slot_' + slot;
    },

    save: function(slot, data) {
        var key = this.getSlotKey(slot);
        var saveData = {
            scene: data.scene,
            visited: Array.from(data.visited),
            stats: data.stats,
            date: new Date().toLocaleString(),
            progress: data.progress || 0
        };
        localStorage.setItem(key, JSON.stringify(saveData));
        this.updateSlotUI(slot);
    },

    load: function(slot) {
        var key = this.getSlotKey(slot);
        var raw = localStorage.getItem(key);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch(e) {
            return null;
        }
    },

    delete: function(slot) {
        var key = this.getSlotKey(slot);
        localStorage.removeItem(key);
        this.updateSlotUI(slot);
    },

    getAllSlots: function() {
        var result = {};
        for (var i = 0; i < this.slots.length; i++) {
            var s = this.slots[i];
            var data = this.load(s);
            result[s] = data;
        }
        return result;
    },

    updateSlotUI: function(slot) {
        var data = this.load(slot);
        var container = document.getElementById('slot-' + slot);
        if (!container) return;
        if (data) {
            container.innerHTML = 
                '<span class="slot-date">' + data.date + '</span>' +
                '<span class="slot-progress">' + data.progress + '%</span>' +
                '<span class="slot-chapter">Глава ' + (data.stats && data.stats.chapter ? data.stats.chapter : '?') + '</span>';
            container.className = 'slot-card occupied';
        } else {
            container.innerHTML = '<span class="slot-empty">Пусто</span>';
            container.className = 'slot-card empty';
        }
    }
};
