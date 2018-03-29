import { IManagerState, ManagerStateMessage } from './message-types';

export function send(state: IManagerState): ManagerStateMessage {
  return {
    type: 'state',
    state,
  };
}
