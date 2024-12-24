import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, selectErrorMessege } from '../../redux/slices/errorSlice';
import { useEffect } from 'react';

const Error = () => {
  const errorMessage = useSelector(selectErrorMessege);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch]);

  // toast.info('Test messege!');
  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default Error;
