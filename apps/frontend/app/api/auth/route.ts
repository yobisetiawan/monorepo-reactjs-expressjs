import { getIronSession, IronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';
import { auth } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { sessionOptions } from '@/lib/session';


export async function POST(req: Request) {
    const { email, password, isLogin } = await req.json();

    console.log('req.body', req.body);

    const session = await getIronSession(await cookies(), sessionOptions) as IronSession<IronSessionData>;

    let userCredential;
    if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
    }

    const accessToken = await userCredential.user.getIdToken();

    session.user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? "",
        accessToken: accessToken,
    };

    await session.save();

    return Response.json({ message: 'success' })
}
