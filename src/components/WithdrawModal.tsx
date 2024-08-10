import { Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useAccount } from 'wagmi';

type WithdrawalModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const WithdrawModal: FC<WithdrawalModalProps> = ({
  openModal,
  setOpenModal
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  let addr = useAccount().address;
  if (!addr) {
    addr = '0x0';
  }

  const router = useRouter();

  const requestWithdrawal = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/request-withdrawal', { 
        owner: addr
       });
      setIsSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
        setOpenModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error requesting withdrawal: ', error);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="create-quiz-modal-title"
      aria-describedby="create-quiz-modal-description"
      disableScrollLock={true}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '4px',
          p: 4,
          zIndex: 9999, // Or any other high value
        }}
      >
        <Typography
          id="create-quiz-modal-title"
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Withdraw Prize
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            You can request withdrawal of your balance to your wallet.
            Network fee is dudected from the amount you receive.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={() => setOpenModal(false)}
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
          >
            <Typography variant="button">Cancel</Typography>
          </Button>
          <Button
            onClick={requestWithdrawal}
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
          >
            <Typography variant="button">Withdraw</Typography>
          </Button>
        </Box>
        {loading && (
          <Box sx={{ mt: 2 }}>
            <Typography color="black">Requesting withdrawal...</Typography>
          </Box>
        )}
        {isSuccess && (
          <Box sx={{ mt: 2 }}>
            <Typography color="green">Withdrawal request sent! You will receive your prize in less than 24 hours.</Typography>
          </Box>
        )}
        {error && (
          <Box sx={{ mt: 2 }}>
            <Typography color="red">You don&apos;t have enough balance to withdraw.</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default WithdrawModal;
