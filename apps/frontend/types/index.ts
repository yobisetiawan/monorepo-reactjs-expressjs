export interface User {
    uid: string;
    email: string;
    accessToken: string;
}

export interface UserData {
    id: string;
    name: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
    docId: string;
}