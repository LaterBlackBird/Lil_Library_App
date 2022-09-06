import * as geofire from 'geofire-common';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  startAt,
  endAt,
  serverTimestamp,
  GeoPoint,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

import { fireDB } from './initializaiton'

export const librariesWithin10km = async (mapCenter, searchArea) => {
  const searchCenter = [mapCenter.latitude, mapCenter.longitude];
  const searchRadius = 10000; //meters

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(searchCenter, searchRadius);
  let update = true;
  let libraries = [];

  if (JSON.stringify(searchArea) === JSON.stringify(bounds)) {
    update = false;
    libraries = null;
  } else {
    const db = collection(fireDB, "libraries");
    for (const b of bounds) {
      const q = query(db, orderBy("geohash"), startAt(b[0]), endAt(b[1]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        libraries = [...libraries, { id: doc.id, ...doc.data() }];
      });
    }
  }

  return { libraries, bounds, update };
};

export const updateDB_AddLibrary = async (mapCenter, newLibraryName) => {
  const newLibraryData = {
    createdAt: serverTimestamp(),
    geohash: geofire.geohashForLocation([
      mapCenter.latitude,
      mapCenter.longitude,
    ]),
    location: new GeoPoint(mapCenter.latitude, mapCenter.longitude),
    name: newLibraryName,
  };

  const newDoc = await addDoc(collection(fireDB, "libraries"), newLibraryData);
  const docRef = doc(fireDB, "libraries", newDoc.id);
  const docSnap = await getDoc(docRef);
  return { id: newDoc.id, ...docSnap.data() };
};

export const updateDB_DeleteLibrary = async (id) => {
  try {
    await deleteDoc(doc(fireDB, 'libraries', id));
  } catch (error) {
    return 'error';
  }
};

export const updateDB_RenameLibrary = async (library, newName) => {
  const docRef = doc(fireDB, "libraries", library.id);
  await updateDoc(docRef, { name: newName });
  const docSnap = await getDoc(docRef);
  return { id: library.id, ...docSnap.data() };
}

export const updateDB_MoveLibrary = async (library, newLocation) => {
  const locationToGeoPoint = new GeoPoint(newLocation.latitude, newLocation.longitude)
  const docRef = doc(fireDB, 'libraries', library.id);
  await updateDoc(docRef, { location: locationToGeoPoint });
  const docSnap = await getDoc(docRef);
  return { id: library.id, ...docSnap.data() };
}

export const updateDB_LibraryInventory_AddBook = async (libraryID, bookISBN) => {
  const docRef = doc(fireDB, 'libraries', libraryID);
  await updateDoc(docRef, { inventory: arrayUnion(bookISBN) })
  return;
}

export const updateDB_LibraryInventory_RemoveBook = async (libraryID, bookISBN) => {
  const docRef = doc(fireDB, 'libraries', libraryID);
  await updateDoc(docRef, { inventory: arrayRemove(bookISBN) })
  return;
}