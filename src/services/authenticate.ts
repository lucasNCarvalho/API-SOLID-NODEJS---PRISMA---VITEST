import { UsersRepository } from "@/repositories/users-respository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
    email: string
    password: string
}

interface AuthenticateServiceResponse {
    user: User
}

export class AuthenticateService {
    private userRepositoy: UsersRepository

    constructor(userRepository: UsersRepository) {
        this.userRepositoy = userRepository
    }

    async execute({email, password}: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {

        const user = await this.userRepositoy.findByEmail(email)

        if(!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}