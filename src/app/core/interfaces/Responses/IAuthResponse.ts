export interface IAuthResponse
{
    isSuccess : boolean;
    token: string;
    refreshToken: string;
    username: string;
}