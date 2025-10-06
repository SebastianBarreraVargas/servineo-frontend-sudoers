import { useState, useEffect } from 'react';
type ProfileData = {
  name: string;
  photo_url: string;
  role: string;
  ratings: {
    1: number;
    2: number;
    3: number;
  };
  average_rating: number;
};
export const useProfile = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const jsonMock = {
    name: 'Juan Condori Quispe',
    photo_url:
      'https://www.shutterstock.com/image-photo/bold-portrait-photo-40yearold-latino-260nw-2627618737.jpg',
    role: 'Carpintero',
    average_rating: 0,
    ratings: {
      1: 15,
      2: 2,
      3: 2,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      //const response = await fetch('/api/profile');
      //const result = await response.json();
      //setData(result);
      const result = jsonMock;
      const totalSum = result.ratings[1] + result.ratings[2] + result.ratings[3];
      const rating = {
        1: Math.trunc((result.ratings[1] / totalSum) * 100),
        2: Math.trunc((result.ratings[2] / totalSum) * 100),
        3: Math.trunc((result.ratings[3] / totalSum) * 100),
      };
      const averageRating: number = Number(
        (totalSum === 0
          ? 0
          : (1 * result.ratings[1] + 2 * result.ratings[2] + 3 * result.ratings[3]) / totalSum
        ).toFixed(1),
      );
      setTimeout(() => {
        setData({ ...result, ratings: rating, average_rating: averageRating });
      }, 2000);
    };

    fetchData();
  }, []);

  return { data };
};
