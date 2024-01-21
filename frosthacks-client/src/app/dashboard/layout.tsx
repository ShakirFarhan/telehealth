import React from 'react'
import styles from "./page.module.css";

// Components
import Sidebar from '@/components/Sidebar/Sidebar';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Chatbot from '@/components/Chatbot/Chatbot';

const layout = ({children}: {children: React.ReactNode}) => {

  const { dashboard__layout } = styles;

  cookies().get('hospAdminToken')?.value || redirect('/')

  return (
    <main className={dashboard__layout}>
      <Sidebar/>
      {children}
      <Chatbot/>
    </main>
  )
}

export default layout