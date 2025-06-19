import { useParams } from 'react-router-dom';

export default function Product() {
  const { id } = useParams();
  return <h1 className="text-3xl p-4">Product Details for ID: {id}</h1>;
}
