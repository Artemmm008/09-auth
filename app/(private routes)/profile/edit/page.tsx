'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const [userName, setUserName] = useState(user?.username || '')
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    };
    
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMe({ username: userName });
      if (updatedUser) {
        setUser(updatedUser); 
        router.push('/profile');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to update profile');
    }
  };

    const handleCancel = () => {
        router.push('/profile');
    };

    return (
    
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>
                
                <Image src="/next.svg"
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} onSubmit={handleSave}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            value={userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <p>Email: {user?.email || 'user_email@example.com'}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                    {error}
                </form>
            </div>
        </main>
    )
}