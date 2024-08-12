import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsServiceRequest {
    userId: string
}

interface GetUserMetricsServiceResponse {
    checkInsCount: number
}

export class GetUserMetricsService {
    private checkInsRepository: CheckInsRepository

    constructor(checkInsRepository: CheckInsRepository) {
        this.checkInsRepository = checkInsRepository
    }

    async execute({userId}:GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount
        }
    }
}