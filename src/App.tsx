/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, ParcheEvent } from './types';
import { EVENTS as INITIAL_EVENTS } from './constants';
import Login from './components/Login';
import MapView from './components/MapView';
import FeedView from './components/FeedView';
import DetailView from './components/DetailView';
import CreateEvent from './components/CreateEvent';
import Navigation from './components/Navigation';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [selectedEvent, setSelectedEvent] = useState<ParcheEvent | null>(null);
  const [events, setEvents] = useState<ParcheEvent[]>(INITIAL_EVENTS);

  const navigateToDetail = (event: ParcheEvent) => {
    setSelectedEvent(event);
    setScreen('detail');
  };

  const addEvent = (event: ParcheEvent) => {
    setEvents([event, ...events]);
    setScreen('feed');
  };

  return (
    <div className="relative h-screen w-full bg-parche-bg overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-md h-full relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen === 'detail' && selectedEvent ? `detail-${selectedEvent.id}` : screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 w-full overflow-y-auto no-scrollbar"
          >
            {screen === 'login' && <Login onLogin={() => setScreen('feed')} />}
            {screen === 'map' && <MapView events={events} onSelectEvent={navigateToDetail} />}
            {screen === 'feed' && <FeedView events={events} onSelectEvent={navigateToDetail} />}
            {screen === 'create' && <CreateEvent onBack={() => setScreen('feed')} onSave={addEvent} />}
            {screen === 'detail' && selectedEvent && (
              <DetailView 
                event={selectedEvent} 
                onBack={() => setScreen('feed')} 
              />
            )}
          </motion.div>
        </AnimatePresence>

        {screen !== 'login' && screen !== 'detail' && (
          <Navigation currentScreen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
}

