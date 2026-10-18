const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('pluralis_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorMessage = 'Erro ao processar requisição';
      try {
        const errorData = await response.json();
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message || errorMessage;
      } catch {
        // Fallback para status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Auth
  async login(email: string, senha: string) {
    return this.request<{ accessToken: string; usuario: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  }

  async registrar(dados: { nome: string; email: string; senha: string; iesId: string; cargo?: 'GESTOR' | 'PROFESSOR' | 'NAI' }) {
    return this.request<{ accessToken: string; usuario: any }>('/auth/registro', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  async loginGoogle(googleId: string, email: string, nome: string) {
    return this.request<{ accessToken: string; usuario: any }>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ googleId, email, nome }),
    });
  }

  // Materiais (RF02, RF04, RF05, RF06)
  async adaptarMaterial(dados: {
    conteudoOriginal: string;
    tipoAdaptacao: string;
    instrucoesAdicionais?: string;
  }) {
    return this.request<any>('/materiais/adaptar', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  async salvarMaterial(dados: {
    titulo: string;
    conteudoOriginal: string;
    conteudoAdaptado: string;
    tipoAdaptacao: string;
    urlAudio?: string;
    publico?: boolean;
    revisaoHumanaConfirmada: boolean;
  }) {
    return this.request<any>('/materiais', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  async listarMateriaisPublicos(termo?: string, tipo?: string) {
    const params = new URLSearchParams();
    if (termo) params.append('q', termo);
    if (tipo) params.append('tipo', tipo);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/materiais/publicos${queryString}`);
  }

  async reportarMaterial(id: string, motivo: string) {
    return this.request<any>(`/materiais/${id}/reportar`, {
      method: 'POST',
      body: JSON.stringify({ motivo }),
    });
  }

  // Capacitação (RF01 e RF03)
  async listarTrilhas() {
    return this.request<any[]>('/capacitacao/trilhas');
  }

  async listarPrompts(categoria?: string) {
    const queryString = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
    return this.request<any[]>(`/capacitacao/prompts${queryString}`);
  }

  // Fórum / Comunidade (RF07)
  async listarTopicos(categoria?: string) {
    const queryString = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
    return this.request<any[]>(`/forum/topicos${queryString}`);
  }

  async criarTopico(dados: { titulo: string; conteudo: string; categoria?: string }) {
    return this.request<any>('/forum/topicos', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }
}

export const api = new ApiService();
