import {
  ManagerStatusMessage,
  ManagerStatus,
  StartEvent,
  DoneEvent,
  SuccessEvent,
} from './message-types';

/**
 * Send that the compiler starts
 */
export function start(): StartEvent {
  return {
    type: 'start',
  };
}

/**
 * Send that the compiler is done
 */
export function done(): DoneEvent {
  return {
    type: 'done',
  };
}

/**
 * Send that the compiler didn't have any errors
 */
export function success(): SuccessEvent {
  return {
    type: 'success',
  };
}

/**
 * The sandbox preview gives status updates on how far it is
 */
export function set(status: ManagerStatus): ManagerStatusMessage {
  return {
    type: 'status',
    status,
  };
}
