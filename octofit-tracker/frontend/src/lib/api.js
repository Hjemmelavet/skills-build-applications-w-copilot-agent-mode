export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function getApiUrl(resource) {
  const normalizedResource = String(resource).replace(/^\//, '').replace(/\/$/, '');
  return `${getApiBaseUrl()}/${normalizedResource}/`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = ['results', 'items', 'data', 'docs', 'records'];

  for (const key of candidates) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  return [];
}

export async function fetchApi(resource) {
  const response = await fetch(getApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeRecords(payload);
}
