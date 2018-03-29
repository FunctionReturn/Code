import { ChangeNavigationURLAction } from './message-types';

/**
 * Change the url in the navigation bar above the preview
 */
export function changeNavigationURL(url: string): ChangeNavigationURLAction {
  return {
    type: 'action',
    action: 'urlchange',
    url,
  };
}
