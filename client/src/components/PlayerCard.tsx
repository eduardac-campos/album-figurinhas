import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Player {
  id: number;
  name: string;
  number?: number;
  position?: string;
  photo?: string;
}

interface PlayerCardProps {
  player: Player;
  index?: number;
}

/**
 * Design Desportivo Moderno - Card de Jogador (Figurinha)
 * - Exibe foto do jogador
 * - Mostra nome, número e posição
 * - Efeito hover com elevação
 * - Animação de entrada em cascata
 */
export default function PlayerCard({ player, index = 0 }: PlayerCardProps) {
  const [imageError, setImageError] = useState(false);

  const animationDelay = index * 40; // Stagger 40ms entre cards

  return (
    <div
      style={{
        animation: `fadeInUp 0.5s ease-out forwards`,
        animationDelay: `${animationDelay}ms`,
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
        {/* Container da imagem */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
          {player.photo && !imageError ? (
            <img
              src={player.photo}
              alt={player.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center">
                <div className="text-4xl font-display text-muted-foreground mb-2">
                  {player.number || '?'}
                </div>
                <p className="text-xs text-muted-foreground">Sem foto</p>
              </div>
            </div>
          )}

          {/* Overlay com informações ao hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
            {player.position && (
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {player.position}
              </p>
            )}
          </div>
        </div>

        {/* Informações do jogador */}
        <div className="p-3 bg-white">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {player.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            {player.number && (
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                #{player.number}
              </span>
            )}
            {player.position && (
              <span className="text-xs text-muted-foreground font-medium">
                {player.position}
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
