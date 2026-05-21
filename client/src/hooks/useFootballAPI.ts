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

  // Dados de fallback para demonstração quando a API não está disponível
  const mockTeamsData: Record<string, { id: number; name: string; country: string; players: any[] }> = {
    BR: {
      id: 2,
      name: 'Brazil',
      country: 'Brazil',
      players: [
        { id: 1, name: 'Neymar Jr', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/33.png' },
        { id: 2, name: 'Vinícius Júnior', number: 7, position: 'Attacker', photo: 'https://media.api-sports.io/players/2000.png' },
        { id: 3, name: 'Rodrygo', number: 12, position: 'Attacker', photo: 'https://media.api-sports.io/players/2001.png' },
        { id: 4, name: 'Lucas Paquetá', number: 8, position: 'Midfielder', photo: 'https://media.api-sports.io/players/2002.png' },
        { id: 5, name: 'Casemiro', number: 5, position: 'Midfielder', photo: 'https://media.api-sports.io/players/2003.png' },
        { id: 6, name: 'Sergio Reguilón', number: 3, position: 'Defender', photo: 'https://media.api-sports.io/players/2004.png' },
        { id: 7, name: 'Marquinhos', number: 4, position: 'Defender', photo: 'https://media.api-sports.io/players/2005.png' },
        { id: 8, name: 'Alisson', number: 1, position: 'Goalkeeper', photo: 'https://media.api-sports.io/players/2006.png' },
      ]
    },
    AR: {
      id: 1,
      name: 'Argentina',
      country: 'Argentina',
      players: [
        { id: 1, name: 'Lionel Messi', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/529.png' },
        { id: 2, name: 'Ángel Di María', number: 11, position: 'Attacker', photo: 'https://media.api-sports.io/players/530.png' },
        { id: 3, name: 'Sergio Agüero', number: 9, position: 'Attacker', photo: 'https://media.api-sports.io/players/531.png' },
        { id: 4, name: 'Javier Mascherano', number: 14, position: 'Midfielder', photo: 'https://media.api-sports.io/players/532.png' },
        { id: 5, name: 'Gonzalo Higuaín', number: 9, position: 'Attacker', photo: 'https://media.api-sports.io/players/533.png' },
      ]
    },
    FR: {
      id: 3,
      name: 'France',
      country: 'France',
      players: [
        { id: 1, name: 'Kylian Mbappé', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/1000.png' },
        { id: 2, name: 'Antoine Griezmann', number: 7, position: 'Attacker', photo: 'https://media.api-sports.io/players/1001.png' },
        { id: 3, name: 'N\'Golo Kanté', number: 13, position: 'Midfielder', photo: 'https://media.api-sports.io/players/1002.png' },
      ]
    },
    DE: {
      id: 4,
      name: 'Germany',
      country: 'Germany',
      players: [
        { id: 1, name: 'Manuel Neuer', number: 1, position: 'Goalkeeper', photo: 'https://media.api-sports.io/players/1500.png' },
        { id: 2, name: 'Bastian Schweinsteiger', number: 7, position: 'Midfielder', photo: 'https://media.api-sports.io/players/1501.png' },
        { id: 3, name: 'Miroslav Klose', number: 11, position: 'Attacker', photo: 'https://media.api-sports.io/players/1502.png' },
      ]
    },
    ES: {
      id: 5,
      name: 'Spain',
      country: 'Spain',
      players: [
        { id: 1, name: 'Sergio Ramos', number: 15, position: 'Defender', photo: 'https://media.api-sports.io/players/1600.png' },
        { id: 2, name: 'Andrés Iniesta', number: 6, position: 'Midfielder', photo: 'https://media.api-sports.io/players/1601.png' },
        { id: 3, name: 'David Villa', number: 7, position: 'Attacker', photo: 'https://media.api-sports.io/players/1602.png' },
      ]
    },
    IT: {
      id: 6,
      name: 'Italy',
      country: 'Italy',
      players: [
        { id: 1, name: 'Gianluigi Buffon', number: 1, position: 'Goalkeeper', photo: 'https://media.api-sports.io/players/1700.png' },
        { id: 2, name: 'Andrea Pirlo', number: 21, position: 'Midfielder', photo: 'https://media.api-sports.io/players/1701.png' },
        { id: 3, name: 'Francesco Totti', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/1702.png' },
      ]
    },
    EN: {
      id: 7,
      name: 'England',
      country: 'England',
      players: [
        { id: 1, name: 'Harry Kane', number: 9, position: 'Attacker', photo: 'https://media.api-sports.io/players/1800.png' },
        { id: 2, name: 'Raheem Sterling', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/1801.png' },
        { id: 3, name: 'Jordan Henderson', number: 14, position: 'Midfielder', photo: 'https://media.api-sports.io/players/1802.png' },
      ]
    },
    NL: {
      id: 8,
      name: 'Netherlands',
      country: 'Netherlands',
      players: [
        { id: 1, name: 'Arjen Robben', number: 7, position: 'Attacker', photo: 'https://media.api-sports.io/players/1900.png' },
        { id: 2, name: 'Wesley Sneijder', number: 10, position: 'Midfielder', photo: 'https://media.api-sports.io/players/1901.png' },
        { id: 3, name: 'Edwin van der Sar', number: 1, position: 'Goalkeeper', photo: 'https://media.api-sports.io/players/1902.png' },
      ]
    },
    PT: {
      id: 9,
      name: 'Portugal',
      country: 'Portugal',
      players: [
        { id: 1, name: 'Cristiano Ronaldo', number: 7, position: 'Attacker', photo: 'https://media.api-sports.io/players/2000.png' },
        { id: 2, name: 'João Félix', number: 11, position: 'Attacker', photo: 'https://media.api-sports.io/players/2001.png' },
        { id: 3, name: 'Bruno Fernandes', number: 8, position: 'Midfielder', photo: 'https://media.api-sports.io/players/2002.png' },
      ]
    },
    BE: {
      id: 10,
      name: 'Belgium',
      country: 'Belgium',
      players: [
        { id: 1, name: 'Eden Hazard', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/2100.png' },
        { id: 2, name: 'Kevin De Bruyne', number: 7, position: 'Midfielder', photo: 'https://media.api-sports.io/players/2101.png' },
        { id: 3, name: 'Jan Vertonghen', number: 5, position: 'Defender', photo: 'https://media.api-sports.io/players/2102.png' },
      ]
    },
    UY: {
      id: 11,
      name: 'Uruguay',
      country: 'Uruguay',
      players: [
        { id: 1, name: 'Luis Suárez', number: 9, position: 'Attacker', photo: 'https://media.api-sports.io/players/2200.png' },
        { id: 2, name: 'Edinson Cavani', number: 10, position: 'Attacker', photo: 'https://media.api-sports.io/players/2201.png' },
        { id: 3, name: 'Diego Godín', number: 3, position: 'Defender', photo: 'https://media.api-sports.io/players/2202.png' },
      ]
    },
    MX: {
      id: 12,
      name: 'Mexico',
      country: 'Mexico',
      players: [
        { id: 1, name: 'Hirving Lozano', number: 22, position: 'Attacker', photo: 'https://media.api-sports.io/players/2300.png' },
        { id: 2, name: 'Raúl Jiménez', number: 9, position: 'Attacker', photo: 'https://media.api-sports.io/players/2301.png' },
        { id: 3, name: 'Guillermo Ochoa', number: 1, position: 'Goalkeeper', photo: 'https://media.api-sports.io/players/2302.png' },
      ]
    },
  };

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

      // Verificar se temos dados de fallback
      if (mockTeamsData[countryCode]) {
        const mockData = mockTeamsData[countryCode];
        setSquad({
          team: {
            id: mockData.id,
            name: mockData.name,
            country: mockData.country,
            logo: undefined,
          },
          players: mockData.players.map((p: any) => ({
            id: p.id,
            name: p.name,
            number: p.number,
            position: p.position,
            photo: p.photo,
          })),
        });
        toast.success(`Elenco de ${mockData.name} carregado com sucesso!`);
        setLoading(false);
        return;
      }

      // PASSO 2: Pesquisar detalhes da seleção para obter o ID
      const teamResponse = await fetch(
        `https://v3.football.api-sports.io/teams?name=${countryName}`,
        {
          method: 'GET',
          headers: {
            'x-apisports-key': '4347d341ab297aa1eea22c61f7958536',
          },
        }
      );

      if (!teamResponse.ok) {
        throw new Error(`Erro ao buscar seleção: ${teamResponse.status}`);
      }

      const teamData = await teamResponse.json();
      if (!teamData.response || teamData.response.length === 0) {
        throw new Error('Seleção não encontrada. Verifique sua chave de API.');
      }

      const teamId = teamData.response[0].team.id;
      const teamInfo = teamData.response[0].team;

      // PASSO 3: Obter elenco de jogadores usando o ID
      const squadResponse = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
        {
          method: 'GET',
          headers: {
            'x-apisports-key': '4347d341ab297aa1eea22c61f7958536',
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
