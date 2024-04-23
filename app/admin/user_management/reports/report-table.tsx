'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { Report } from '@/models/report';
import { getReportedRecords } from '@/redux/features/reportSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ReportTable = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const { push } = useRouter();

  // Redux store
  const reports: Report[] = useAppSelector(
    (state) => state.reportReducer.reports
  );

  useEffect(() => {
    dispatch(getReportedRecords({ controller }));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  const handleBanClick = async (id: Number, userId: Number, reason: String) => {
    const confirmResponse = window.confirm(
      'Are you sure you want to ban this user?'
    );
    if (confirmResponse) {
      const response = await axios.post(`${endpoint}/ban`, {
        id: id,
        userId: userId,
        bannedReason: reason,
      });

      if (response.data.status === 200) {
        push(window.location.pathname + '/bans');
      } else {
        alert('An error has occured!');
      }
    } else {
      console.log('User cancelled the action.');
    }
  };

  const handleViewBanRecords = () => {
    push('/admin/user_management/reports/bans');
  };

  return (
    <>
      <div className='mt-4'>
        <table className='admin-table'>
          <thead>
            <tr>
              <th scope='col'>Report ID</th>
              <th scope='col'>Username</th>
              <th scope='col'>Reason</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: Report) => (
              <tr key={report.reportId}>
                <th scope='row'>{report.reportId}</th>
                <td>{report.username}</td>
                <td>{report.reportedReason}</td>
                <td>
                  <button
                    className='btn btn-delete btn-square'
                    onClick={(e) => {
                      e.preventDefault();

                      handleBanClick(
                        report.reportId,
                        report.userId,
                        report.reportedReason
                      );
                    }}
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className='btn btn-primary btn-square float-end mt-4'
          onClick={handleViewBanRecords}
        >
          View Ban Records
        </button>
      </div>
    </>
  );
};

export default ReportTable;
