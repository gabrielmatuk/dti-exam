import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/photos');
        setPhotos(response.data.photos);
      } catch (err) {
        setError('Failed to fetch photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Photo</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {photos.map((photo: any) => (
            <TableRow key={photo.id}>
              <TableCell className="font-medium">
                <img src={photo.url} alt={`Photo ${photo.id}`} style={{ maxWidth: '200px' }} />
              </TableCell>
              <TableCell>{photo.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
};

export default PhotosPage;