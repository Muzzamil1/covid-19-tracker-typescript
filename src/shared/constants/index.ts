export enum HttpStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

// http status
// export const IDLE = 'idle';
// export const PENDING = 'pending';
// export const RESOLVED = 'resolved';
// export const REJECTED = 'rejected';

// const isIdle = status === 'idle';
// const isLoading = status === 'idle' || status === 'pending';
// const isPending = status === 'pending';
// const isResolved = status === 'resolved';
// const isRejected = status === 'rejected';

// return {
//    isLoading: status === 'idle' || status === 'pending',
//    isIdle: status === 'idle',
//    isPending: status === 'pending',
//    isResolved: status === 'resolved',
//    isRejected: status === 'rejected',
//    ...state,
// };
