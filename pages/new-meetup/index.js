//ourdomain.com/new-meetup
import {useRouter} from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

import React from 'react';

const NewMeetupPage = () => {
  const router = useRouter ();

  const addMeetupHandler = async enteredMeetupData => {
    const response = await fetch ('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify (enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json ();
    console.log (data);

    router.push ('/');
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetups and createa amazing network opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />

    </React.Fragment>
  );
};

export default NewMeetupPage;
