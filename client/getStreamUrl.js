const ytdl = require("ytdl-core");



const getStreamUrl = async(id) => {

    let url = `https://www.youtube.com/watch?v=${id}`;

    let cookies = "CONSENT=PENDING+719; SOCS=CAISOAgREitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwODE1LjA2X3AyGgVlbi1HQiACGgYIgOn6pgY; HSID=ABxXkeAk-kfXAN1Qp; SSID=AUjnh4TxEKAg7bory; APISID=w8xyKOHUS8kWIIjH/APNb91ae9z90gkFuR; SAPISID=kpA0ed8kKubdSW_a/AwSMhNyEwvd5-DBTl; __Secure-1PAPISID=kpA0ed8kKubdSW_a/AwSMhNyEwvd5-DBTl; __Secure-3PAPISID=kpA0ed8kKubdSW_a/AwSMhNyEwvd5-DBTl; LOGIN_INFO=AFmmF2swRAIgD_XErnD_xsoHAFCd5UZ1k5ceNXUsLIBsbQfawZ04MAgCIH9Z78MzDqNZAwKI1_sfIP_lHaiGZ8gkebfw6rQqapt1:QUQ3MjNmeFZEZ0RNeXo1TjRBdVlBNXF5SDk1R2Y2Q0tXNWdMWTJsLXh3dXpWbzZMYm5yTnFxdWxycmZzNlhqVjBMaWtJLVBHWXpEU2doc0o2ajVYcGx5aUFBYTJ6V1pzMWVhLTc0ZWg3Nk4yenB5OUIyZ2Mtb3VLQ3pXZnNhUzU4bVpYb0d5c2ZYQXV3WDhRZU4xUmdrQlQ5VW5TRnlqVEpB; YSC=r9nbOKgRlsw; VISITOR_PRIVACY_METADATA=CgJGUhIIEgQSAgsMIDs%3D; SID=fQj0TDO8k82M_XMa4hPc30Xr2QA3IZnJwGqFeDAO8qa8FrSt9lugX0qmyTbxD44EPZWZjA.; __Secure-1PSID=fQj0TDO8k82M_XMa4hPc30Xr2QA3IZnJwGqFeDAO8qa8FrStoRqIhajrJBWrnk1ZJK_qkA.; __Secure-3PSID=fQj0TDO8k82M_XMa4hPc30Xr2QA3IZnJwGqFeDAO8qa8FrStHRsXUwZflDWe4QzmI_tUDA.; VISITOR_INFO1_LIVE=qoM7sGa8M9s; VISITOR_PRIVACY_METADATA=CgJGUhIIEgQSAgsMIDs%3D; PREF=f6=40000080&f7=4100&tz=Europe.Paris&guide_collapsed=false&f5=30000; __Secure-1PSIDTS=sidts-CjEBPVxjSgUQBbExZdan-4XVG8yqMGEIyIza7obXNWMc4MCkqO8WKnWzWNAh2jnbZbg9EAA; __Secure-3PSIDTS=sidts-CjEBPVxjSgUQBbExZdan-4XVG8yqMGEIyIza7obXNWMc4MCkqO8WKnWzWNAh2jnbZbg9EAA; SIDCC=ABTWhQHRH_KC1HbzPPuMjDvLWMC_inzK1bf3869FsdEgUlCcvGd-3PofOCky-6U7o5IiYyPSuw; __Secure-1PSIDCC=ABTWhQGXNEsU_LZXTVvjboMfNm1RrXeXboV2SpT_BZQe-GuOTYfLKk4I5B6KFZ6h9Jg0cqAhWqI; __Secure-3PSIDCC=ABTWhQFqqKNaUR2B-ez6rjEXqWvPXST2oQNmWHwffgFMlDZl4psCH-jZ7Kz-xawpXtldY0eB5g";

    let userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    let requestOptions = {
        headers: {
            'Cookie': cookies,
            'User-Agent': userAgent
        }
    };

    try {
        // Get the Video Info with ytdl-core
        const info = await ytdl.getInfo(url, { requestOptions: requestOptions });

        // Choose the best audio format
        const audioFormat = ytdl.chooseFormat(info.formats, {
            filter: "audioonly",
            quality: "highestaudio"
        });

        if (!audioFormat) {
            return null;
            //throw new Error("Aucun format audio trouvé.");
        }

        return {
            audioInfo: info,
            audioURL: audioFormat.url
        };
    } catch (error) {
        throw error;
    }
}



module.exports = { getStreamUrl };
