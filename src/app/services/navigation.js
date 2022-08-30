import * as RootNavigation from './RootNavigation';

export const goHome = () => {
  RootNavigation.popToTop();
};

export const goToProfile = () => {
  RootNavigation.navigate('UserProfile');
}
