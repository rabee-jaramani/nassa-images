import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function photo({ photo }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  if (!router.isFallback && !photo) {
    return <div className="error">Error 404. Page Not Found</div>;
  }
  return (
    <div>
      <div className="Imagecontainer">
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Image
              alt="nasa-image"
              width={960}
              height={540}
              priority
              src={photo}
            />
          </>
        )}
      </div>
      <div className="Imagecontainer">
        <Link className="homeButton" href="/">
          <a className="homeButton">
            <button className="button">Go home</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const nasa_id = params.id;
  const results = await fetch(`https://images-api.nasa.gov/asset/${nasa_id}`);
  const previews = await results.json();
  const photo = await previews.collection.items[0].href;
  return {
    props: { photo },
  };
}

export async function getStaticPaths() {
  const results = await fetch(
    'https://images-api.nasa.gov/search?media_type=image'
  );
  const previews = await results.json();
  const items = await previews.collection.items;
  return {
    paths:
      items?.map((nasa) => ({
        params: {
          id: nasa.data[0].nasa_id,
        },
      })) || [],
    fallback: true,
  };
}
