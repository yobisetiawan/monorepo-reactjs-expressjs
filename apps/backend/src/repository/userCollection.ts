import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const USERS_COLLECTION = 'USERS';

export const createUserData = async (data: Partial<User>) => {
  await db.collection(USERS_COLLECTION).add(data);
};

export const updateUserData = async (userId: string, data: Partial<User>) => {
  await db.collection(USERS_COLLECTION).doc(userId).set(data, { merge: true });
};

export const fetchUserData = async (lastVisible: string, pageSize: number) => {
  let query = db.collection(USERS_COLLECTION)
    .orderBy('totalAverageWeightRatings', 'desc')
    .orderBy('numberOfRents', 'desc')
    .orderBy('recentlyActive', 'desc')
    .limit(pageSize);

  if (lastVisible && lastVisible !== "") {
    const lastVisibleDoc = await db.collection(USERS_COLLECTION).doc(lastVisible).get();
    if (lastVisibleDoc.exists) {
      query = query.startAfter(lastVisibleDoc);
    }
  }

  return query.get().then((snapshot) => {
    const users: User[] = [];
    snapshot.forEach((doc) => {
      users.push({ docId: doc.id, ...doc.data() } as User);
    });

    return users;
  });
};

export const createMultipleUsersData = async () => {
  const batch = db.batch();
  let users: Partial<User>[] = [];
  users.push({
    id: uuidv4(),
    name: 'User A',
    numberOfRents: 30,
    recentlyActive: 1738938812,
    totalAverageWeightRatings: 4.3,
  });

  users.push({
    id: uuidv4(),
    name: 'User B',
    numberOfRents: 30,
    recentlyActive: 1738679612,
    totalAverageWeightRatings: 4.3,
  });

  users.push({
    id: uuidv4(),
    name: 'User C',
    numberOfRents: 28,
    recentlyActive: 1738679612,
    totalAverageWeightRatings: 4.3,
  });


  users.forEach(user => {
    const userRef = db.collection(USERS_COLLECTION).doc();
    batch.set(userRef, user);
  });
  await batch.commit();
};

