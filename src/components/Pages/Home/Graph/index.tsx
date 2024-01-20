/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './index.scss';
import graph from '../../../../assets/graph.png';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { fetchMonthlyData } from '../../../../store/reducers/graph';

function Graph() {
  const dispatch = useAppDispatch();
  const monthlyData = useAppSelector((state) => state.graph.monthlyData);
  const error = useAppSelector((state) => state.graph.error);
  const status = useAppSelector((state) => state.graph.status);
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const findAllSeances = equipes.map((seances) => seances.seances);

  const seanceIds = findAllSeances
    .flatMap((seance) => seance
      .filter((seances) => seances))
    .map((seance) => seance.id);

  useEffect(() => {
    if (status === 'idle') {
      seanceIds.forEach((seance_id) => {
        dispatch(fetchMonthlyData({ seance_id }));
      });
    }
  }, [status, dispatch, seanceIds]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  if (!monthlyData) {
    return null;
  }

  const chartData = {
    labels: (monthlyData as any[]).map((item: { jour: string }) => item.jour),
    datasets: [
      {
        label: 'Présents',
        data: (monthlyData as any[]).map((item: { presents: number }) => item.presents),
        fill: false,
        borderColor: 'rgba(0, 255, 0, 1)',
        lineTension: 0.1,
      },
      {
        label: 'Absents',
        data: (monthlyData as any[]).map((item: { absents: number }) => item.absents),
        fill: false,
        borderColor: 'rgba(255, 0, 0, 1)',
        lineTension: 0.1,
      },
      {
        label: 'En retard',
        data: (monthlyData as any[]).map((item: { retards: number }) => item.retards),
        fill: false,
        borderColor: 'rgba(255, 255, 0, 1)',
        lineTension: 0.1,
      },
    ],
  };

  const chartOptions :any = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return (
    <div className="graph__content">
      <img className="graph_img" src={graph} alt="" />
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default Graph;
