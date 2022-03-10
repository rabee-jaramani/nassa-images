/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import ImagePreview from '../components/ImagePreview';
import Image from 'next/image';

export default function Home({ items }) {
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState(items);
  useEffect(() => {
    setPhotos(items);
    console.log('photos>> ', photos[0]);
  }, []);
  return (
    <div className={'container'}>
      <Head>
        <title>NASA IMAGE GALLERY</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="main">
        <h1 className="title">Welcome to NASA gallery</h1>
        <div className="images-grid">
          {photos.map((image) => (
            <ImagePreview
              thumpnailUrl={image.links[0].href}
              key={image.data[0].nasa_id}
              nasaId={image.data[0].nasa_id}
              location={image.data[0].location}
              description={image.data[0].description}
              date={image.data[0].date_created}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const resaults = await fetch(
    'https://images-api.nasa.gov/search?media_type=image'
  );
  const preview = await resaults.json();
  const items = await preview.collection.items;
  return {
    props: { items },
  };
}
