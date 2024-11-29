class EventBus {
  constructor() {
    this.events = {};
  }

  // On (Subscribe): Komponen lain mendengarkan (listening) event tersebut untuk merespons
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // Emit (Trigger): Komponen mengirimkan sebuah event ketika sesuatu terjadi
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }

  // Hapus listener jika tidak diperlukan lagi
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

export default new EventBus();
