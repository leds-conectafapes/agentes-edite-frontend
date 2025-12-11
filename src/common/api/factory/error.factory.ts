export class ApiError extends Error {
  constructor(
    public readonly statusCode: number | undefined,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function errorFactory(statusCode?: number): Error {
  switch (statusCode) {
    case 400:
      return new ApiError(statusCode, 'Requisição inválida')
    case 401:
      return new ApiError(statusCode, 'Não autorizado')
    case 403:
      return new ApiError(statusCode, 'Acesso negado')
    case 404:
      return new ApiError(statusCode, 'Recurso não encontrado')
    case 500:
      return new ApiError(statusCode, 'Erro interno do servidor')
    default:
      return new ApiError(statusCode, 'Erro desconhecido na comunicação com o servidor')
  }
}
