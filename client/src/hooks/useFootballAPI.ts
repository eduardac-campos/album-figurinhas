import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface Player {
  id: number;
  name: string;
  number?: number;
  position?: string;
  photo?: string;
}

interface Team {
  id: number;
  name: string;
  country: string;
  logo?: string;
}

interface SquadResponse {
  team: Team;
  players: Player[];
}

/**
 * Design Desportivo Moderno - Hook para integração com API-Football
 * 
 * Fluxo de dados encadeado:
 * 1. Carregar países (já implementado em CountrySelector)
 * 2. Descobrir ID do país ao selecionar
 * 3. Obter figurinhas (elenco) usando o ID
 */
export function useFootballAPI() {
  const [squad, setSquad] = useState<SquadResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para descobrir ID do país e carregar elenco
  const fetchSquad = useCallback(async (countryCode: string) => {
    try {
      setLoading(true);
      setError(null);

      // Mapeamento de códigos de país para nomes de seleção
      const countryMap: Record<string, string> = {
        BR: 'brazil',
        AR: 'argentina',
        FR: 'france',
        DE: 'germany',
        ES: 'spain',
        IT: 'italy',
        EN: 'england',
        NL: 'netherlands',
        PT: 'portugal',
        BE: 'belgium',
        UY: 'uruguay',
        MX: 'mexico',
      };

      const countryName = countryMap[countryCode];
      if (!countryName) {
        throw new Error('País não suportado');
      }

      // PASSO 2: Pesquisar detalhes da seleção para obter o ID
      const teamResponse = await fetch(
        `https://v3.football.api-sports.io/teams?name=${countryName}`,
        {
          method: 'GET',
          headers: {
            'x-apisports-key': 'demo', // Usar 'demo' para testes ou variável de ambiente
          },
        }
      );

      if (!teamResponse.ok) {
        throw new Error(`Erro ao buscar seleção: ${teamResponse.status}`);
      }

      const teamData = await teamResponse.json();
      if (!teamData.response || teamData.response.length === 0) {
        throw new Error('Seleção não encontrada');
      }

      const teamId = teamData.response[0].team.id;
      const teamInfo = teamData.response[0].team;

      // PASSO 3: Obter elenco de jogadores usando o ID
      const squadResponse = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
        {
          method: 'GET',
          headers: {
            'x-apisports-key': 'demo',
          },
        }
      );

      if (!squadResponse.ok) {
        throw new Error(`Erro ao buscar elenco: ${squadResponse.status}`);
      }

      const squadData = await squadResponse.json();
      if (!squadData.response || squadData.response.length === 0) {
        throw new Error('Elenco não encontrado');
      }

      const players = squadData.response[0].players || [];

      setSquad({
        team: {
          id: teamInfo.id,
          name: teamInfo.name,
          country: teamInfo.country,
          logo: teamInfo.logo,
        },
        players: players.map((p: any) => ({
          id: p.id,
          name: p.player?.name || 'Desconhecido',
          number: p.player?.number,
          position: p.player?.position,
          photo: p.player?.photo,
        })),
      });

      toast.success(`Elenco de ${teamInfo.name} carregado com sucesso!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast.error(`Erro: ${errorMessage}`);
      console.error('Erro ao buscar elenco:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    squad,
    loading,
    error,
    fetchSquad,
  };
}
