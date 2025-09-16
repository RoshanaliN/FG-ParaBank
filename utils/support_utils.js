export class support_utils {

    generateRandomString(length) {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result = result + characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}