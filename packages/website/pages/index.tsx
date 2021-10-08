import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import { MicroCMSCustomFieldPickupSchema } from '~/../cms-typings/types';

type Props = {
  pickup: MicroCMSCustomFieldPickupSchema | null;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { settings } = await import('@cms-contents');

  return {
    props: {
      pickup: settings.pickup,
    },
  };
};

const IndexPage: React.VFC<Props> = ({ pickup }) => {
  return (
    <>
      <Head>
        <title>T03 PLACE - TOKYO 03 UNOFFICIAL FAN SITE</title>
      </Head>
      <div>
        {pickup && (
          <div>
            <h2 className="text-2xl">{pickup.title}</h2>
            {pickup.description && <p>{pickup.description}</p>}
            <ul>
              {pickup.works.map(
                ({ slug, title, summary, youtubeVideos = [] }, index) => (
                  <li key={index}>
                    <h3>{title}</h3>
                    {summary && <p>{summary}</p>}
                    <Link href={`/conte/${slug}`}><a>リンク先</a></Link>
                    <ul>
                      {youtubeVideos.map(({ videoId }) => (
                        <li key={videoId}>
                          <Link
                            href={`https://www.youtube.com/watch?v=${videoId}`}
                          >
                            YouTube で動画を見る
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      </>
  );
};

export default IndexPage;
