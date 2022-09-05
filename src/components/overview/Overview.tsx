import { FC } from 'react';
import { OverviewBox } from '../overview-box/OverviewBox';
import { TourDescription } from '../tour-description/TourDescription';

export const Overview: FC = () => {
  return (
    <section className='section-description'>
      <OverviewBox />
      <TourDescription />
    </section>
  );
};

export default Overview;
