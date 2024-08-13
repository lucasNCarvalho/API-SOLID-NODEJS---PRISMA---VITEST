import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymService } from "../create-gym"


export function makeCreateGymService() {
    const checkInsRepository = new PrismaGymsRepository()
    const createGym = new CreateGymService(checkInsRepository)

    return createGym
}