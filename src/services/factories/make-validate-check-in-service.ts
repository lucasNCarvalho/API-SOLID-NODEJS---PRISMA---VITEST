import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "../validate-check-in"

export function makeValidadeCheckInService() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const checkIvalidate = new ValidateCheckInService(checkInsRepository)

    return checkIvalidate
}