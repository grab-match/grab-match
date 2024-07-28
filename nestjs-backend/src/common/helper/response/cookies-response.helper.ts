import { CookieOptions, Response } from "express";
import { EnvHelper } from "../env/env.helper";
import { COOKIES_ACCESS_TOKEN } from "src/common/constant/cookies.key.constant";
import ms from "ms";

export class CookiesResponseHelper {

    static setAcessToken(res: Response, token: string) {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: EnvHelper.isProduction(),
            sameSite: EnvHelper.isProduction() ? 'none' : 'lax',
            expires: new Date(new Date().getTime() + ms(process.env.JWT_EXPIRATION)),
        };

        res.cookie(COOKIES_ACCESS_TOKEN, token, cookieOptions);
    }
}