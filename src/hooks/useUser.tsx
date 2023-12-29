import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/types';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getSubscription = useCallback(
    () =>
      supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single(),
    [supabase]
  );

  const getUserDetails = useCallback(
    () => supabase.from('users').select('*').single(),
    [supabase]
  );

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          if (subscriptionPromise.status === 'fulfilled')
            setSubscription(subscriptionPromise.value.data as Subscription);

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
    setIsloadingData(false);
  }, [
    user,
    isLoadingData,
    userDetails,
    subscription,
    isLoadingUser,
    getUserDetails,
    getSubscription,
  ]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
