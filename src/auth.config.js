import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'
import Gitlab from '@auth/core/providers/gitlab'
import Spotify from '@auth/core/providers/spotify'
import Credentials from "@auth/core/providers/credentials"
import { getUserByEmail } from "@/lib/data"

export default {
    providers: [
        Google,
        GitHub,
        Gitlab,
        Spotify,
        Credentials({
            async authorize(credentials) {
                console.log('AUTHORIZE');
                return getUserByEmail(credentials.email)
            },
        }),
    ]
}