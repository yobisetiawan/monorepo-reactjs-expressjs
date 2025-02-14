import { sessionOptions } from '@/lib/session';
import { getIronSession, IronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';


export async function GET() {
    const session = await getIronSession(await cookies(), sessionOptions) as IronSession<IronSessionData>;


    if (session?.user) {
        return Response.json(session)
    } else {
        return new Response(JSON.stringify({ message: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}
