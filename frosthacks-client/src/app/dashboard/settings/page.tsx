import React, { useEffect } from 'react';
import { Metadata } from 'next';
import styles from './page.module.css';

// React Icons
import { CgProfile } from 'react-icons/cg';

// Component
import AccountDelete from './components/AccountDelete';
import AccountDetails from './components/AccountDetails';
import ChangePassword from './components/ChangePassword';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Settings | Kode Blue Technologies',
  description: 'Settings Page of Kode Blue Technologies.',
};
const fetchHospitalDetails = async () => {
  try {
    const details = await fetch(
      'https://frosthacks-backend.onrender.com/api/v1/hospital/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies().get('hospAdminToken')?.value}`,
        },
      }
    );
    console.log(details.status);
    if (!details.ok) {
      throw new Error('Issue loading details!');
    }
    const responseJson = await details.json();

    const { hospital } = responseJson;
    return hospital;
  } catch (error) {
    console.log('Error');
    console.log(error);
    throw new Error('Error loading cases!');
  }
};
const page = async () => {
  const {
    app__settings,
    settings__head,
    settings__main,
    account__details,
    details__main,
    change__password,
    account__options,
  } = styles;
  const hospital: any = await fetchHospitalDetails();
  return (
    <main className={app__settings}>
      <div className={settings__head}>
        <CgProfile fontSize={21} color={'#484848'} />
        <p>Profile</p>
      </div>
      <section className={settings__main}>
        <AccountDetails
          name={hospital?.name}
          hospitalid={hospital?.registrationId}
          email={hospital?.email}
          type={hospital?.type}
        />
        <ChangePassword />
        <AccountDelete />
      </section>
    </main>
  );
};

export default page;
