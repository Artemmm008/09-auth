'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const isPrivateRoute = pathname.startsWith('/profile');

      try {
        const isAuthenticated = await checkSession();
        
        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();

          if (isPrivateRoute) {
            router.push('/sign-in');
          }
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivateRoute) router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated, pathname, router]);


  return <>{isLoading ? <div>Loading...</div> : children}</>;
}

