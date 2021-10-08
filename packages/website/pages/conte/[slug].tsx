import {
  MicroCMSApiPerformanceSchema,
  MicroCMSApiWorksSchema,
} from '@cms-typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { withTitleTemplate } from '~/utils';

type Props = {
  work: MicroCMSApiWorksSchema;
  performances: MicroCMSApiPerformanceSchema[];
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { works, performances } = await import('@cms-contents');

  const work = works.find(({ slug }) => slug === params?.slug);

  if (!work) {
    return { notFound: true };
  }

  const referencedPerformances = performances.filter(({ programs }) =>
    programs.some(
      (program) => program.fieldId === 'work' && program.work.slug === work.slug
    )
  );

  return {
    props: {
      work,
      performances: referencedPerformances,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { works } = await import('@cms-contents');

  return {
    paths: works
      .filter(({ type }) => type.includes('ネタ'))
      .map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

const ConteDetailPage: React.VFC<Props> = ({ work, performances }) => {
  return (
    <>
      <Head>
        <title>{`${work.title} ... 東京03のコント`}</title>
      </Head>
      <div className="mx-auto w-full max-w-screen-md">
        <h1
          className="mb-4 text-2xl"
          style={{ fontFamily: 'RocknRoll One, sans-serif' }}
        >
          {work.title}
        </h1>
        <small>TOKYO 03</small>
        {work.summary && <p>{work.summary}</p>}
        <h2>このコントが見られた公演</h2>
        <ul>
          {performances.map(({ slug, title }) => (
            <li key={slug}>{title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ConteDetailPage;
