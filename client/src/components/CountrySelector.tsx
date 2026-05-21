import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

interface Country {
  name: string;
  code: string;
  flag?: string;
}

interface CountrySelectorProps {
  onCountrySelect: (country: string) => void;
  isLoading?: boolean;
}

/**
 * Design Desportivo Moderno - Componente de Seletor de País
 * - Carrega lista de países da API-Football
 * - Exibe bandeiras e nomes dos países
 * - Dispara callback ao selecionar um país
 */
export default function CountrySelector({ onCountrySelect, isLoading = false }: CountrySelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        // Nota: A chave de API deve ser fornecida pelo utilizador
        // Para desenvolvimento, usar dados em cache local
        const mockCountries: Country[] = [
          { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
          { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
          { name: 'France', code: 'FR', flag: '🇫🇷' },
          { name: 'Germany', code: 'DE', flag: '🇩🇪' },
          { name: 'Spain', code: 'ES', flag: '🇪🇸' },
          { name: 'Italy', code: 'IT', flag: '🇮🇹' },
          { name: 'England', code: 'EN', flag: '🇬🇧' },
          { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
          { name: 'Portugal', code: 'PT', flag: '🇵🇹' },
          { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
          { name: 'Uruguay', code: 'UY', flag: '🇺🇾' },
          { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
        ];
        setCountries(mockCountries);
      } catch (error) {
        console.error('Erro ao carregar países:', error);
        toast.error('Falha ao carregar lista de países');
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    onCountrySelect(value);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-foreground mb-3">
        Selecione uma Seleção
      </label>
      <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={loading || isLoading}>
        <SelectTrigger className="w-full bg-white border-2 border-primary/20 hover:border-primary/40 transition-colors">
          {loading || isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner className="w-4 h-4" />
              <span>Carregando...</span>
            </div>
          ) : (
            <SelectValue placeholder="Escolha um país..." />
          )}
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
