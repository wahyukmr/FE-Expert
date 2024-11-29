import { TIMEOUT } from '../config/constants';

export default class ApiServices {
  constructor(baseURL, method = 'GET', uploadData = null) {
    this._baseURL = baseURL;
    this._method = method;
    this._uploadData = uploadData;
  }

  async ajax() {
    // eslint-disable-next-line no-useless-catch
    try {
      const fetchRequest = this._uploadData
        ? await fetch(this._baseURL, {
            method: this._method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this._uploadData),
          })
        : await fetch(this._baseURL, { method: this._method });

      const response = await Promise.race([fetchRequest, this._timeout()]);
      if (!response.ok) throw new Error('Failed to fetch data from API');
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  _timeout() {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request took too long! Timeout after five seconds`));
      }, TIMEOUT.LONG);
    });
  }
}
