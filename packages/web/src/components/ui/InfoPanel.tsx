import { useAppStore } from '@/store/useAppStore';
import { ORGANS_DATA, BODY_SYSTEMS } from '@human-body/shared';
import { X } from 'lucide-react';

export default function InfoPanel() {
  const selectedOrgan = useAppStore((state) => state.selectedOrgan);
  const selectOrgan = useAppStore((state) => state.selectOrgan);
  
  const organ = ORGANS_DATA.find((o) => o.id === selectedOrgan);
  const system = BODY_SYSTEMS.find(s => s.id === organ?.system);
  
  if (!organ) return null;
  
  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto">
      <button
        onClick={() => selectOrgan(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <X size={24} />
      </button>
      
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {organ.name}
      </h2>
      
      {/* System Badge */}
      {system && (
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: system.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {system.name}
            </span>
          </div>
        </div>
      )}
      
      {/* Description */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Description
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {organ.info.description}
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Location</h3>
          <p className="text-gray-600 dark:text-gray-300">{organ.location}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Function</h3>
          <p className="text-gray-600 dark:text-gray-300">{organ.function}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Size</h3>
          <p className="text-gray-600 dark:text-gray-300">{organ.info.size}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Weight</h3>
          <p className="text-gray-600 dark:text-gray-300">{organ.info.weight}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Interesting Facts</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            {organ.info.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
        
        {organ.relatedOrgans.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Related Organs</h3>
            <div className="flex flex-wrap gap-2">
              {organ.relatedOrgans.map((relatedId) => {
                const relatedOrgan = ORGANS_DATA.find((o) => o.id === relatedId);
                return relatedOrgan ? (
                  <button
                    key={relatedId}
                    onClick={() => selectOrgan(relatedId)}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {relatedOrgan.name}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
