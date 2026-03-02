import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
    const state = useSelector((s: RootState) => s.auth);
    const router = useRouter();

    useEffect(() => {
        if (state.isAuthenticated) {
            router.replace('/');
        }
    }, [state.isAuthenticated, router]);

    if (state.isAuthenticated) return null;

    return (
        <div>
            <h2>Sign up page</h2>
        </div>
    )
}
