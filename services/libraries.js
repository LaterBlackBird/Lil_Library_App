import * as geofire from 'geofire-common';
import { collection, doc, getDoc, getDocs, query, where, orderBy, startAt, endAt, addDoc, serverTimestamp, GeoPoint } from 'firebase/firestore';

import { fireDB } from '../services/initializaiton'


// Find libraries within 10km
export const librariesWithin10km = async (mapCenter) => {
  libraries = [];

  const searchCenter = [mapCenter.latitude, mapCenter.longitude];
  const searchRadius = 10000; //meters

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(searchCenter, searchRadius);
  const db = collection(fireDB, 'libraries');

  for (const b of bounds) {
    const q = query(db, orderBy('geohash'), startAt(b[0]), endAt(b[1]))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      libraries = [...libraries, doc.data()];
    });
  };
  return libraries;
};