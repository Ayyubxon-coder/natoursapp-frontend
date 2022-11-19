import { FC, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Cta } from '@/components/cta/Cta';
import { TourHeader } from '@/components/tour-description/TourHeader';
import Overview from '@/components/overview/Overview';
import { Review } from '@/components/review/Review';
import useHttp from '@/hooks/use-http';
import { CustomHookType } from '@/types/types';

export const Tour: FC = () => {
  const { tour } = useParams();
  const { response, sendRequest: getTour, isError }: CustomHookType = useHttp();
  const sendRequest = async () => {
    await getTour({
      url: `/api/v1/tours/${tour}`,
      method: 'GET',
    });
  };
  useLayoutEffect(() => {
    sendRequest();
  }, [tour]);

  if (isError) return <h1>Something went wrong! Try again!</h1>;
  const tourData = response?.data?.data;
  return (
    <>
      <TourHeader
        description={tourData?.startLocation.description}
        duration={tourData?.duration}
        imageCover={tourData?.imageCover}
        name={tourData?.name}
      />
      <Overview
        name={tourData?.name}
        description={tourData?.description}
        startDates={tourData?.startDates}
        difficulty={tourData?.difficulty}
        maxGroupSize={tourData?.maxGroupSize}
        ratingsAverage={tourData?.ratingsAverage}
        guides={tourData?.guides}
      />
      <Review data={tourData?.reviews} />
      <Cta
        images={tourData?.images}
        duration={tourData?.duration}
        tourId={tourData?._id}
      />
    </>
  );
};
