import {Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';


function Stats() {
  const router = useRouter();
  const id = router.query.id;

  const [columns, setColumn] = useState<readonly GridColDef<any>[]>([]);
  const [rows, setRow] = useState<readonly any[] | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let addr = useAccount().address;

  if (!addr) {
    addr = '0x0';
  }

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post(
          '/api/get-stats',
          {'userId': addr, 'quizId': id}
        );
        fillData(data);
      } catch (error: any) {
        if (error.response.data.message){
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, [router]);

  const fillData = (data: any) => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 380 },
      { field: 'score', headerName: 'Score', type: 'number' },
      { field: 'time', headerName: 'Submission Time' , width: 220},
      { field: 'prize', headerName: 'Prize Won' },
    ];
    const rows = data.map((r: any) => (
      { id: r.userId, score: r.score, time: r.time, prize: r.prizeWon }
    ));
    const title = data.map((r: any) => (r.title)).reduce((a:any, b: any) => (a));
    setColumn(columns);
    setRow(rows);
    setTitle(title);
  }

  return (
    <div style={{ width: '100%' }}>
      <span>&nbsp;</span>
      <Typography variant="h4" align="center" gutterBottom>
        Statistics for { title }
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default Stats;
