import { useState } from 'react';
import CountrySelector from '@/components/CountrySelector';
import PlayerCard from '@/components/PlayerCard';
import { useFootballAPI } from '@/hooks/useFootballAPI';
import { Spinner } from '@/components/ui/spinner';

/**
 * Design Desportivo Moderno - Página Principal do Álbum de Figurinhas
 * 
 * Layout:
 * - Header com título e logo
 * - Sidebar esquerda com seletor de país
 * - Área principal com grid de figurinhas
 * - Animações em cascata para entrada dos cards
 */
export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const { squad, loading, fetchSquad } = useFootballAPI();

  const handleCountrySelect = async (countryCode: string) => {
    setSelectedCountry(countryCode);
    await fetchSquad(countryCode);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-display">⚽</div>
            <div>
              <h1 className="text-3xl font-display">Álbum de Figurinhas</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">
                Explore as seleções de futebol do mundo
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Seletor de País */}
          <aside className="lg:col-span-1">
            <div
              className="sticky top-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-secondary"
              style={{
                backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663658442383/5SPf4nFJSmSFGPndfeTmQx/country-selector-bg-KZPccee9ubMrMV6VndoUGv.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="bg-white/95 rounded-lg p-4">
                <CountrySelector
                  onCountrySelect={handleCountrySelect}
                  isLoading={loading}
                />
                {squad && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                      Seleção Carregada
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {squad.team.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {squad.players.length} jogadores
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Area - Grid de Figurinhas */}
          <main className="lg:col-span-3">
            {!selectedCountry ? (
              // Estado inicial
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-display text-foreground mb-3">
                  Bem-vindo ao Álbum de Figurinhas
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Selecione uma seleção de futebol no painel esquerdo para visualizar os jogadores
                  e explorar suas figurinhas.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto text-3xl">
                  <div>🇧🇷</div>
                  <div>🇦🇷</div>
                  <div>🇫🇷</div>
                  <div>🇩🇪</div>
                  <div>🇪🇸</div>
                  <div>🇮🇹</div>
                </div>
              </div>
            ) : loading ? (
              // Estado de carregamento
              <div className="flex flex-col items-center justify-center py-16">
                <Spinner className="w-12 h-12 text-primary mb-4" />
                <p className="text-muted-foreground">Carregando elenco...</p>
              </div>
            ) : squad && squad.players.length > 0 ? (
              // Grid de jogadores
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-display text-foreground mb-2">
                    {squad.team.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {squad.players.length} jogadores disponíveis
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {squad.players.map((player, index) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Estado de erro ou sem dados
              <div className="text-center py-16">
                <div className="text-5xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nenhum jogador encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente selecionar outra seleção
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>
            Álbum de Figurinhas Virtual • Desenvolvido com Vue 3 e API-Football
          </p>
          <p className="mt-2 text-xs">
            Dados fornecidos por{' '}
            <a
              href="https://api-football.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              api-football.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
