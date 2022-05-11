import * as express from 'express';
import { fetchBuilder, MemoryCache } from 'node-fetch-cache';

const fetch = fetchBuilder.withCache(new MemoryCache({ ttl: 600000 }));
const router = express.Router();
const fetchUser = async (req: any) => {
    const response = await fetch('https://api.github.com/users/' + req.username);
    return response.json();
};
const fetchStars = async (reposUrl: string) => {
    const response = await fetch(reposUrl)
    return response.json();
};

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Missing username" });
});

router.post('/', async (req: any, res, next) => {
    const userData = await fetchUser(req.body);
    if (userData.repos_url) {
        const starData = await fetchStars(userData.repos_url);
        let stars = 0;
        if (starData) {
            starData.map((repo: any) => {
              stars += repo.stargazers_count
            });
        }
        const data = {
            profileImg: userData.avatar_url,
            name: userData.name,
            stars: stars
        };
        res.status(200).json(data);
    } else {
        res.status(200).json(userData);
    }

});

export default router;