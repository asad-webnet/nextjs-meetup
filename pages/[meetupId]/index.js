import React from 'react';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import {MongoClient, ObjectId} from 'mongodb';

const MeetupDetails = props => {
  return (
    <React.Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name='description'
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />

    </React.Fragment>
  );
};

export async function getStaticPaths () {
  const client = await MongoClient.connect (
    'mongodb+srv://asad:asad@cluster0.ghuwz.gcp.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db ('meetups');

  const meetupsCollection = db.collection ('meetups');

  const meetups = await meetupsCollection.find ({}, {_id: 1}).toArray ();

  client.close ();

  return {
    fallback: false,
    paths: meetups.map (meetup => ({
      params: {meetupId: meetup._id.toString ()},
    })),
  };
}

export async function getStaticProps (context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect (
    'mongodb+srv://asad:asad@cluster0.ghuwz.gcp.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db ('meetups');

  const meetupsCollection = db.collection ('meetups');

  const selectedMeetup = await meetupsCollection.findOne ({
    _id: ObjectId (meetupId),
  });

  client.close ();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString (),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
