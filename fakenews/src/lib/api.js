const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Enhanced error handling
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      throw error;
    }
  }

  // Auth methods
  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async signin(credentials) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signout() {
    return this.request('/auth/signout', {
      method: 'POST',
    });
  }

  async refreshToken(refreshToken) {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // News methods
  async analyzeNews(data) {
    return this.request('/news/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTrendingNews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/news/trending?${queryString}`);
  }

  async getNewsPreview(url) {
    return this.request(`/news/preview?url=${encodeURIComponent(url)}`);
  }

  async searchNews(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/news/search?${queryString}`);
  }

  // Analysis methods
  async getAnalysisHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/analysis/history?${queryString}`);
  }

  async getAnalysis(id) {
    return this.request(`/analysis/${id}`);
  }

  async deleteAnalysis(id) {
    return this.request(`/analysis/${id}`, {
      method: 'DELETE',
    });
  }

  async getAnalysisStats() {
    return this.request('/analysis/stats/summary');
  }

  // User methods
  async getUserProfile() {
    return this.request('/user/profile');
  }

  async updateUserProfile(data) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateAvatar(avatarUrl) {
    return this.request('/user/avatar', {
      method: 'POST',
      body: JSON.stringify({ avatar_url: avatarUrl }),
    });
  }

  async deleteAccount() {
    return this.request('/user/account', {
      method: 'DELETE',
    });
  }

  // Contact methods
  async submitContact(data) {
    return this.request('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Real-time news methods
  async getBreakingNews() {
    return this.request('/news/breaking');
  }

  async getNewsByCategory(category) {
    return this.request(`/news/category/${category}`);
  }

  async reportFakeNews(data) {
    return this.request('/news/report', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Advanced analytics
  async getDetailedAnalytics(timeRange = '30d') {
    return this.request(`/analytics/detailed?range=${timeRange}`);
  }

  async getGlobalStats() {
    return this.request('/analytics/global');
  }
}

export const apiClient = new ApiClient();