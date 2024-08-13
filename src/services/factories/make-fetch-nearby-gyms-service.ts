import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearByGymsService } from "../fetch-nearby-gyms"


export function makeFetchNearbyGymsService() {
    const checkInsRepository = new PrismaGymsRepository()
    const nearbyGyms = new FetchNearByGymsService(checkInsRepository)

    return nearbyGyms
}