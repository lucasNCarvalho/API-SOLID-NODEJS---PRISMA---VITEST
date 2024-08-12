import { UsersRepository } from "@/repositories/users-respository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileServiceRequest {
    userId: string
}

interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService {
    private userRepositoy: UsersRepository

    constructor(userRepository: UsersRepository) {
        this.userRepositoy = userRepository
    }

    async execute({userId}: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {

        const user = await this.userRepositoy.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}