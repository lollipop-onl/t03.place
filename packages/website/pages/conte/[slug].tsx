import {
  MicroCMSApiArrayResponse,
  MicroCMSApiPerformanceSchema,
  MicroCMSApiWorksSchema,
} from '@cms-typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

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
    <div>
      <p>hello world.</p>
      <pre>{JSON.stringify(work)}</pre>
      <pre>{JSON.stringify(performances)}</pre>
    </div>
  );
};

export default ConteDetailPage;
