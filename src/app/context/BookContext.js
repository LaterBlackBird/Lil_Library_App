import { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [selectedBookInfo, setSelectedBookInfo] = useState({});

  return (
    <BookContext.Provider
      value={[
        selectedBookInfo,
        setSelectedBookInfo,
      ]}
    >
      {children}
    </BookContext.Provider>
  );
};
