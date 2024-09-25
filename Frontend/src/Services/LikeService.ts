import axios from 'axios';
import { appConfig } from '../Utils/AppConfig';
import { notify } from '../Utils/notify';

class LikeService {
    public async likeVacation(userId: string, vacationId: string): Promise<void> {
        const response = await axios.post(appConfig.likesUrl, {
            vacationId,
            userId,
        });
    }
    public async unlikeVacation(
        vacationId: string,
        userId: string
    ): Promise<void> {
        try {
            await axios.delete(`${appConfig.likesUrl}${vacationId}`, {
                data: { userId },
            });
            notify.success('Vacation unLiked');
        } catch (err) {
            notify.error('Failed to unlike vacation');
        }
    }
    public async getLikesCount(vacationId: string): Promise<number> {
        return 0;
    }
}
export const likeService = new LikeService();
