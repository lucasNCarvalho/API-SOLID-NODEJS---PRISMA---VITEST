import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "../get-user-profile"

export function makeGetUserProfileService() {
    const userRepository = new PrismaUserRepository()
    const userProfile = new GetUserProfileService(userRepository)

    return userProfile
}