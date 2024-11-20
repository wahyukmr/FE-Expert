const NotificationHelper = {
  async sendNotification({ title, options }) {
    if (!this._checkAvailability()) {
      console.log('Notification not supported in this browser');
      return;
    }

    if (!this._checkPermission()) {
      console.log('User did not yet granted permission');
      await this._requestPermission();

      if (!this._checkPermission()) {
        console.log('Permission still not granted');
        return;
      }
    }

    this._showNotification({ title, options });
  },

  _checkAvailability() {
    return 'Notification' in window;
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    } else if (status === 'default') {
      console.log('Permission closed');
    }
  },
  async _showNotification({ title, options }) {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;

      await serviceWorkerRegistration.showNotification(title, options);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  },
};

export default NotificationHelper;
