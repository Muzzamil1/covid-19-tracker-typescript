/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useCallback, useRef, useEffect } from 'react';

import axios, { AxiosError, CancelTokenSource } from 'axios';

import { HttpStatus } from 'shared/constants';

interface Data {}

interface Header {}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

// type AxiosResponse = {
//   data
// }
export type AxiosError2 = AxiosError | string | undefined;

const idleState: { status: HttpStatus; error: AxiosError2 } = {
  status: HttpStatus.IDLE,
  error: undefined,
};

export const useHttpClient = () => {
  const [httpState, setHttpState] = useState(idleState);

  const activeHttpRequests = useRef<CancelTokenSource[]>([]);

  const sendRequest = useCallback(
    async <T>(
      url: string,
      method: Method = 'GET',
      data?: Data | undefined,
      headers?: Header | undefined,
    ) => {
      setHttpState({
        status: HttpStatus.PENDING,
        error: undefined,
      });

      const CancelToken = axios.CancelToken.source();

      activeHttpRequests.current.push(CancelToken);

      try {
        const response = await axios({
          url,
          method,
          data,
          headers,
          cancelToken: CancelToken.token,
          timeout: 5000,
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== CancelToken,
        );

        setHttpState({
          status: HttpStatus.RESOLVED,
          error: undefined,
        });

        return response.data as T;
      } catch (error) {
        let err: AxiosError2;

        if (axios.isAxiosError(error)) {
          if (error.response) {
            err =
              error.response.status == 404
                ? 'URL not found'
                : // : (error.response?.data?.message as string);
                  'Something went wrong with request';
          } else if (error.request) {
            err = 'Timeout error, could not connect with Server';
          } else {
            err = error;
          }
        }

        setHttpState({
          status: HttpStatus.REJECTED,
          error: err,
        });

        throw error;
      }
    },
    [],
  );

  const clearError = () => {
    setHttpState({
      status: HttpStatus.IDLE,
      error: undefined,
    });
  };

  useEffect(
    () => () => {
      for (const abortCtrl of activeHttpRequests.current) {
        abortCtrl.cancel('axios request cancelled');
      }
    },
    [],
  );

  return { httpState, sendRequest, clearError };
};
