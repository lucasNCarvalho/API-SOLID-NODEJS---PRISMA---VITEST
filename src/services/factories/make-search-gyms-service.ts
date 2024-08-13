import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymService } from "../search-gyms"

export function makeSearchGymsService() {
    const checkInsRepository = new PrismaGymsRepository()
    const searchGym = new SearchGymService(checkInsRepository)

    return searchGym
}