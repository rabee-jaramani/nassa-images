import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ImagePreview({
  thumpnailUrl,
  nasaId,
  location,
  description,
  date,
}) {
  return (
    <div className="image-container">
      <Link as={`/photo/${nasaId}`} href="/photo/[id]">
        <a>
          <Image width={400} height={300} alt="image" src={thumpnailUrl} />
          <div>
            <strong>Image ID:</strong> {nasaId}
          </div>
          <div>
            <strong>Location: </strong>
            {location}
          </div>
          <div>
            <strong>Date: </strong>
            {date}
          </div>

          {/* <div>Description: {description}</div> */}
        </a>
      </Link>
    </div>
  );
}
