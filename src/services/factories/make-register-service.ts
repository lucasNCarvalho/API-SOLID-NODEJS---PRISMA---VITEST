import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register"

export function makeRegisterService() {
    const prismaUsersRepository = new PrismaUserRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    return registerService
}