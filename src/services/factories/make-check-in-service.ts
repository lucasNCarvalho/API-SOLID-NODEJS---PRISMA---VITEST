import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInService } from "../checkin"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInService() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const checkIn = new CheckInService(checkInsRepository,gymsRepository)

    return checkIn
}