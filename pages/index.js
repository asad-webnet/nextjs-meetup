import React from 'react';
import Head from 'next/head';
import {MongoClient} from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge light of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />

    </React.Fragment>
  );
};

export async function getStaticProps () {
  const client = await MongoClient.connect (
    'mongodb+srv://asad:asad@cluster0.ghuwz.gcp.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db ('meetups');

  const meetupsCollection = db.collection ('meetups');

  const meetups = await meetupsCollection.find ().toArray ();

  client.close ();

  return {
    props: {
      meetups: meetups.map (meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString (),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

// /https://www.youtube.com/watch?v=MFuwkrseXVE
