import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBeweenCoordinates } from "@/utils/get-distance-between-cordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

interface CheckInServiceRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {
    private checkInsRepository: CheckInsRepository
    private gymsRepository: GymsRepository

    constructor(checkInsRepository: CheckInsRepository, gymsRepository: GymsRepository) {
        this.checkInsRepository = checkInsRepository
        this.gymsRepository = gymsRepository
    }

    async execute({userId, gymId, userLatitude, userLongitude}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBeweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters

        if(distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
        
        console.log('check', checkInOnSameDay)

        if(checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_Id: gymId,
            userId: userId
        })

        return {
            checkIn
        }
    }
}