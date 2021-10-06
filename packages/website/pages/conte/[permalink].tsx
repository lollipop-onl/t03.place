import { MicroCMSApiArrayResponse, MicroCMSApiPerformanceSchema, MicroCMSApiWorksSchema } from '@cms-typings';
import { GetStaticPaths, GetStaticProps } from "next";
import React from 'react';
import { setupCMSUtil } from '~/utils';

type Props = {
  work: MicroCMSApiWorksSchema;
  performances: MicroCMSApiPerformanceSchema[];
};

type Params = {
  permalink: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { works, performances } = await setupCMSUtil();

  const work = works.find(({ permalink }) => permalink === params?.permalink);

  if (!work) {
    return {
      notFound: true,
    };
  }

  const referencedPerformances = performances.filter(({ programs }) => programs.some((program) => program.fieldId === 'work' && program.work.permalink === work.permalink));

  return {
    props: {
      work,
      performances: referencedPerformances,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { works } = await setupCMSUtil();

  return {
    paths: works.filter(({ type }) => type.includes('ネタ')).map(({ permalink }) => ({ params: { permalink } })),
    fallback: false,
  }
}

const ConteDetailPage: React.VFC<Props> = ({ work, performances }) => {
  return (
    <div>
      <p>hello world.</p>
      <pre>{JSON.stringify(work)}</pre>
      <pre>{JSON.stringify(performances)}</pre>
    </div>
  )
}

export default ConteDetailPage;