export default function Page({ params }: { params: { productId: string } }) {
  return <div>Category: {params.productId}</div>;
}
