import { useAppStore } from '@/store/useAppStore';

export default function ModeIndicator() {
  const { interactionMode, isFocusMode } = useAppStore();  
  const modeLabels = {
    normal: 'Normal Mode',
    focus: 'Focus Mode',
    'isolate-system': 'Isolate System Mode',
    'isolate-organ': 'Isolate Organ Mode'
  };
  
  const modeHints = {
    normal: 'Press F to focus, I to isolate',
    focus: 'Press F to exit focus',
    'isolate-system': 'Press I to cycle modes, D to reset',
    'isolate-organ': 'Press I to cycle modes, D to reset'
  };
  
  return (
    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-semibold text-blue-900 dark:text-blue-100">
          {modeLabels[interactionMode]}
        </span>
      </div>
      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
        {modeHints[interactionMode]}
      </p>
    </div>
  );
}
