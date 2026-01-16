import { useState } from 'react';
import { Search } from 'lucide-react';
import { ORGANS_DATA } from '@human-body/shared';
import { useAppStore } from '@/store/useAppStore';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof ORGANS_DATA>([]);
  const selectOrgan = useAppStore((state) => state.selectOrgan);
  
  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.length < 2) {
      setResults([]);
      return;
    }
    
    const filtered = ORGANS_DATA.filter(
      (organ) =>
        organ.name.toLowerCase().includes(value.toLowerCase()) ||
        organ.system.toLowerCase().includes(value.toLowerCase()) ||
        organ.function.toLowerCase().includes(value.toLowerCase())
    );
    
    setResults(filtered);
  };
  
  const handleSelect = (organId: string) => {
    selectOrgan(organId);
    setQuery('');
    setResults([]);
  };
  
  return (
    <div className="relative w-96">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search organs, systems..."
          className="ml-2 outline-none flex-1 bg-transparent dark:text-white"
        />
      </div>
      
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
          {results.map((organ) => (
            <div
              key={organ.id}
              className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0"
              onClick={() => handleSelect(organ.id)}
            >
              <div className="font-medium dark:text-white">{organ.name}</div>
              <div className="text-sm text-gray-500">{organ.system}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
