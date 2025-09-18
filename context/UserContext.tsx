import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  year: string;
  course: string;
  profilePictureUrl: string;
  interests: string[];
}

interface State {
  profile: UserProfile;
}

type Action =
  | { type: 'UPDATE_PROFILE'; payload: UserProfile }
  | { type: 'ADD_INTEREST'; payload: string }
  | { type: 'REMOVE_INTEREST'; payload: string };

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    case 'ADD_INTEREST':
      if (!state.profile.interests.includes(action.payload)) {
        return {
          ...state,
          profile: { ...state.profile, interests: [...state.profile.interests, action.payload] },
        };
      }
      return state;
    case 'REMOVE_INTEREST':
      return {
        ...state,
        profile: { ...state.profile, interests: state.profile.interests.filter(i => i !== action.payload) }
      };
    default:
      return state;
  }
};

const UserContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialState: State = {
    profile: {
      name: 'Christin Sibi',
      email: 'tve20cs128@cet.ac.in',
      phone: '9846656129',
      year: '4th Year',
      course: 'Computer Science',
      profilePictureUrl: 'https://picsum.photos/200',
      interests: ['UI/UX Design', 'Web Development', 'Web3'],
    },
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};