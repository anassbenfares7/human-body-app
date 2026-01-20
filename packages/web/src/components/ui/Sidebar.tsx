import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';
import { useState } from 'react';
import SystemControls from './SystemControls';
import ModeIndicator from './ModeIndicator';

export default function Sidebar() {
  const { visibleSystems, toggleSystem, setGender, selectedGender, viewMode, setViewMode } = useAppStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 space-y-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          {isCollapsed ? '→' : '←'}
        </button>
        
        {/* Phase 2 Components */}
        <ModeIndicator />
        <SystemControls />
      </div>

      {!isCollapsed && (
        <>
          {/* Gender Selection */}
          <div className="px-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Gender
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedGender === 'male'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedGender === 'female'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Body Systems */}
          <div className="px-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Body Systems
            </h3>
            <div className="space-y-2">
              {BODY_SYSTEMS.map((system) => (
                <button
                  key={system.id}
                  onClick={() => toggleSystem(system.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    visibleSystems.includes(system.id)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: system.color }}
                  />
                  {system.name}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode */}
          <div className="px-4 mt-6">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              View Mode
            </h3>
            <div className="space-y-2">
              {(['macro', 'micro', 'nano'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
