import { Login } from "./Login";

export interface LoginResponse extends Login {
    acessToken: string
}