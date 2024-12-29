'use client'

import Login from '@/app/components/auth/login'
import AdminFooter from '@/app/components/layout/admin.footer';


const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <Login />
      </div>
      <AdminFooter />
    </div>
  );
}

export default LoginPage