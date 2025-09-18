import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  date: Date;
  location: string;
  clubName: string;
  clubLogoUrl: string;
}

interface State {
  events: Event[];
  registeredEventIds: Set<string>;
  savedEventIds: Set<string>;
  followedClubNames: Set<string>;
  filter: 'all' | 'subscribed';
}

type Action =
  | { type: 'ADD_EVENT'; payload: { eventData: Omit<Event, 'id' | 'clubName' | 'clubLogoUrl'>; adminClubInfo: { clubName: string; clubLogoUrl: string; }; }; }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'TOGGLE_REGISTRATION'; payload: string }
  | { type: 'TOGGLE_SAVE'; payload: string }
  | { type: 'TOGGLE_FOLLOW'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'subscribed' };

const eventsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_EVENT':
      const newEvent: Event = {
        ...action.payload.eventData,
        id: Date.now().toString(),
        clubName: action.payload.adminClubInfo.clubName,
        clubLogoUrl: action.payload.adminClubInfo.clubLogoUrl,
      };
      return { ...state, events: [newEvent, ...state.events] };
    case 'TOGGLE_FOLLOW':
      const newFollowed = new Set(state.followedClubNames);
      if (newFollowed.has(action.payload)) newFollowed.delete(action.payload);
      else newFollowed.add(action.payload);
      return { ...state, followedClubNames: newFollowed };
    case 'TOGGLE_SAVE':
      const newSavedIds = new Set(state.savedEventIds);
      if (newSavedIds.has(action.payload)) newSavedIds.delete(action.payload);
      else newSavedIds.add(action.payload);
      return { ...state, savedEventIds: newSavedIds };
    case 'TOGGLE_REGISTRATION':
      const newRegisteredIds = new Set(state.registeredEventIds);
      if (newRegisteredIds.has(action.payload)) newRegisteredIds.delete(action.payload);
      else newRegisteredIds.add(action.payload);
      return { ...state, registeredEventIds: newRegisteredIds };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'DELETE_EVENT':
        return { ...state, events: state.events.filter(event => event.id !== action.payload) };
    default:
      return state;
  }
};

const EventsContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const initialState: State = {
    events: [
        { id: '1', title: 'Introduction to Python', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', imageUrls: ['https://picsum.photos/700'], date: new Date('2025-10-03T14:00:00'), location: 'Main Auditorium', clubName: 'TinkerHub CET', clubLogoUrl: 'https://picsum.photos/100' },
        { id: '2', title: 'MAKE-A-TON 5.0', description: 'Ut enim ad minim veniam, quis nostrud exercitation...', imageUrls: ['https://i.imgur.com/SFe4TEG.png', 'https://picsum.photos/702'], date: new Date('2025-10-04T09:00:00'), location: 'Online', clubName: 'IEEE Club', clubLogoUrl: 'https://picsum.photos/101' },
    ],
    registeredEventIds: new Set(),
    savedEventIds: new Set(),
    followedClubNames: new Set(['TinkerHub CET']),
    filter: 'all',
  };

  const [state, dispatch] = useReducer(eventsReducer, initialState);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) throw new Error('useEvents must be used within an EventsProvider');
  return context;
};