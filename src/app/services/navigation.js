import * as RootNavigation from './RootNavigation';

export const goHome = () => {
  RootNavigation.popToTop();
};

export const goToUserProfile = () => {
  RootNavigation.navigate('UserProfile');
}

export const goToLibraryProfile = () => {
  RootNavigation.navigate('LibraryProfile');
}

export const goToLibraryEditOptions = () => {
  RootNavigation.navigate('LibraryOptions');
}

export const goToBookSearchPage = () => {
  RootNavigation.navigate('BookSearch');
}
