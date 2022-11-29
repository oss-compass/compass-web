import { proxy } from 'valtio';

// state based on response body
export const dataState = proxy({
  // if it is completely contributed by individuals， hidden organizations section
  showOrganizations: true,
});

export const toggleShowOrganizations = (bool: boolean) => {
  dataState.showOrganizations = bool;
};
