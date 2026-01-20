import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';

export default function SystemControls() {
  const { 
    visibleSystems, 
    toggleSystem, 
    isolationMode,
    interactionMode
  } = useAppStore();
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Body Systems
      </h3>
      
      <div className="space-y-2">
        {BODY_SYSTEMS.map(system => (
          <label 
            key={system.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={visibleSystems.includes(system.id)}
              onChange={() => toggleSystem(system.id)}
              disabled={isolationMode !== 'none'}
              className="w-4 h-4 rounded"
              style={{ accentColor: system.color }}
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: system.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {system.name}
            </span>
          </label>
        ))}
      </div>
      
      {isolationMode !== 'none' && (
        <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
          <p className="text-yellow-800 dark:text-yellow-200">
            Isolation mode active. Press 'I' to exit.
          </p>
        </div>
      )}
    </div>
  );
}
