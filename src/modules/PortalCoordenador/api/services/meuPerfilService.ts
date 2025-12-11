import type { HttpClientInterface } from '../../../../api/interface'
import type {
  GetMeuPerfilResponse,
  IMeuPerfil,
  MeuPerfilServiceInterface,
} from '../../entities/meuPerfilEntity'
import type { TMeuPerfil } from '../../meuPerfil/composables/useValidacaoMeuPerfil'

export class MeuPerfilService implements MeuPerfilServiceInterface {
  private httpClient: HttpClientInterface

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  async getMeuPerfil(): Promise<GetMeuPerfilResponse> {
    try {
      return await this.httpClient.get<GetMeuPerfilResponse>('portalfapes/meuperfil')
    } catch (error) {
      throw new Error(`Erro ao buscar meu perfil: ${(error as Error).message}`)
    }
  }

  async saveMeuPerfil(meuPerfil: TMeuPerfil): Promise<IMeuPerfil> {
    return this.httpClient.patch<IMeuPerfil>('portalfapes/meuperfil', meuPerfil)
  }
}
